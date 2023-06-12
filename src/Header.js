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
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>Use Bitter, Feel Better</Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        {/* Add a navigation link to the about page */}
        <Nav.Link as={Link} to="/about">About</Nav.Link>
        <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
        {!isAuthenticated ? <LoginButton /> : <LogoutButton/> }
        
      </Nav>
    </Navbar>
  );
}

