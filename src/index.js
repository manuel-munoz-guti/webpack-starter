import './styles.css';
// import { Todo } from './classes/Todo.class';
// import { TodoList } from './classes/TodoList.class';
import { Todo, TodoList } from './classes';
import { crearTodoHTML } from './js/componentes';

export const todoList = new TodoList(); 

todoList.todos.forEach( crearTodoHTML );

