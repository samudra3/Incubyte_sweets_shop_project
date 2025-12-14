import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeToken, getToken } from '../../utils/auth';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = getToken();

  const handleLogout = () => {
    removeToken();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <h2>🍬 Indian Sweet Shop</h2>
      {token && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
};

export default Navbar;
