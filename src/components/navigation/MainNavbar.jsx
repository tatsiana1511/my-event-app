import React from 'react';

function MainNavbar() {
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
  <a className="navbar-brand" href="#">My Event</a>
  <div className="" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <a className="nav-link" href="#">Sign Up</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Login</a>
      </li>
    </ul>
  </div>
</nav>    
    )
}

export default MainNavbar;