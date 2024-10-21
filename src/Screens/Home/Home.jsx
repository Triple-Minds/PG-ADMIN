import React, { Fragment } from 'react'
import "./home.css"
function Home() {
  return (
    <div className="home">
      <div className='left_navbar'>
        
        <div className='logo_name'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" alt=""/>
            <h1>Cave Colive</h1>
        </div>
        <div className='pages'>
          <h2 className='pages_elements'>Home</h2>
          <h2 className='pages_elements'>Users</h2>
          <h2 className='pages_elements'>Rooms</h2>
          <h2 className='pages_elements'>Food</h2>
          <h2 className='pages_elements'>Tickets</h2>
          <h2 className='pages_elements'>Payment</h2>
        </div>
      </div>
      <div className='main'>



      </div>
      <div className='right_calender'>
        
      </div>
    </div>
  )
}

export default Home