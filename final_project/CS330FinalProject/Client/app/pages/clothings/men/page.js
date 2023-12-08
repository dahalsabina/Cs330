"use client"
import Image from 'next/image';
import Nav from '../../../components/Nav/page';



import React, { useState, useEffect } from 'react';

export default function MensClothingPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://sabina2002.pythonanywhere.com/api/v1/clothing/men')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => window.alert('Error fetching men\'s clothing data: ', error));
  }, []);

  const statusUpdate = async (id) => {

        const status = 1;

        try{
            const response = await 
                fetch(`https://sabina2002.pythonanywhere.com/api/v1/admin/clothing/men/${id}`, {

                method:'PUT', 
                headers: {
                    'Content-Type':'application/json',
                },

                body:JSON.stringify({'id': id, 'status': status}),


                })

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }

                const responseData = await response.json();
                console.log('Data sent successfully:', responseData);
                window.alert('Data updated successfully');
                location.reload();
               
        }
        catch(error) {
            console.error('There was a problem with the fetch operation:', error);
          }

    };
  

  return (
    <>

    <div style={{ zIndex: -1, position: 'fixed', width: '100vw', height: '100vh' }}>
<Image
          src="/background.jpg"
          alt="background image"
          layout="fill"
          objectFit='cover'
        />
</div>
    <div>
      <Nav />
      <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Men's Clothing</h1>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>

        {items.map(item => (
          <div key={item.id} style={{ margin: '10px', padding: '10px', border: '1px solid #ddd' }}>
            <h2>{item.name}</h2>
            <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px' }} />
            <p>Price: ${item.price}</p>
            <p>Size: {item.size}</p>
            <p>Color: {item.color}</p>
            <p>Category: {item.category_name}</p>
            {/* <button onClick={() => addToCart(item.id)}>Add to Cart</button> */}
              {(item.status === 0) ? 
          (<button onClick={() => statusUpdate(item.id)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Reserve</button>) : (<button class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" >Reserved</button>)}

          </div>
        ))}
      </div>
    </div>
    </div>

    </>
  );
}
