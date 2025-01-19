import React, { useState,} from 'react';
import "./use.css";
import Navbar from '../../Components/Navbar';

const floorsData = [
  {
    id: 1,
    name: 'First Floor',
    image: 'floorImg',
    rooms: Array.from({ length: 8 }, (_, index) => ({
      id: 101 + index,
      imageUrl: 'roomImg',
      type: 'Non-AC',
      sharing: index % 2 === 0 ? 2 : 3, // Alternate sharing types
      rent: index % 2 === 0 ? 3000 : 5000,
      status: index % 3 === 0 ? 'Empty' : index % 3 === 1 ? 'Partially Full' : 'Full',
      occupants: index % 3 === 0
        ? []
        : index % 3 === 1
        ? [
            { name: 'Alice Brown', gender: 'Female', paymentStatus: 'Paid' },
          ]
        : [
            { name: 'Alice Brown', gender: 'Female', paymentStatus: 'Paid' },
            { name: 'Ethan Harris', gender: 'Male', paymentStatus: 'Unpaid' },
          ],
    })),
  },
  {
    id: 2,
    name: 'Second Floor',
    image: 'floorImg',
    rooms: Array.from({ length: 8 }, (_, index) => ({
      id: 201 + index,
      imageUrl: 'roomImg',
      type: 'Non-AC',
      sharing: index % 2 === 0 ? 2 : 3,
      rent: index % 2 === 0 ? 3000 : 5000,
      status: index % 3 === 0 ? 'Empty' : index % 3 === 1 ? 'Partially Full' : 'Full',
      occupants: index % 3 === 0
        ? []
        : index % 3 === 1
        ? [
            { name: 'Sophia Williams', gender: 'Female', paymentStatus: 'Paid' },
          ]
        : [
            { name: 'Sophia Williams', gender: 'Female', paymentStatus: 'Paid' },
            { name: 'Liam Smith', gender: 'Male', paymentStatus: 'Unpaid' },
          ],
    })),
  },
  {
    id: 3,
    name: 'Third Floor',
    image: 'floorImg',
    rooms: Array.from({ length: 8 }, (_, index) => ({
      id: 301 + index,
      imageUrl: 'roomImg',
      type: 'Non-AC',
      sharing: index % 2 === 0 ? 2 : 3,
      rent: index % 2 === 0 ? 3000 : 5000,
      status: index % 3 === 0 ? 'Empty' : index % 3 === 1 ? 'Partially Full' : 'Full',
      occupants: index % 3 === 0
        ? []
        : index % 3 === 1
        ? [
            { name: 'James Miller', gender: 'Male', paymentStatus: 'Paid' },
          ]
        : [
            { name: 'James Miller', gender: 'Male', paymentStatus: 'Paid' },
            { name: 'Olivia Davis', gender: 'Female', paymentStatus: 'Unpaid' },
          ],
    })),
  },
  {
    id: 4,
    name: 'Fourth Floor',
    image: 'floorImg',
    rooms: Array.from({ length: 8 }, (_, index) => ({
      id: 401 + index,
      imageUrl: 'roomImg',
      type: 'AC',
      sharing: index % 2 === 0 ? 2 : 3,
      rent: index % 2 === 0 ? 6000 : 8000,
      status: index % 3 === 0 ? 'Empty' : index % 3 === 1 ? 'Partially Full' : 'Full',
      occupants: index % 3 === 0
        ? []
        : index % 3 === 1
        ? [
            { name: 'Isabella Thompson', gender: 'Female', paymentStatus: 'Paid' },
          ]
        : [
            { name: 'Isabella Thompson', gender: 'Female', paymentStatus: 'Paid' },
            { name: 'Mason Clark', gender: 'Male', paymentStatus: 'Unpaid' },
          ],
    })),
  },
  {
    id: 5,
    name: 'Fifth Floor',
    image: 'floorImg',
    rooms: Array.from({ length: 8 }, (_, index) => ({
      id: 501 + index,
      imageUrl: 'roomImg',
      type: 'AC',
      sharing: index % 2 === 0 ? 2 : 3,
      rent: index % 2 === 0 ? 6000 : 8000,
      status: index % 3 === 0 ? 'Empty' : index % 3 === 1 ? 'Partially Full' : 'Full',
      occupants: index % 3 === 0
        ? []
        : index % 3 === 1
        ? [
            { name: 'Benjamin Anderson', gender: 'Male', paymentStatus: 'Paid' },
          ]
        : [
            { name: 'Benjamin Anderson', gender: 'Male', paymentStatus: 'Paid' },
            { name: 'Charlotte Garcia', gender: 'Female', paymentStatus: 'Unpaid' },
          ],
    })),
  },
  {
    id: 6,
    name: 'Sixth Floor',
    image: 'floorImg',
    rooms: Array.from({ length: 8 }, (_, index) => ({
      id: 601 + index,
      imageUrl: 'roomImg',
      type: 'AC',
      sharing: index % 2 === 0 ? 2 : 3,
      rent: index % 2 === 0 ? 6000 : 8000,
      status: index % 3 === 0 ? 'Empty' : index % 3 === 1 ? 'Partially Full' : 'Full',
      occupants: index % 3 === 0
        ? []
        : index % 3 === 1
        ? [
            { name: 'Lucas Martinez', gender: 'Male', paymentStatus: 'Paid' },
          ]
        : [
            { name: 'Lucas Martinez', gender: 'Male', paymentStatus: 'Paid' },
            { name: 'Amelia Rodriguez', gender: 'Female', paymentStatus: 'Unpaid' },
          ],
    })),
  },
];


