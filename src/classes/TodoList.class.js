import { Todo } from "./Todo.class";

export class TodoList{

    constructor(){
        this.cargarLocalStorage();
    }

    nuevoTodo( todo ) {
        this.todos.push( todo );
        this.gurdarLocalStorage();
    }

    eliminarTodo( id ){
        this.todos = this.todos.filter( todo => todo.id != id );
        this.gurdarLocalStorage();
    }

    marcarCompletado( id ){
        for (const todo of this.todos) {
            if(todo.id == id){
                todo.completado = !todo.completado;
                this.gurdarLocalStorage();
                break;
            }
        }
    }

    eliminarCompletados(){
        this.todos = this.todos.filter( todo => !todo.completado );
        this.gurdarLocalStorage();
    }

    gurdarLocalStorage() {
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    cargarLocalStorage() {   
        this.todos = ( localStorage.getItem('todo') ) ?  JSON.parse(localStorage.getItem('todo')) : [];
        this.todos = this.todos.map( (todo) => Todo.fromJson(todo) );
    }
}