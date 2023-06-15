import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Auth0Provider
      domain="dev-vgne2g3s5s05ruv2.us.auth0.com"
      clientId="KdJVabfGfOg1jRGaSuvdvlb5zp4AtIW3"
      audience="bitteruserapi"
      scope="openid profile email"
      
      authorizationParams={{
        redirect_uri: window.location.origin + '/Profile'
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>

);
