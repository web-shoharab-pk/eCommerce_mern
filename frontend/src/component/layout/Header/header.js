import React from 'react'; 
import { Link } from 'react-router-dom';
import "./Header.css";
 
 

const header = () => {

   
    const handleToggle = (e ) => {
      
        console.log(e) 
    }

    return ( 
        <nav>
            <div class="navbar-area">
    <div className="nav-container">
      <nav className="site-navbar"> 
        <a href="#home" className="site-logo">logo</a>
 
        <ul onClick={handleToggle}>
          <li>
          <Link className="navbar-link" to="/">Home</Link>
          </li>
          <li>
          <Link className="navbar-link" to="/about">About</Link>
          </li>

          <li>
          <Link className="navbar-link" to="/contact">Contact</Link>
          </li>
          <li>
          <Link className="navbar-link" to="/contact">test</Link></li>
        </ul>

        
        <button  className="nav-toggler">
          <span></span>
        </button>
      </nav>
    </div>
  </div> 
            
           
            
            
        </nav>
    );
};

export default header;