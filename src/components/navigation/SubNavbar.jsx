import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MainNavbar.css';

function SubNavbar(props) {
  const currentRoute = useLocation().pathname.toLowerCase();
    return (
        <nav className='navbar navbar-expand-sm navbar-light bg-light'>
          <div className='' id='navbarNav'>
            <ul className='navbar-nav'>
              <li className='nav-item active'>
                <Link to='/' className={currentRoute === '/' ? 'nav-link sub-nav current-tab' : 'nav-link sub-nav'}>About</Link>
              </li>
              <li className='nav-item active'>
                <Link to='/experiences' className={currentRoute.includes('experiences') ? 'nav-link sub-nav current-tab' : 'nav-link sub-nav'}>Experiences</Link>
              </li>
              <li className='nav-item'>
                {props?.user?.isServiceProvider ?
                  <Link to='/create-service' className={currentRoute.includes('create-service') ? 'nav-link sub-nav current-tab' : 'nav-link sub-nav'}>Create Service</Link>
                  :
                  null
                }
              </li>
              <li className='nav-item'>
                {props?.user && !props?.user.isServiceProvider ?
                  <Link to='/my-bookings' className={currentRoute.includes('my-bookings') ? 'nav-link sub-nav current-tab' : 'nav-link sub-nav'}>My Bookings</Link>
                  :
                  null
                }
              </li>
              <li className='nav-item'>
                {props?.user?.isServiceProvider ?
                  <Link to='/my-service' className={currentRoute.includes('my-service') ? 'nav-link sub-nav current-tab' : 'nav-link sub-nav'}>My Service</Link>
                  :
                  null
                }
              </li>
              <li className='nav-item'>
                {props?.user?.isServiceProvider ?
                  <Link to='/booking-requests' className={currentRoute.includes('booking-requests') ? 'nav-link sub-nav current-tab' : 'nav-link sub-nav'}>Booking Requests</Link>
                  :
                  null
                }
              </li>
            </ul>
          </div>
        </nav>    
    )
}

export default SubNavbar;