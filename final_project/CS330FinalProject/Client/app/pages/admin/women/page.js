"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Nav from '../../../components/Nav/page';




export default function WomensClothingPage() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    size: '',
    color: '',
    image: '',
  });

  useEffect(() => {
    fetch('https://sabina2002.pythonanywhere.com/api/v1/admin/clothing/women')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching men\'s clothing data: ', error));
  }, []);


const handleAdd = (newItem) => {
  fetch('https://sabina2002.pythonanywhere.com/api/v1/admin/clothing/women', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newItem),
  })
  .then(response => response.json())
  .then(data => {
    setItems([...items, data]);
  })
  .catch(error => console.error('Error adding new item:', error));
};

const handleEdit = (itemId, updatedItem) => {
  fetch(`https://sabina2002.pythonanywhere.com/api/v1/admin/clothing/women/${itemId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedItem),
  })
  .then(response => response.json())
  .then(data => {
    setItems(items.map(item => item.id === itemId ? data : item));
  })
  .catch(error => console.error('Error updating item:', error));
};

const handleDelete = (itemId) => {
  fetch(`https://sabina2002.pythonanywhere.com/api/v1/admin/clothing/women/${itemId}`, { 
    method: 'DELETE' 
  })
  .then(response => {
    if (response.ok) {
      setItems(items.filter(item => item.id !== itemId));
    } else {
      console.error('Error deleting item');
    }
  })
  .catch(error => console.error('Error:', error));
};


  const openFormForAdd = () => {
    setEditingItem(null);
    setFormData({ name: '', price: '', size: '', color: '', image: '' }); // Reset form data for new item
    setShowForm(true);
  };

  const openFormForEdit = (item) => {
    setEditingItem(item);
    setFormData({ ...item }); // Pre-fill form with item data for editing
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = () => {
    const action = editingItem ? handleEdit : handleAdd;
    action(editingItem ? editingItem.id : null, formData);
    closeForm();
  };
return (
  <div className='bg-zinc-700 '>
     <Nav />
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <br />
      <h1 className='text-white text-4xl font-semibold'>Women's Clothing</h1>
      {/* <button onClick={openFormForAdd}>Add New Item</button> */}
      </div>
     
      {showForm && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
     
          <input className="text-black" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" /><br /><br />
          <input className="text-black" type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" /><br /><br />
          <input className="text-black" type="text" name="size" value={formData.size} onChange={handleChange} placeholder="Size" /><br /><br />
          <input className="text-black" type="text" name="color" value={formData.color} onChange={handleChange} placeholder="Color" /><br /><br />
          <input className="text-black" type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" /><br /><br />
          <button onClick={handleSubmit} className='bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'>Submit</button>
          <button onClick={closeForm} className='bg-yellow-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'>Cancel</button>

        </div>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {items.map(item => (
          <div key={item.id} style={{ margin: '10px', padding: '10px', border: '1px solid #ddd' }}>
            <h2 style={{ textAlign: 'center', padding: '20px' }}>{item.name}</h2>
            {/* <Image 

              src="/static/Images/WomenClothes/${item.image}"
              width={20}
              height={30}

            /> */}
            <img src={item.image} alt={item.name} style={{ width: '250px', height: '300px' }} />
            <p style={{ textAlign: 'center', padding: '10px' }}>Price: ${item.price}</p>
            <p style={{ textAlign: 'center', padding: '10px' }}>Size: {item.size}</p>
            <p style={{ textAlign: 'center', padding: '10px' }}>Color: {item.color}</p>
            <p style={{ textAlign: 'center', padding: '10px' }}>Category: {item.category_name}</p>
            <div style={{ textAlign: 'center', padding: '20px' }}>

            <button onClick={() => openFormForEdit(item)}  class="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Edit</button><br /><br/>
            <button onClick={() => handleDelete(item.id)}   class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Delete</button>
          </div>
          
          </div>
        ))}
      </div>
    </div>
  );
}
