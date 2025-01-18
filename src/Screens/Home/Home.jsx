import React, { useState, useEffect } from 'react';
import './home.css';
import Navbar from '../../Components/Navbar';
import { FaBell, FaCalendar, FaXbox } from 'react-icons/fa';
import Chart from './ChartDiv';
import { formatDistanceToNow } from 'date-fns';
import Calender from './Calender';
import Chat from './Chat';

function Home() {
  const name = "Sameer";
  const [isNotificationEnabled,setNotificationsEnabled] = useState(false);
  
  const [notifications, setNotifications] = useState([
    { id: 1, user: "John Doe", message: "Liked your post.", time: "2m ago" },
    { id: 2, user: "Jane Smith", message: "Commented on your photo.", time: "10m ago" },
    { id: 3, user: "Michael Brown", message: "Followed you.", time: "1h ago" },
    { id: 4, user: "Emily Davis", message: "Sent you a message.", time: "3h ago" },
    { id: 5, user: "Chris Wilson", message: "Mentioned you in a comment.", time: "1d ago" },
  ]);

  const monthWiseData = [
    {
      month: 'January',
      totalCostForMonth: 10000,
      noOfEmpPaid: 10,
      noOfEmpNonPaid: 2,
      noOfEmpOverPaid: 1,
      currentNumber:29080,
      totalNumber: 30000,
      income:30000,
      outcome:40000,
      balance:3000
    },
    {
      month: 'February',
      totalCostForMonth: 12000,
      noOfEmpPaid: 12,
      noOfEmpNonPaid: 1,
      noOfEmpOverPaid: 2,
      currentNumber:39021,
      totalNumber: 40000,
      income:30000,
      outcome:40000,
      balance:3000
    },
    {
      month: 'March',
      totalCostForMonth: 15000,
      noOfEmpPaid: 15,
      noOfEmpNonPaid: 0,
      noOfEmpOverPaid: 3,
      currentNumber:43432,
      totalNumber: 45000,
      income:30000,
      outcome:40000,
      balance:3000
    },
  ];
  
  const tickets = [
    { name: 'Sameer', roomNO: '205', createdAt: Date.now() - 600000 }, // 10 minutes ago
    { name: 'Ali', roomNO: '302', createdAt: Date.now() - 3600000 },  // 1 hour ago
    { name: 'Sara', roomNO: '101', createdAt: Date.now() - 86400000 }, // 1 day ago
  ];
  const [selectedMonth, setSelectedMonth] = useState('');
  const [monthData, setMonthData] = useState({});

  const handleViewMore = (ticket) => {
    console.log('View more details for:', ticket);
    // You can handle the view more action (e.g., navigate to a detailed page or show a modal)
  };

  const handleMonthChange = (event) => {
    const selectedMonth = event.target.value;
    setSelectedMonth(selectedMonth);
    const monthData = monthWiseData.find((data) => data.month === selectedMonth);
    setMonthData(monthData);
  };
  

  return (
    <div className="home">
      <Navbar />
      <div className="main">
        <div className='welcome_date_notification'>
          <div className='welcome_text'><h1>Hey {name} Good morning!</h1></div>
          <div className='date_notification'>
            <h5><FaCalendar/> {new Date().toLocaleDateString()}</h5>
            <div onClick={() => setNotificationsEnabled(!isNotificationEnabled)} className='hovernotification'><FaBell/></div>
          </div>
        </div>

        <div className='secondCol'>
            <div className='firstBox'>
              <div>
                <label htmlFor="month" className='monthName'>Current Month:</label>
                <select id="month" value={selectedMonth} onChange={handleMonthChange}>
                  <option value="">All</option>
                  {monthWiseData.map((data) => (
                    <option key={data.month} value={data.month}>
                      {data.month}
                    </option>
                  ))}
                </select>
              </div>
              {monthData && (
                <div>
                  <h4 className='numbers'>{monthData.currentNumber}/{monthData.totalNumber}</h4>
                  <ul style={{ listStyleType: 'none' }}>
                    <li className='subfont'>Total Cost for Month: {monthData.totalCostForMonth}</li>
                    <li className='subfont'>No. of Emp Paid: {monthData.noOfEmpPaid}</li>
                    <li className='subfont'>No. of Emp Non-Paid: {monthData.noOfEmpNonPaid}</li>
                    <li className='subfont'>No. of Emp Over-Paid: {monthData.noOfEmpOverPaid}</li>
                  </ul>
                </div>
              )}
                </div>
                <div className='monthWiseDetails'>
                    <Chart />
                </div>
        </div>

         <div className='thirdCol'>
          <div className='Ticket_Title'>
            <h3>Recent Tickets</h3>
          </div>
          <div className="tickets">
            {tickets.map((ticket, index) => (
              <div key={index} className="ticketItem">
                <div className="ticketDetails">
                  <div style={{display:'flex',gap:'5px'}} className='ticketFont'><h4 >Name: </h4><span>{ticket.name}</span></div>
                  <p className='ticketFont'>Room: {ticket.roomNO}</p>
                  <p className='ticketFont'>Created {formatDistanceToNow(new Date(ticket.createdAt))} ago</p>
                </div>
                <button onClick={() => handleViewMore(ticket)} className="viewMoreBtn">
                View More
                </button>
              </div>
            ))}
      </div>
    </div>
      </div>
      <div className="right_calendar">
              <Calender/>
              <Chat/>
      </div>

      {isNotificationEnabled && (
        <div className="notificationsPage">
      <FaXbox style={{position:'absolute',top:'23px',right:'10px',cursor:'pointer'}} onClick={() => setNotificationsEnabled(false)}/>
      <h2>Notifications</h2>
      <div className="notificationsList">
        {notifications.length === 0 ? (
          <p>No new notifications.</p>
        ) : (
          notifications.map((notification) => (
            <div key={notification.id} className="notification">
              <p>
                <strong>{notification.user}</strong> {notification.message}
              </p>
              <small>{notification.time}</small>
            </div>
          ))
        )}
      </div>
      </div>)}

    </div>
  );
}

export default Home;
