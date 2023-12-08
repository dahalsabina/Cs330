"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


const Nav = () => { 

  const [data, setData] = useState(null);
  const [showClothingDropdown, setShowClothingDropdown] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  const router = useRouter(); 

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  const navStyle = {
    color: '#FFFFFF',
    fontSize: '18px',
    padding: '10px 20px',
    textDecoration: 'none',
    
  };

  const dropdownStyle = {
    position: 'absolute',
    backgroundColor: '',
    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
    zIndex: 1,
    color:""
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
    
    // style={{
    //   padding: '20px',
    //   margin: '20px auto',
    //   width: '300px',
    //   // backgroundColor: '#E5E5E5',
    //   borderRadius: '8px',
    //   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    // }}

    // className=''
    
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
    return(
        <>
  <div style={{ textAlign: 'center', padding: '20px' }}>
<div className="h-14 bg-gradient-to-b from-[#ABABAB] ...">
        <div className="flex justify-center">
          <h1 className="p-50 text-5xl">Sustainability</h1>
        </div>
        
        <div style={{
            display: "flex",
            // justify-content: "center", /* Horizontal centering */
            justifyContent:"center",
            alignItems:"center"
          }}>

          <table>
            <thead>
              <tr>
             
                <th>
                <div style={navStyle}>
                  
                  
                  <Link href="/" style={{color:""}}>Home</Link>

                  </div>
                  
                  
                  
                  </th>
              

               
                
                <th>

        <div style={navStyle}>
                
                  <div onMouseEnter={() => setShowClothingDropdown(true)} onMouseLeave={() => setShowClothingDropdown(false)}>
                    <Link href="/">Clothings</Link>
                    {showClothingDropdown && (
                      <div style={dropdownStyle}>
                        <Link href="/pages/clothings/men" style={navStyle}>Men&apos;s Clothing</Link>
                        <Link href="/pages/clothings/women" style={navStyle}>Women&apos;s Clothing</Link>
                      </div>
                    )}
                  </div>

                  </div>
                </th>

       

                <th style={navStyle}>
                  
                <div style={{
            display: "flex",
            // justify-content: "center", /* Horizontal centering */
            justifyContent:"center",
            alignItems:"center"
          }}>
                  <Link href="/pages/books">Books</Link>
                  
                 </div>
                  </th>

                <th style={navStyle}>

                <div style={{
            display: "flex",
            // justify-content: "center", /* Horizontal centering */
            justifyContent:"center",
            alignItems:"center"
          }}>


                  {/* Toggle form on click */}
            


                  </div>




                </th>
              </tr>
            </thead>
          </table>
        </div>
        <br />
        <div>
          {/* Conditionally render the form */}
          {showForm && <ProfileForm />}
        </div>
        </div>

        </div>
        
        
        </>


    );
}

export default Nav;