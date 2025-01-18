import React, { useState } from 'react'
import '../Screens/Home/home.css';
import logo from '../Assets/logo.jpg';
import { FaHome, FaUserFriends, FaDoorOpen, FaUtensils, FaTicketAlt, FaMoneyBillWave,FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const [activePage, setActivePage] = useState('home');
    const navigate = useNavigate();

    const handleClick = (page) => {
        setActivePage(page);
        if(page === 'tickets'){
          navigate(`/ticket`);
        }
        else if(page === 'home'){
          navigate(`/`);  
        }
    };
  return (
    <div className="left_navbar">
        <div className="logo_name">
          <img src={logo} alt="Logo" className="logo" />
          <h1>Cave Colive</h1>
        </div>
        <div className="pages">
          <div
            className={`pages_elements ${activePage === 'home' ? 'active' : ''}`}
            onClick={() => handleClick('home')}
          >
            <FaHome className="icons" /> <h2 className="page_text">Home</h2>
          </div>
          <div
            className={`pages_elements ${activePage === 'users' ? 'active' : ''}`}
            onClick={() => handleClick('users')}
          >
            <FaUserFriends className="icons" /> <h2 className="page_text">Users</h2>
          </div>
          <div
            className={`pages_elements ${activePage === 'rooms' ? 'active' : ''}`}
            onClick={() => handleClick('rooms')}
          >
            <FaDoorOpen className="icons" /> <h2 className="page_text">Rooms</h2>
          </div>
          <div
            className={`pages_elements ${activePage === 'food' ? 'active' : ''}`}
            onClick={() => handleClick('food')}
          >
            <FaUtensils className="icons" /> <h2 className="page_text">Food</h2>
          </div>
          <div
            className={`pages_elements ${activePage === 'tickets' ? 'active' : ''}`}
            onClick={() => handleClick('tickets')}
          >
            <FaTicketAlt className="icons" /> <h2 className="page_text">Tickets</h2>
          </div>
          <div
            className={`pages_elements ${activePage === 'payment' ? 'active' : ''}`}
            onClick={() => handleClick('payment')}
          >
            <FaMoneyBillWave className="icons" /> <h2 className="page_text">Payment</h2>
          </div>
        </div>

        <div className="help_logout">
          <div className="help_element">
            <FaQuestionCircle className="help_icon" />
            <h3>Help and Information</h3>
          </div>
          <div className="logout_element">
            <FaSignOutAlt className="logout_icon" />
            <h3>Logout</h3>
          </div>
        </div>

      </div>
  )
}

export default Navbar
