import React from 'react';
import Header from './Header';
import Footer from './Footer.js';
import About from './About';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useAuth0 } from "@auth0/auth0-react";
import Welcome from './Welcome';
import Profile from './Profile';
import Reviews from './Reviews';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";



function App() {
  const { isAuthenticated } = useAuth0();
  console.log(isAuthenticated)
  return (

    <>
      <div>

        <Router>
          <Header />
          <Routes>
            <Route
              path="/"
              
              element={ <Reviews />}
            >
            </Route>
            
            <Route exact path="/About"
              element={<About />}>

            </Route>
            <Route exact path="/Profile"
            element={isAuthenticated ? <Profile/>: <Reviews/> }
              >

            </Route>
          </Routes>
          <Footer />
        </Router>
      </div>
    </>
  )

}

export default App;

