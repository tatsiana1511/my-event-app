import React from 'react';
import { Link } from 'react-router-dom';

function MainNavbar(props) {

  function logout() {
    localStorage.removeItem('token');
    props.setUser(null);
  }

    return (
      <ul className="nav">
        <li className="nav-item">
          <Link to="/" className="nav-link active">My Event</Link>
        </li>
        <input placeholder='Search' />
        <li className="nav-item">
          <Link to="/signup" className="nav-link">Sign Up</Link>
        </li>
        <li className="nav-item">
          {props.user ? 
            <Link to="/" onClick={logout} className="nav-link">Log Out</Link>
            :
            <Link to="/login" className="nav-link">Log In</Link>
          }
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" href="#">Disabled</a>
        </li>
      </ul>
    )
}

export default MainNavbar;