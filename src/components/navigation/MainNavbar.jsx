import React from 'react';

function MainNavbar() {
    return (
  <ul className="nav">
    <li className="nav-item">
      <a className="nav-link active" href="#">My Event</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="#">Sign Up</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="#">Log In</a>
    </li>
    <li className="nav-item">
      <a className="nav-link disabled" href="#">Disabled</a>
    </li>
  </ul>
    )
}

export default MainNavbar;