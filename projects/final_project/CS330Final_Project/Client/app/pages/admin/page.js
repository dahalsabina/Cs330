"use client"


import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  

  const [data, setData] = useState(null);
  const [showClothingDropdown, setShowClothingDropdown] = useState(false);
  

  useEffect(() => {
    fetch('https://sabina2002.pythonanywhere.com/')
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
    backgroundColor: 'black',
    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
    zIndex: 1,
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

      <div className="h-14 bg-gradient-to-b from-[#ABABAB] ...">
        <div className="flex justify-center">
          <h1 className="p-20 text-5xl">Sustainability</h1>
        </div>

        <div className="flex justify-center">
          <table>
            <thead>
              <tr>
                <th style={navStyle}><Link href="/">Home</Link></th>
                
                <th style={navStyle}>
                  <div onMouseEnter={() => setShowClothingDropdown(true)} onMouseLeave={() => setShowClothingDropdown(false)}>
                    <Link href="">Clothings</Link>
                    {showClothingDropdown && (
                      <div style={dropdownStyle}>
                        <Link href="/pages/admin/men/" style={navStyle}>Men&apos;s Clothing</Link>
                        <Link href="/pages/admin/women/" style={navStyle}>Women&apos;s Clothing</Link>
                      </div>
                    )}
                  </div>
                </th>

                <th style={navStyle}><Link href="/pages/admin/books/">Books</Link></th>
              </tr>
            </thead>
          </table>
        </div>
        <br />

        <div className='p-20'>
        <p>Mission and Vision:<br />
At the heart of our Sustainability Site is a commitment to fostering a sustainable future. We believe in harnessing the power of collective action and innovative solutions to address environmental challenges. As administrators, you are integral to realizing our mission of promoting sustainability, raising awareness, and inspiring meaningful change.
<br /><br />
Your Role:<br />
As part of the admin team, you will have a unique opportunity to shape the content, engage with our community, and contribute to the growth of our platform. Whether you are managing discussions, curating resources, or implementing new features, your efforts will directly impact the success of our sustainability initiatives.
<br /><br />
Collaboration and Communication:<br />
Open communication and collaboration are the cornerstones of our success. We encourage you to actively engage with fellow team members, share ideas, and explore new ways to enhance our platform. Your input is invaluable in creating a vibrant and inclusive space for our community.
<br /><br />
Resources:<br />
<br />
To support you in your role, we have curated a comprehensive set of resources, including guidelines, tutorials, and FAQs. These materials are designed to empower you with the knowledge and tools necessary to navigate your responsibilities effectively. Don't hesitate to reach out if you have any questions or need assistance.</p>

      </div>
        
      </div>

     
    </>
  );
}
