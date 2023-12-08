"use client"
import Image from 'next/image';
import Nav from '../../components/Nav/page';


import React, { useState, useEffect } from 'react';

const getUserData = async () => {
    const res = await fetch("https://sabina2002.pythonanywhere.com/api/v1/books");
    return res.json();
};

export default function Books() {

    const [posts, setPosts] = useState([]);
    const [reservedBooks, setReservedBooks] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUserData();
            setPosts(data);
        };
        fetchData();
    }, []);


    const statusUpdate = async (id) => {

        const status = 1;

        try{
            const response = await 
                fetch(`https://sabina2002.pythonanywhere.com/api/v1/admin/books/${id}`, {

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
      <Nav />
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1 className='text-white text-4xl font-semibold'>Books</h1>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {posts.map((post) => (
                    <div key={post.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '250px' }}>
                        <img src={post.link} alt="Book Cover" style={{ width: '250px', height: '300px' }} />
                        <div>
                            <p>Title : {post.title}</p>

                            <p>Genre: {post.genre}</p>
                            <p>ISBN:<u> {post.isbn} </u></p>
                            <p>Publication Year: {post.publication_year}</p>
              
                            {(post.status === 0) ? 

                            (<button onClick={() => statusUpdate(post.id)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Reserve</button>) : (<button class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" >Reserved</button>)}

                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}
