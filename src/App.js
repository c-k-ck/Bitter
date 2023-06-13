import React from 'react';
import Header from './Header';
import Footer from './Footer.js';
import About from './About';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
import Welcome from './Welcome';
import Profile from './Profile';
import Reviews from './Reviews';



function App() {
  // const { isAuthenticated } = useAuth0();
  
  return (

    <>
      <div>

        <Router>
          <Header />
          <Routes>
            <Route
              path="/"
              // element={isAuthenticated ? <Profile/>: <Welcome />}
              element={ <Reviews />}
            >
            </Route>
            
            <Route exact path="/About"
              element={<About />}>

            </Route>
            <Route exact path="/Profile"
              element={<Profile />}>

            </Route>
          </Routes>
          <Footer />
        </Router>
      </div>
    </>
  )

}

export default App;

