import { todoList } from "..";
import { Todo } from "../classes";

// Referencias a mi HTML
const divTodoList = document.querySelector('.todo-list');
const inputTodo = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const aFilters = document.querySelectorAll('.filtro');

export const crearTodoHTML = ( todo ) => {

    const htmlTodo = `<li class="${ todo.completado && 'completed' }" data-id="${ todo.id }">
            <div class="view">
                <input class="toggle" type="checkbox" ${ todo.completado && 'checked' }>
                <label>${ todo.tarea }</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>`;
    
    const divTodo = document.createElement('div');
    divTodo.innerHTML = htmlTodo;
 
    divTodoList.append(divTodo.firstElementChild);

    return divTodo.firstElementChild;
}

//Eventos sobre componente HMLT
inputTodo.addEventListener('keyup', (event) => {
    if(event.keyCode === 13 && inputTodo.value.length > 0){
        const newTodo = new Todo(inputTodo.value);
        todoList.nuevoTodo(newTodo);
        crearTodoHTML(newTodo);
        inputTodo.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {
    const tipoElemento = event.target.localName; // label, input o un button
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if(tipoElemento.includes('input')){
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    } else if(tipoElemento.includes('button')) {
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }
});

btnBorrar.addEventListener('click', () => {
    todoList.eliminarCompletados();

    for(let i=divTodoList.children.length-1; i>=0; i--){
        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
});
ulFilters.addEventListener('click', (event) => {
    const filtro = event.target.text;
    if(!filtro) return;

    aFilters.forEach( elem => elem.classList.remove('selected') );
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        switch(filtro) {
            case 'Pendientes':
                if(completado) {
                    elemento.classList.add('hidden');
                }
            break;
            case 'Completados': {
                if(!completado) {
                    elemento.classList.add('hidden');
                }
            }
        }
    }
});