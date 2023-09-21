import { useState } from 'react'
import './App.css'

function App() {
  const myLibrary = [];
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState('');
  const [status, setStatus] = useState(false);


  const addBook = () => {}
  const removeBook = () => {}


  return (
    <>
      <header>
        <h1>Book Library</h1>

        <form action="post" className='flex'>
          <div className='bookname flex'>
            <label htmlFor="bookname-input">Book</label>
            <input type="text" id='bookname-input' />
          </div>

          <div className='author flex'>
            <label htmlFor="author-input">Author</label>
            <input type="text" id='author-input' />
          </div>

          <div className='pages flex'>
            <label htmlFor="pages-input">Pages</label>
            <input type="number" id='pages-input' />
          </div>

          <div className='status flex'>
            <label htmlFor="status-input">Status</label>
            <select name="status" id="status-input">
              <option value="read">Read</option>
              <option value="not-read">Not Read</option>
            </select>
          </div>

          <input type="submit" className='add-book' onClick={addBook} />
        </form>
      </header>

      <main></main>
    </>
  )
}

export default App
