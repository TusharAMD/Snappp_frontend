import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, isLoading , loginWithRedirect, logout} = useAuth0();
    
  if (isLoading) {
    return (
    <nav id="main-navbar">
      <p id="logo"><img src="https://i.ibb.co/tZWP5qs/Pngtree-butterfly-logo-icon-design-template-3671384-removebg-preview-1.png"></img></p>
      <ul>
        
      </ul>
    </nav>
    );
  }
  
  else if (isAuthenticated===false) {
    return (
    <nav id="main-navbar">
      <p id="logo"><img src="https://i.ibb.co/tZWP5qs/Pngtree-butterfly-logo-icon-design-template-3671384-removebg-preview-1.png"></img></p>
      <ul>
        
        <li><a href="#">Create</a></li>
        <li onClick={loginWithRedirect}><a href="#">Login</a></li>
      </ul>
    </nav>
    );
  }
  else{
    return (
    <nav id="main-navbar">
    <p id="logo"><img src="https://i.ibb.co/tZWP5qs/Pngtree-butterfly-logo-icon-design-template-3671384-removebg-preview-1.png"></img></p>
      <ul>
            
        <li><a href="#">Create</a></li>
        <li><a href="#">Profile</a></li>
        <li onClick={logout}><a href="#">Logout</a></li>
        <li id="userpic"><img src = {user.picture}></img></li>
        
      </ul>
    </nav>
    );
  }

};

export default Navbar;