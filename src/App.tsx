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
    status: 'not-read'
  });


  useEffect(() => {
    console.log(library);
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
      <h2>${lib[i].name}</h2>
      <h3>${lib[i].author}</h3>
      <p>${lib[i].pages}</p>
      <p>${lib[i].status}</p>
      `);

      bookCard.setAttribute('class', 'book-card');
      bookCard.setAttribute('id', `${bookId}`);
      bookCardButton.innerText = 'Delete';
      bookCardButton.addEventListener('click', () => { removeBook(bookId) });
      bookCard.appendChild(bookCardButton);
      mainContainer?.appendChild(bookCard);
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


  return (
    <>
      <header>
        <h1>Book Library</h1>

        <div className='header-container flex'>
          <div className='bookname flex'>
            <label htmlFor="bookname-input">Book</label>
            <input type="text" id='bookname-input' name='name' value={bookInfo.name} onChange={handleChange} required />
          </div>

          <div className='author flex'>
            <label htmlFor="author-input">Author</label>
            <input type="text" id='author-input' name='author' value={bookInfo.author} onChange={handleChange} required />
          </div>

          <div className='pages flex'>
            <label htmlFor="pages-input">Pages</label>
            <input type="number" min="0" max="10000" id='pages-input' name='pages' value={bookInfo.pages} onChange={handleChange} required />
          </div>

          <div className='status flex'>
            <label htmlFor="status-input">Status</label>
            <select id="status-input" name="status" value={bookInfo.status} onChange={handleChange} required >
              <option value="read" defaultValue="read">Read</option>
              <option value="not-read">Not Read</option>
            </select>
          </div>

          <input type="submit" className='add-book' onClick={addBook} />
        </div>
      </header>

      <main id='main-container'></main>
    </>
  )
}

export default App
