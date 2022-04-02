import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import './MainNavbar.css';

function MainNavbar(props) {

  function logout() {
    localStorage.removeItem('token');
    props.setUser(null);
  }

    return (
      <ul className='nav'>
        <div className='nav-block'>
          <li className='nav-item'>
            <Link to='/' className='nav-link app-name'>My Event</Link>
          </li>
          <Search />
        </div>
        <div className='nav-block signup-login'>
          <li className='nav-item'>
            <Link to='/signup' className='nav-link'>Sign Up</Link>
          </li>
          <li className='nav-item'>
            {props.user ? 
              <Link to='/' onClick={logout} className='nav-link'>Log Out</Link>
              :
              <Link to='/login' className='nav-link'>Log In</Link>
            }
          </li>
        </div>
      </ul>
    )
}

export default MainNavbar;