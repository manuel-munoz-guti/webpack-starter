import { saludar } from './js/componentes';
import './styles.css';

const init = () => {
    const initialData = JSON.parse(localStorage.getItem('books')) || [ { id: 0, title:'Fausto' , author: 'Johann Wolfgang von Goethe, 1832' }];
    let books = []; 
    
    // References from DOM
    const divBookList = document.getElementById('books-list');
    const inputTile = document.getElementById('title');
    const inputAuthor = document.getElementById('author');
    const addButton = document.getElementById('add-button');
    
    // Add book to the list
    const addBookToList = (book) => {
        const divBookItem = document.createElement('div');
        divBookItem.id = `div-${book.id}`;
        divBookItem.classList.add("list-group-item", "list-group-item-action", "flex-column", "align-items-start");
        divBookItem.innerHTML = `<h5 class="mb-3">${book.title}</h5> <p class="mb-1">${book.author}</p> <button id="${book.id}" class="btn btn-success mt-3">Remove</button>`;
        divBookList.appendChild(divBookItem);
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
        inputTile.value = '';
        inputAuthor.value = '';
    }
    initialData.forEach(addBookToList);
    
    // Remove book from the list
    const removeBookFromList = (id) => {
        divBookList.removeChild(document.getElementById(`div-${id}`));
        books = [...books.filter(book => book.id !== +id)];
        localStorage.setItem('books', JSON.stringify(books));
    }
    
    // Listeners events
    divBookList.addEventListener('click', ({ target }) => (target.localName === 'button') && removeBookFromList(target.id));
    addButton.addEventListener('click', () => inputTile.value && inputAuthor.value && addBookToList({ id: new Date().getTime(), title: inputTile.value, author: inputAuthor.value }));
}

init();