const User = () => {
  const [filter, setFilter] = useState({
    floor: '',
    gender: '',
    paymentStatus: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  // const navigate = useNavigate(); // For navigation

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  // Extract users from floors data
  const usersData = floorsData.flatMap(floor =>
    floor.rooms.flatMap(room =>
      room.occupants.map(occupant => ({
        name: occupant.name,
        floor: floor.name,
        roomNo: room.id,
        gender: occupant.gender,
        paymentStatus: occupant.paymentStatus, // Payment status of the user
        dueDate: '2025-02-10', // Example due date, you can change this logic based on your data
        roomDetails: room, // Add room details to each user
      }))
    )
  );

  // Filter users based on selected filter criteria
  const filteredUsers = usersData.filter((user) => {
    const { floor, gender, paymentStatus } = filter;
    const isFloorMatch = floor ? user.floor === floor : true;
    const isGenderMatch = gender ? user.gender === gender : true;
    const isStatusMatch = paymentStatus ? user.paymentStatus === paymentStatus : true;
    return isFloorMatch && isGenderMatch && isStatusMatch;
  });

  // Pagination logic
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handler for Room Details button
  const handleRoomDetails = (roomDetails) => {
    // Navigate to the room details page or show a modal with room details
    // Example: Assuming a route to RoomDetailsPage with room id
    // navigate(`/room-details/${roomDetails.id}`);
  };

  // Handler for Payment Details button
  const handlePaymentDetails = (user) => {
    // Navigate to the payment details page or show a modal with payment info
    // Example: Assuming a route to PaymentDetailsPage with user name
    // navigate(`/payment-details/${user.name}`);
  };

  return (
    <div className='users-background'>
      <Navbar />
      <div className='users-container'>

        {/* Header Section - Search and Filters */}
        <div className="users-header">
          <div className="search-filter-container">
            <input
              type="text"
              placeholder="Search by name..."
              className="search-bar"
            />
            <select name="floor" onChange={handleFilterChange} value={filter.floor} className="filter-dropdown">
              <option value="">All Floors</option>
              {floorsData.map((floor) => (
                <option key={floor.id} value={floor.name}>{floor.name}</option>
              ))}
            </select>
            <select name="gender" onChange={handleFilterChange} value={filter.gender} className="filter-dropdown">
              <option value="">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <select name="paymentStatus" onChange={handleFilterChange} value={filter.paymentStatus} className="filter-dropdown">
              <option value="">All Payment Status</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>
        </div>

        {/* Table of Users */}
        <div className="user-table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Floor</th>
                <th>Room No</th>
                <th>Gender</th>
                <th>Payment Status</th>
                <th>Due Date</th>
                <th>Room Details</th> {/* New Column */}
                <th>Payment Details</th> {/* New Column */}
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.floor}</td>
                  <td>{user.roomNo}</td>
                  <td>{user.gender}</td>
                  <td>{user.paymentStatus}</td>
                  <td>{user.dueDate}</td>
                  <td>
                    <button onClick={() => handleRoomDetails(user.roomDetails)}>Room Details</button> {/* Button for room details */}
                  </td>
                  <td>
                    <button onClick={() => handlePaymentDetails(user)}>Payment Details</button> {/* Button for payment details */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination-container">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Prev
            </button>
            <span className="pagination-info">
              Page {currentPage} of {Math.ceil(filteredUsers.length / itemsPerPage)}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(filteredUsers.length / itemsPerPage)}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default User;
