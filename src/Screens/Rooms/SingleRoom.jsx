import React from 'react';
import { useState } from 'react';
import { useParams} from 'react-router-dom';
import './rooms.css';
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

const RoomDetails = () => {
    const { floorId, roomId } = useParams();
    
    const floor = floorsData.find((floor) => floor.id === parseInt(floorId));
    const room = floor?.rooms.find((room) => room.id === parseInt(roomId));
    const [selectedRoom, setSelectedRoom] = useState(room);
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [newOccupant, setNewOccupant] = useState({
      name: '',
      gender: '',
      paymentStatus: '',
    });
  
    if (!floor || !room) return <div>Room not found.</div>;
  
  
    const handleBackToRooms = () => {
      window.location.href = `/rooms/${floorId}`;
    };
  
    const handleAddButtonClick = () => {
      setShowAddPopup(true);
    };
  
    const handleAddOccupant = () => {
      if (newOccupant.name && newOccupant.gender && newOccupant.paymentStatus) {
        const updatedRoom = { ...selectedRoom };
        updatedRoom.occupants.push(newOccupant);
  
        // Update room status dynamically based on occupancy
        if (updatedRoom.occupants.length === updatedRoom.sharing) {
          updatedRoom.status = 'Full';
        } else if (updatedRoom.occupants.length > 0) {
          updatedRoom.status = 'Partially Full';
        }
  
        // Update the selected room and close the popup
        setSelectedRoom(updatedRoom);
        setNewOccupant({ name: '', gender: '', paymentStatus: '' });
        setShowAddPopup(false);
      } else {
        alert('Please fill in all details.');
      }
    };
  
    const handleClosePopup = () => {
      setShowAddPopup(false);
      setNewOccupant({ name: '', gender: '', paymentStatus: '' });
    };
  
    return (
      <div className="room-details-container-per-room">
        <div className="room-details-header">
          <button onClick={handleBackToRooms} className="back-to-rooms-button">
            Back to Rooms
          </button>
          <h2 className="room-details-title">Room {room.id} Details</h2>
          {selectedRoom.status !== 'Full' && (
            <button onClick={handleAddButtonClick} className="add-occupant-button">
              Add
            </button>
          )}
        </div>
        <div className="room-details-section">
          <p className="room-type">
            <strong>Type:</strong> {room.type}
          </p>
          <p className="room-sharing">
            <strong>Sharing:</strong> {room.sharing}
          </p>
          <p className="room-rent">
            <strong>Rent:</strong> ₹{room.rent}
          </p>
          <p className="room-status">
            <strong>Status:</strong> {room.status}
          </p>
        </div>
  
        <div className="occupants-list-container">
          <h3 className="occupants-list-title">Occupants:</h3>
          {room.occupants.length > 0 ? (
            room.occupants.map((occupant, index) => (
              <div className="occupant-card" key={index}>
                <p className="occupant-name">
                  <strong>Name:</strong> {occupant.name}
                </p>
                <p className="occupant-gender">
                  <strong>Gender:</strong> {occupant.gender}
                </p>
                <p className="occupant-payment-status">
                  <strong>Payment Status:</strong> {occupant.paymentStatus}
                </p>
                <button className="view-payment-details-button">
                  View Payment Details
                </button>
              </div>
            ))
          ) : (
            <p className="no-occupants-message">No occupants in this room.</p>
          )}
        </div>
  
        {/* Add Occupant Popup */}
        {showAddPopup && (
          <div className="add-occupant-popup">
            <div className="popup-content">
              <h2>Add Occupant</h2>
              <label>
                Name:
                <input
                  type="text"
                  value={newOccupant.name}
                  onChange={(e) =>
                    setNewOccupant({ ...newOccupant, name: e.target.value })
                  }
                />
              </label>
              <label>
                Gender:
                <select
                  value={newOccupant.gender}
                  onChange={(e) =>
                    setNewOccupant({ ...newOccupant, gender: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </label>
              <label>
                Payment Status:
                <select
                  value={newOccupant.paymentStatus}
                  onChange={(e) =>
                    setNewOccupant({ ...newOccupant, paymentStatus: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </label>
              <div className="popup-actions">
                <button onClick={handleAddOccupant}>Add</button>
                <button onClick={handleClosePopup}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  const SingleRoom = () => {
    return (
      <div className="rooms-background">
        <Navbar />
        <div className="rooms-main-container">
          <RoomDetails />
        </div>
      </div>
    );
  };
  
  export default SingleRoom;