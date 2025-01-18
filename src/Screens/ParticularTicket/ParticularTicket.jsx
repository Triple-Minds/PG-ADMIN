import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./particularTicket.css";
import Navbar from "../../Components/Navbar";

function ParticularTicket() {
  const location = useLocation();
  const ticket = location.state?.ticket;

  const [status, setStatus] = useState(ticket?.status || "");

  if (!ticket) {
    return <div className="no-ticket">No ticket data found.</div>;
  }

  const handleStatusUpdate = (e) => {
    const newStatus = e.target.value;

    // Ask for confirmation
    const confirmUpdate = window.confirm(
      `Are you sure you want to update the status to "${newStatus}"?`
    );

    if (confirmUpdate) {
      setStatus(newStatus);
      alert(`Ticket status updated to "${newStatus}"!`);
      // You can integrate an API call here to persist the status change.
    } else {
      e.target.value = status; // Reset dropdown to the current status.
    }
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        backgroundColor: "var(--main-background-color)",
      }}
    >
      <Navbar />
      <div className="particular-ticket">
        <div className="ticket-header">
          <h1>Ticket Details</h1>
        </div>
        <div className="ticket-details">
          <p>
            <strong>Ticket ID:</strong> {ticket.ticketId}
          </p>
          <p>
            <strong>Description:</strong> {ticket.ticketDescription}
          </p>
          <p>
            <strong>User:</strong> {ticket.userName} ({ticket.userRoomNo})
          </p>
          <p>
            <strong>Priority:</strong>{" "}
            <span className={`priority ${ticket.ticketPriority.toLowerCase()}`}>
              {ticket.ticketPriority}
            </span>
          </p>
          <p>
            <strong>Type:</strong> {ticket.ticketType}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`status ${status.replace(" ", "-").toLowerCase()}`}
            >
              {status}
            </span>
          </p>
          <p>
            <strong>Created Date:</strong> {ticket.createdDate}
          </p>
          <p>
            <strong>Expected Solve Date:</strong> {ticket.expectedSolveDate}
          </p>
          <div className="update-status">
            <label htmlFor="status-select">
              <strong>Update Status:</strong>
            </label>
            <select
              id="status-select"
              value={status}
              onChange={handleStatusUpdate}
              className="status-dropdown"
            >
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParticularTicket;
