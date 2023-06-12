import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginButton from './Login';
import LogoutButton from './Logout';
import { useAuth0 } from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header() {
  const { isAuthenticated} = useAuth0();
 
    return (
      <div >
        <header>
        <nav>
      <div className="logo">
        <img src="AltBitter.png" alt="Logo" />
        <img src='BitterAlt.png' alt='textlogo'/>
      </div>
      <div>
        </div>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/profile">Profile</a></li>
        
        {!isAuthenticated ? <LoginButton /> : <LogoutButton/> }
        
      </ul>
    </nav>
    </header>
      
    </div>
  );
}

