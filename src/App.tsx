import { useState } from 'react'
import './App.css'

function App() {

  let myLibrary: Array<object> = [];  
  let mainContainer = document.getElementById('main-container');
  const [bookInfo, setBookInfo] = useState({
    name: '',
    author: '',
    pages: 0,
    status: 'not-read'
  })


  const handleChange = (event: any) => {
    const updatedBookInfo = {
      ...bookInfo,
      [event.target.name]: event.target.value
    }

    setBookInfo(updatedBookInfo);
    console.log(updatedBookInfo);
  }


  const addBook = () => {

  }

  const removeBook = () => {

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
            <input type="number" id='pages-input' name='pages' value={bookInfo.pages} onChange={handleChange} required />
          </div>

          <div className='status flex'>
            <label htmlFor="status-input">Status</label>
            <select id="status-input" name="status" value={bookInfo.status} onChange={handleChange} required >
              <option value="read" selected>Read</option>
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
