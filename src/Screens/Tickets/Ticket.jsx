import React, { useState } from "react";
import "./Ticket.css";
import Navbar from "../../Components/Navbar";
import { useNavigate } from "react-router-dom";

export const Ticket = () => {
  // Sample ticket data
  const ticketData = [
    {
      userId: "1",
      userName: "John Doe",
      userRoomNo: "101",
      ticketId: "T001",
      ticketDescription: "Light bulb needs replacement",
      ticketPriority: "High",
      ticketType: "electrical",
      isSolved: false,
      createdDate: "2025-01-01",
      solvedBy: "",
      expectedSolveDate: "2025-01-05",
      status: "in-progress",
      roomId: "R101",
      roomName: "Room 101",
    },
    {
      userId: "2",
      userName: "Jane Smith",
      userRoomNo: "102",
      ticketId: "T002",
      ticketDescription: "Leaky faucet in the bathroom",
      ticketPriority: "Medium",
      ticketType: "plumbing",
      isSolved: true,
      createdDate: "2025-01-02",
      solvedBy: "Mike",
      expectedSolveDate: "2025-01-06",
      status: "completed",
      roomId: "R102",
      roomName: "Room 102",
    },
    {
      userId: "3",
      userName: "Emily Davis",
      userRoomNo: "103",
      ticketId: "T003",
      ticketDescription: "Broken chair in the study room",
      ticketPriority: "Low",
      ticketType: "furniture",
      isSolved: false,
      createdDate: "2025-01-03",
      solvedBy: "",
      expectedSolveDate: "2025-01-07",
      status: "in-progress",
      roomId: "R103",
      roomName: "Room 103",
    },
    {
      userId: "4",
      userName: "Emily Davis",
      userRoomNo: "103",
      ticketId: "T004",
      ticketDescription: "Broken chair in the study room",
      ticketPriority: "Low",
      ticketType: "furniture",
      isSolved: false,
      createdDate: "2025-01-03",
      solvedBy: "",
      expectedSolveDate: "2025-01-07",
      status: "in-progress",
      roomId: "R103",
      roomName: "Room 103",
    },
    {
      userId: "5",
      userName: "Emily Davis",
      userRoomNo: "103",
      ticketId: "T005",
      ticketDescription: "Broken chair in the study room",
      ticketPriority: "Low",
      ticketType: "furniture",
      isSolved: false,
      createdDate: "2025-01-03",
      solvedBy: "",
      expectedSolveDate: "2025-01-07",
      status: "in-progress",
      roomId: "R103",
      roomName: "Room 103",
    },
  ];

  const navigate = useNavigate();


  // Remove duplicate tickets by ticketId
  const uniqueTicketData = Array.from(
    new Map(ticketData.map((ticket) => [ticket.ticketId, ticket])).values()
  );

  const ticketTypeArray = ["electrical", "furniture", "plumbing"];

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState([]);

  const handleCheckboxChange = (type) => {
    setFilterType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // Filtered tickets based on search and filters
  const filteredTickets = React.useMemo(() => {
    return uniqueTicketData.filter((ticket) => {
      const matchesSearch =
        search === "" ||
        ticket.ticketDescription.toLowerCase().includes(search.toLowerCase()) ||
        ticket.userName.toLowerCase().includes(search.toLowerCase()) ||
        ticket.ticketId.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        filterStatus === "" || ticket.status === filterStatus;

      const matchesType =
        filterType.length === 0 || filterType.includes(ticket.ticketType);

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [search, filterStatus, filterType, uniqueTicketData]);


  const handleViewMore = (ticket) => {
    navigate(`/ticket/${ticket.ticketId}`, { state: { ticket } });
    console.log('View more details for:', ticket);
  };

  return (
    <div className="ticket">
      <Navbar />
      <div className="ticket-container">
        <div className="ticket-list-container">
          <h1 style={{ color: "white" }}>Ticket Management</h1>
          <div className="filters">
            <input
              type="text"
              placeholder="Search tickets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="ticket-list">
            {filteredTickets.length === 0 ? (
              <p className="no-tickets">No tickets found.</p>
            ) : (
              filteredTickets.map((ticket) => (
                <div key={ticket.ticketId} className="ticket-card">
                  <h3>{ticket.ticketDescription}</h3>
                  <p>
                    <strong>User:</strong> {ticket.userName} ({ticket.userRoomNo})
                  </p>
                  <p>
                    <strong>Priority:</strong> {ticket.ticketPriority}
                  </p>
                  <p>
                    <strong>Type:</strong> {ticket.ticketType}
                  </p>
                  <p>
                    <strong>Status:</strong> {ticket.status}
                  </p>
                  <button className="view-more-btn" onClick={() => handleViewMore(ticket)}
                  >View More</button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="filter-options">
          <label className="filter-label">Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="select-dropdown"
          >
            <option value="">All</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <div className="checkbox-filters">
            <label className="filter-label">Filter by Type:</label>
            <div>
              {ticketTypeArray.map((type) => (
                <label key={type} className="checkbox-label">
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(type)}
                    checked={filterType.includes(type)}
                  />
                  <span style={{ marginLeft: "5px" }}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
