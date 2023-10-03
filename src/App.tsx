import { ChangeEvent, useState, useEffect } from 'react'
import './App.css'

function App() {

  interface BookInfo {
    name: string;
    author: string;
    pages: number;
    status: string;
  }
  
  let mainContainer = document.getElementById('main-container');
  const [library, setLibrary] = useState<BookInfo[]>([]);
  const [bookInfo, setBookInfo] = useState({
    name: '',
    author: '',
    pages: 0,
    status: 'Not read'
  });


  useEffect(() => {
    renderBooks(library);
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const updatedBookInfo = {
      ...bookInfo,
      [event.target.name]: event.target.value
    }

    setBookInfo(updatedBookInfo);
  }


  const renderBooks = (lib: BookInfo[]) => {
    if(mainContainer) {
      mainContainer.innerHTML = '';
    }

    for(let i = 0; i < lib.length; i++) {
      let bookId = i;
      let bookCard = document.createElement('div');
      let bookCardButton = document.createElement('button');

      bookCard.insertAdjacentHTML('beforeend', `
      <div class="card-title">
        <h2>${lib[i].name}</h2>
        <h3>${lib[i].author}</h3>
      </div>
      <div class="card-info flex">
        <p>Pages: ${lib[i].pages}</p>
        <button class='card-button' id='${bookId}-button'>${lib[i].status}</button>
      </div>
      `);

      bookCard.setAttribute('class', 'book-card');
      bookCard.setAttribute('id', `${bookId}`);
      bookCardButton.innerText = 'Delete';
      bookCardButton.setAttribute('class', 'card-button delete');
      bookCardButton.addEventListener('click', () => { removeBook(bookId) });
      bookCard.appendChild(bookCardButton);
      mainContainer?.appendChild(bookCard);

      let changeStatusButton = document.getElementById(`${bookId}-button`);
      changeStatusButton?.addEventListener('click', () => { changeStatus(bookId) });
    }
  }


  const addBook = () => {
    if(bookInfo.name !== '' && bookInfo.author !== '') {
      if(bookInfo.pages == 0) {
        alert("The book should have more than 0 pages!");
      }
      else {
        setLibrary(prevLibrary => [...prevLibrary, bookInfo]);
      }
    }
  }

  const removeBook = (bookId: number) => {
    let newLibrary = library.splice(bookId, 1);
    setLibrary(library.filter(() => newLibrary));
  }

  const changeStatus = (bookId: number) => {
    let bookStatusText = document.getElementById(`${bookId}-button`);

    if(bookStatusText?.innerHTML === 'Not read') {
      bookStatusText.innerHTML = 'Read';
    }
    else if(bookStatusText?.innerHTML === 'Read') {
      bookStatusText.innerHTML = 'Not read';
    }
  }


  return (
    <>
      <header>
        <h1>Library</h1>

        <div className='header-container flex'>
          <div className='book-input-div flex'>
            <label htmlFor="bookname-input">Book</label>
            <input type="text" id='bookname-input' name='name' value={bookInfo.name} onChange={handleChange} required />
          </div>

          <div className='book-input-div flex'>
            <label htmlFor="author-input">Author</label>
            <input type="text" id='author-input' name='author' value={bookInfo.author} onChange={handleChange} required />
          </div>

          <div className='book-input-div flex'>
            <label htmlFor="pages-input">Pages</label>
            <input type="number" min="0" max="10000" id='pages-input' name='pages' value={bookInfo.pages} onChange={handleChange} required />
          </div>

          <div className='book-input-div flex'>
            <label htmlFor="status-input">Status</label>
            <select id="status-input" name="status" value={bookInfo.status} onChange={handleChange} required >
              <option value="Read" defaultValue="Read">Read</option>
              <option value="Not read">Not Read</option>
            </select>
          </div>

          <button className='add-book' onClick={addBook}>Submit</button>
        </div>
      </header>

      <main id='main-container' className='flex'></main>
    </>
  )
}

export default App
