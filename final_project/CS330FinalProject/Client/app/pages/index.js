"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Nav from './/components/Nav/page';


export default function Home() {
  const [data, setData] = useState(null);
  const [showClothingDropdown, setShowClothingDropdown] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  const router = useRouter(); 

  useEffect(() => {
    fetch('https://sabina2002.pythonanywhere.com/')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  const navStyle = {
    color: '',
    fontSize: '18px',
    padding: '10px 20px',
    textDecoration: 'none',
    opacity:'0.7'
  };

  const dropdownStyle = {
    position: 'absolute',
    backgroundColor: 'black',
    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
    zIndex: 1,
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    if (username === "admin" && password === "luther2025") {
      router.push('/admin/'); 
    } else {
      alert('Invalid username or password');
    }
  };
  const ProfileForm = () => (
    <div 
    
    style={{
      padding: '20px',
      margin: '20px auto',
      width: '300px',
      backgroundColor: '#E5E5E5',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }}

    // className='p-10'
    
    >
      <form onSubmit={handleLogin}>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
          <input type="text" name="username" style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }} />
        </div>


        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input type="password" name="password" style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }} />
        </div>
        <div>
          <button type="submit" style={{
            width: '100%',
            padding: '10px',
            border: 'none',
            backgroundColor: '#007bff',
            color: 'white',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>Submit</button>
        </div>
      </form>
      <button onClick={() => setShowForm(false)} style={{
        width: '100%',
        padding: '10px',
        //marginTop: '10px',
        border: 'none',
        backgroundColor: 'grey',
        color: 'white',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>Close</button>


    </div>
  );
  
  

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

     




        {/* <Nav /> */}
{/* 
        <div className="flex justify-center">
          <table>
            <thead>
              <tr>
                <th><Link href="/">Home</Link></th>
                
                <th>
                  <div onMouseEnter={() => setShowClothingDropdown(true)} onMouseLeave={() => setShowClothingDropdown(false)}>
                    <Link href="/">Clothings</Link>
                    {showClothingDropdown && (
                      <div style={dropdownStyle}>
                        <Link href="/clothings/men" style={navStyle}>Men&apos;s Clothing</Link>
                        <Link href="/clothings/women" style={navStyle}>Women&apos;s Clothing</Link>
                      </div>
                    )}
                  </div>
                </th>

                <th style={navStyle}><Link href="/books/book">Books</Link></th>

                <th style={navStyle}>
                  {/* Toggle form on click */}
                  {/* <a onClick={() => setShowForm(!showForm)} style={navStyle}>Profile</a>
                </th>
                <th style={navStyle}>
                <Link href="/cart/cartPage">Cart</Link>
                </th>
              </tr>
            </thead>
        //   </table>
        // </div> */} 


        <br />
        <div>
          {/* Conditionally render the form */}
          {showForm && <ProfileForm />}
        </div>

        <div style={{
          backgroundColor:'#ddd',
          padding: '50px', 
          margin: "50px", 
          opacity: "0.7"
          

        }}>
          <div style={{
            display: "flex",
            // justify-content: "center", /* Horizontal centering */
            justifyContent:"center",
            alignItems:"center"
          }}>

<p>President's Message</p>

</div>



<div style={{
            display: "flex",
            // justify-content: "center", /* Horizontal centering */
            justifyContent:"center",
            alignItems:"center"
          }}>



     

          <div className="flex justify-center">


          <Image 
          src="/president.jpg"
          width={550}
          height={450}
          
          />

          </div>
          </div>

          <br />

          <p>Sustainability is not merely a buzzword, but a profound ethos that whispers to the
             very soul of our existence. It is the symphony of conscious choices playing in harmony 
             with the delicate rhythm of Mother Earth. Imagine, if you will, a dance between humanity 
             and nature, where each step taken is a pledge to preserve, protect, and prosper together.</p>

             <p>Sustainability is the guardian of our shared future, urging us to be stewards of the air we 
              breathe, the water we drink, and the soil that cradles life. It beckons us to reconsider our 
              relationship with consumption, to view waste not as a burden, but as an opportunity for renewal. 
              In the grand tapestry of time, sustainability is the golden thread that weaves through generations,
               connecting us to those who came before and those yet to come.</p>


        </div>

        <footer>

          <div style={{
            display: "flex",
            // justify-content: "center", /* Horizontal centering */
            justifyContent:"center",
            alignItems:"center"
          }}>
          <p style={{navStyle}}>&copy; Site Managed and Maintained by<br /><a onClick={() => setShowForm(!showForm)} style={navStyle}>Hogwarts Tech Services</a></p>
          </div>
        </footer>

    </>
  );
}