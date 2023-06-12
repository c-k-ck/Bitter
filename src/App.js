import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './Header';
import Footer from './Footer';
import React from 'react';
import Rate from './Rate';
import Main from './Main'
import Login from './login';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import Dropdown from "react-bootstrap/Dropdown";
// import { Nav } from 'react-bootstrap';
import Nav from './nav';


function App() {
  return (
    <div className="App">
      <Nav/>
        <Router>
        
      <Routes>
      <Route
         
         exact path="/"
         // Main is the default page
         element={<Main/>}
         
         >
       </Route>
        <Route
         
          exact path="/login"
          element={<Login/>}
          >
        </Route>
        {/* PLACEHOLDER: add a route with a path of '/about' that renders the `About` component */}
        <Route 
          exact path="/rate"
          element={<Rate />}
          >
        </Route>
      </Routes>
      <Header />
      <Footer />
    </Router>
      

    </div>
  );
}

export default App;