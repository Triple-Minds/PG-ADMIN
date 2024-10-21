import React, { useState } from 'react';
import './home.css';
import Navbar from '../../Components/Navbar';

function Home() {
  

  return (
    <div className="home">
      <Navbar />
      <div className="main">
        {/* Main content can go here */}
        <h1>auto deploy sucess</h1>
      </div>
      <div className="right_calendar">
        {/* Calendar or other right content */}
      </div>
    </div>
  );
}

export default Home;
