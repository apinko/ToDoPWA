import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <h1>My ToDo List</h1>
      <nav>
        <Link to="/">📋 Lista</Link>
        <Link to="/add">➕ Dodaj</Link>
        <Link to="/stats">📊 Statystyki</Link>
      </nav>
    </header>
  );
}

export default Header;