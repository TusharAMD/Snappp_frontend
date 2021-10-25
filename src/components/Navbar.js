import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './Navbar.css';
import MemeCanvas from './MemeCanvas';
import Profile from './Profile';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// Basic Navbar, navigations handled through Router and Login, Logout can be accessed from here

const Navbar = () => {
  const { user, isAuthenticated, isLoading , loginWithRedirect, logout} = useAuth0();
  console.log(isAuthenticated,isLoading)  
  
 
 if (isAuthenticated===false) {
    return (
    
    <Router>
    <nav id="main-navbar">
      <p id="logo"><img src="https://i.ibb.co/tZWP5qs/Pngtree-butterfly-logo-icon-design-template-3671384-removebg-preview-1.png"></img></p>
      <ul>
        
        
        
        <li onClick={loginWithRedirect}><a href="#">Login</a></li>
      </ul>
    </nav>
    
    <Switch>
      <Route path="/:email">
        <Profile />
      </Route>       
    </Switch>
    </Router>
    
    
    
    );
  }
  else{
    return (
    <Router>
    <nav id="main-navbar">
    <p id="logo"><img src="https://i.ibb.co/tZWP5qs/Pngtree-butterfly-logo-icon-design-template-3671384-removebg-preview-1.png"></img></p>
      <ul>
          
        <li><Link to="/create">Create</Link></li>
        <li><Link to= {`/${user.email}`} >Profile</Link></li>
        <li onClick={logout}><a href="#">Logout</a></li>
        <li id="userpic"><img src = {user.picture}></img></li>
        
      </ul>
    </nav>
    <Switch>
      <Route path="/create">
        <MemeCanvas />
      </Route>
      <Route path="/:email">
        <Profile />
      </Route>       
    </Switch>
    </Router>
    );
  }

};

export default Navbar;
