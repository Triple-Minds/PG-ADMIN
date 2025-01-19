import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './payment.css';
import Navbar from '../../Components/Navbar';

export const Payment = () => {
  const paymentDetails = [
    {
      month: "January",
      details: [
        { userId: 1, date: "2025-01-15", paymentName: "Sameer", paymentType: "Online", thisMonthCost: 10000, amountPaid: 8000 },
        { userId: 2, date: "2025-01-20", paymentName: "John", paymentType: "Offline", thisMonthCost: 12000, amountPaid: 12000 },
      ],
    },
    {
      month: "February",
      details: [
        { userId: 1, date: "2025-02-10", paymentName: "Sameer", paymentType: "Online", thisMonthCost: 15000, amountPaid: 15000 },
        { userId: 3, date: "2025-02-18", paymentName: "Jane", paymentType: "Offline", thisMonthCost: 8000, amountPaid: 6000 },
      ],
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [sortAscending, setSortAscending] = useState(true);

  const navigate = useNavigate(); // Initialize useNavigate

  // Flattened and filtered data
  const filteredData = paymentDetails
    .filter((item) => (selectedMonth ? item.month === selectedMonth : true))
    .flatMap((item) => item.details)
    .filter((detail) =>
      detail.paymentName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortAscending ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date)
    );

  // Calculate totals
  const totalCost = filteredData.reduce((sum, item) => sum + item.thisMonthCost, 0);
  const totalAmountPaid = filteredData.reduce((sum, item) => sum + item.amountPaid, 0);

  // Navigate to user details page
  const handleViewMore = (user) => {
    navigate(`/paymentDetail/${user.userId}`, { state: user });
  };

  return (
    <div className="payment dark-theme">
      <Navbar />
      <div className="container">
        <h1 className="payment_title">Payments</h1>
        
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        {/* Month Selector */}
        <select
          className="month-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">All Months</option>
          {paymentDetails.map((item, index) => (
            <option key={index} value={item.month}>
              {item.month}
            </option>
          ))}
        </select>
        
        {/* Totals */}
        <div className="totals">
          <p>Total Cost for {selectedMonth || 'All Months'}: {totalCost}</p>
          <p>Total Amount Received: {totalAmountPaid}</p>
        </div>

        {/* Table */}
        <table className="payment-table">
          <thead>
            <tr>
              <th onClick={() => setSortAscending(!sortAscending)}>Date {sortAscending ? '↑' : '↓'}</th>
              <th>Name</th>
              <th>Payment Type</th>
              <th>Cost</th>
              <th>Amount Paid</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.paymentName}</td>
                <td>{item.paymentType}</td>
                <td>{item.thisMonthCost}</td>
                <td>{item.amountPaid}</td>
                <td>
                  <button className="view-more-btn" onClick={() => handleViewMore(item)}>
                    View More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payment;
