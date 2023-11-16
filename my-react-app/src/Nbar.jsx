// Nbar.jsx
import React from 'react';
import './style/Navbar.css'; // Import the CSS file for styling

function Nbar({ setCurrentRoute }) {

  return (
    <nav className='navbar'>

          <button className="navbar-button" onClick={() => setCurrentRoute('home')}>Home</button>

          <button className="navbar-button" onClick={() => setCurrentRoute('reflect')}>Tadabor</button>

          <button className="navbar-button" onClick={() => setCurrentRoute('chapter-chat')}>Chapter Chat</button>

    </nav>
  );
}

export default Nbar;
