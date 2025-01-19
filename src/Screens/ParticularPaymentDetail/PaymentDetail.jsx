import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import './paymentDetail.css';
export const PaymentDetail = () => {
  const { userId } = useParams();
  const { state } = useLocation(); // Access the data passed via navigate

  return (
    <div className="payment-detail">
      <Navbar />
      <div className="container">
        <h1>Payment Details for User {userId}</h1>
        <p><strong>Date:</strong> {state.date}</p>
        <p><strong>Name:</strong> {state.paymentName}</p>
        <p><strong>Payment Type:</strong> {state.paymentType}</p>
        <p><strong>This Month Cost:</strong> {state.thisMonthCost}</p>
        <p><strong>Amount Paid:</strong> {state.amountPaid}</p>
      </div>
    </div>
  );
};

export default PaymentDetail;
