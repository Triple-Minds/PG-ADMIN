import React, { useState } from 'react'
import "./rooms.css"
import Navbar from '../../Components/Navbar'
import FloorSelection from './FloorSelection';
import RoomsDisplay from './RoomsDisplay';
import Filters from './Filters';

export const Rooms = () => {

  const [selectedFloor, setSelectedFloor] = useState(null);
  const [roomFilters, setRoomFilters] = useState({
    roomType: '',     // AC / Non-AC
    occupancy: '',    // Full, Partially Full, Empty
    sharing: '',      // 2 sharing, 3 sharing, etc.
    priceRange: [0, 10000]
  });

  const floors = ['1st Floor', '2nd Floor', '3rd Floor', '4th Floor', '5th Floor' , '6th Floor']; // Example floor data

  return (
    <div className='rooms_bg'>
      <Navbar/>
      <div className='rooms_main_container'>
        <div className='rooms_topNav'>

        </div>
        <div className='rooms_main'>
          <div className='floors_title'>
            <h1>Floors</h1>
          </div>
          <div className="app-container">
            <div className="filters-section">
              <Filters roomFilters={roomFilters} setRoomFilters={setRoomFilters} />
            </div>
            <div className="main-section">
              <h1>PG Room Allocation</h1>
              {!selectedFloor ? (
                <FloorSelection floors={floors} setSelectedFloor={setSelectedFloor} />
              ) : (
                <RoomsDisplay selectedFloor={selectedFloor} roomFilters={roomFilters} />
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
