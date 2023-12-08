"use client"

import React, { useState, useEffect } from 'react';
import Nav from '../../../components/Nav/page';


export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publicationYear: '',
    id:'', 
    isbn:'', 
    link:''
  });

  useEffect(() => {
    fetch('https://sabina2002.pythonanywhere.com/api/v1/admin/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books data: ', error));
  }, []);


  const handleDelete = (bookId) => {
    fetch(`https://sabina2002.pythonanywhere.com/api/v1/admin/books/${bookId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        setBooks(books.filter(book => book.id !== bookId));
      } else {
        console.error('Error deleting book');
      }
    })
    .catch(error => console.error('Error:', error));
  };

  const openFormForAdd = () => {
    setEditingBook(null);
    setFormData({ title: '', author: '', genre: '', publicationYear: '' });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingBook(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async () => {

    const id = document.getElementById("id");

    const title = document.getElementById("title");

    const isbn = document.getElementById("isbn");

    const author = document.getElementById("author"); 

    const genre = document.getElementById("genre"); 

    const pubYear = document.getElementById("pubYear");

    const link = document.getElementById("link"); 

    if(id.value == null || id.value == ""){
      window.alert("Please input ID value");
      return;
    }


    try{

    const response = await fetch("https://sabina2002.pythonanywhere.com/api/v1/admin/books", {
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      }, 
      body:JSON.stringify({ 'id': id.value, 
      'title': title.value, 'isbn':isbn.value , 
      'publication_year': pubYear.value, 
      'image':'soren.jpg', 
      'genre':genre.value, 
      'status': 0, 
        'link':link.value}),

    })

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
      console.log('Data sent successfully:', responseData);
      window.alert("Data added successfully !!");
      closeForm();

    } 
    
    catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }

  };

  return (
<>

    
      <div className='bg-zinc-700 '>
        <Nav />
      <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1 className='text-white text-4xl font-semibold' >Books</h1>
      
      <button onClick={openFormForAdd}>Add New Book</button>

      
      {showForm && (

<div style={{ textAlign: 'center', padding: '20px' }}>

        <div className='justify-self-center'>
          <input className='text-black' id="id" type='text' name='id' value={formData.id} onChange={handleChange} placeholder='ID' /><br /><br />
          <input className="text-black" id="title" type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" /><br /><br />
          <input className="text-black" id="isbn" type="text" name="isbn" value={formData.isbn} onChange={handleChange} placeholder="ISBN" /><br /> <br />
          {/* <input className="text-black" id="author" type="text" name="author" value={formData.author} onChange={handleChange} placeholder="Author" /><br /> <br /> */}
          <input className="text-black" id="pubYear" type="number" name="publicationYear" value={formData.publicationYear} onChange={handleChange} placeholder="Publication Year" /><br /> <br />
          <input className="text-black" id="genre" type="text" name="genre" value={formData.genre} onChange={handleChange} placeholder="Genre" /><br /> <br />
          <input className="text-black" id="link" type="text" name="link" value={formData.link} onChange={handleChange} placeholder="Link" /><br /> <br />

          <button onClick={handleSubmit} className='class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"'>Submit</button>
          <button onClick={closeForm} className='class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"'>Cancel</button>
        </div>

        </div>

      )}

<div style={{ textAlign: 'center', padding: '20px' }}>
 
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {books.map(book => (
          <div key={book.id} style={{ margin: '10px', padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
            <h2>{book.title}</h2>
            <br />
            <img src={book.link} alt={book.name} style={{ width: '100px', height: '100px' }} />
 
            {/* <p>Author: {book.author}</p> */}
            <p>Genre: {book.genre}</p>
            <p>ISBN : {book.isbn}</p>
            <p>Publication Year: {book.publication_year}</p>
            {/* <button onClick={() => openFormForEdit(book)} className='class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"'>Edit</button> */}
            <button onClick={() => handleDelete(book.id)} className='class="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"'>Delete</button>
          </div>
        ))}
      </div>

      </div>

      </div>
      </div>


    </>
  );
}
