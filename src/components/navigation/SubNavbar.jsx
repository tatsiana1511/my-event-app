import React from 'react';
import { Link } from 'react-router-dom';

function SubNavbar(props) {
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
          <div className="" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link to="/" className="nav-link">About</Link>
              </li>
              <li className="nav-item active">
                <Link to="/experiences" className="nav-link">Experiences</Link>
              </li>
              <li className="nav-item">
                {props?.user?.isServiceProvider ?
                  <Link to="/create-service" className="nav-link">Create Service</Link>
                  :
                  null
                }
              </li>
              <li className="nav-item">
                {props?.user && !props?.user.isServiceProvider ?
                  <Link to="/my-bookings" className="nav-link">My Bookings</Link>
                  :
                  null
                }
              </li>
              <li className="nav-item">
                {props?.user?.isServiceProvider ?
                  <Link to="/my-service" className="nav-link">My Service</Link>
                  :
                  null
                }
              </li>
              <li className="nav-item">
                {props?.user?.isServiceProvider ?
                  <Link to="/booking-requests" className="nav-link">Booking Requests</Link>
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