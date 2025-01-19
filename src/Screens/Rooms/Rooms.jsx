import React, { useState } from 'react';
import './rooms.css';
import Navbar from '../../Components/Navbar';
import floorImg from '../../Assets/FloorImg.jpg'
import roomImg from '../../Assets/FloorImg.jpg'

const floorsData = [
  {
    id: 1,
    name: 'First Floor',
    image: floorImg,
    rooms: Array.from({ length: 8 }, (_, index) => ({
      id: 101 + index,
      imageUrl: roomImg,
      type: 'Non-AC',
      sharing: index % 2 === 0 ? 2 : 3, // Alternate sharing types
      rent: index % 2 === 0 ? 3000 : 5000,
      status: index % 3 === 0 ? 'Empty' : index % 3 === 1 ? 'Partially Full' : 'Full',
      occupants: index % 3 === 0
        ? []
        : index % 3 === 1
        ? [
            { name: `John Doe ${index}`, gender: 'Male', paymentStatus: 'Paid' },
          ]
        : [
            { name: `John Doe ${index}`, gender: 'Male', paymentStatus: 'Paid' },
            { name: `Jane Smith ${index}`, gender: 'Female', paymentStatus: 'Unpaid' },
          ],
    })),
  },
  {
    id: 2,
    name: 'Second Floor',
    image: floorImg,
    rooms: Array.from({ length: 8 }, (_, index) => ({
      id: 201 + index,
      imageUrl: roomImg,
      type: 'Non-AC',
      sharing: index % 2 === 0 ? 2 : 3,
      rent: index % 2 === 0 ? 3000 : 5000,
      status: index % 3 === 0 ? 'Empty' : index % 3 === 1 ? 'Partially Full' : 'Full',
      occupants: index % 3 === 0
        ? []
        : index % 3 === 1
        ? [
            { name: `Alice Brown ${index}`, gender: 'Female', paymentStatus: 'Paid' },
          ]
        : [
            { name: `Alice Brown ${index}`, gender: 'Female', paymentStatus: 'Paid' },
            { name: `Ethan Harris ${index}`, gender: 'Male', paymentStatus: 'Unpaid' },
          ],
    })),
  },
  {
    id: 3,
    name: 'Third Floor',
    image: floorImg,
    rooms: Array.from({ length: 8 }, (_, index) => ({
      id: 301 + index,
      imageUrl: roomImg,
      type: 'Non-AC',
      sharing: index % 2 === 0 ? 2 : 3,
      rent: index % 2 === 0 ? 3000 : 5000,
      status: index % 3 === 0 ? 'Empty' : index % 3 === 1 ? 'Partially Full' : 'Full',
      occupants: index % 3 === 0
        ? []
        : index % 3 === 1
        ? [
            { name: `James Miller ${index}`, gender: 'Male', paymentStatus: 'Paid' },
          ]
        : [
            { name: `James Miller ${index}`, gender: 'Male', paymentStatus: 'Paid' },
            { name: `Olivia Davis ${index}`, gender: 'Female', paymentStatus: 'Unpaid' },
          ],
    })),
  },
  {
    id: 4,
    name: 'Fourth Floor',
    image: floorImg,
    rooms: Array.from({ length: 8 }, (_, index) => ({
      id: 401 + index,
      imageUrl: roomImg,
      type: 'AC',
      sharing: index % 2 === 0 ? 2 : 3,
      rent: index % 2 === 0 ? 6000 : 8000,
      status: index % 3 === 0 ? 'Empty' : index % 3 === 1 ? 'Partially Full' : 'Full',
      occupants: index % 3 === 0
        ? []
        : index % 3 === 1
        ? [
            { name: `Isabella Thompson ${index}`, gender: 'Female', paymentStatus: 'Paid' },
          ]
        : [
            { name: `Isabella Thompson ${index}`, gender: 'Female', paymentStatus: 'Paid' },
            { name: `Mason Clark ${index}`, gender: 'Male', paymentStatus: 'Unpaid' },
          ],
    })),
  },
  {
    id: 5,
    name: 'Fifth Floor',
    image: floorImg,
    rooms: Array.from({ length: 8 }, (_, index) => ({
      id: 501 + index,
      imageUrl: roomImg,
      type: 'AC',
      sharing: index % 2 === 0 ? 2 : 3,
      rent: index % 2 === 0 ? 6000 : 8000,
      status: index % 3 === 0 ? 'Empty' : index % 3 === 1 ? 'Partially Full' : 'Full',
      occupants: index % 3 === 0
        ? []
        : index % 3 === 1
        ? [
            { name: `Benjamin Anderson ${index}`, gender: 'Male', paymentStatus: 'Paid' },
          ]
        : [
            { name: `Benjamin Anderson ${index}`, gender: 'Male', paymentStatus: 'Paid' },
            { name: `Charlotte Garcia ${index}`, gender: 'Female', paymentStatus: 'Unpaid' },
          ],
    })),
  },
  {
    id: 6,
    name: 'Sixth Floor',
    image: floorImg,
    rooms: Array.from({ length: 8 }, (_, index) => ({
      id: 601 + index,
      imageUrl: roomImg,
      type: 'AC',
      sharing: index % 2 === 0 ? 2 : 3,
      rent: index % 2 === 0 ? 6000 : 8000,
      status: index % 3 === 0 ? 'Empty' : index % 3 === 1 ? 'Partially Full' : 'Full',
      occupants: index % 3 === 0
        ? []
        : index % 3 === 1
        ? [
            { name: `Lucas Martinez ${index}`, gender: 'Male', paymentStatus: 'Paid' },
          ]
        : [
            { name: `Lucas Martinez ${index}`, gender: 'Male', paymentStatus: 'Paid' },
            { name: `Amelia Rodriguez ${index}`, gender: 'Female', paymentStatus: 'Unpaid' },
          ],
    })),
  },
];




const RoomsFeature = () => {
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newOccupant, setNewOccupant] = useState({
    name: '',
    gender: '',
    paymentStatus: '',
  });

  const handleFloorSelection = (floor) => {
    setSelectedFloor(floor);
    setSelectedRoom(null);
  };

  const handleRoomSelection = (room) => {
    setSelectedRoom(room);
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

  const renderOccupants = (occupants, sharing) => {
    const icons = Array.from({ length: sharing }, (_, i) => (
      <span
        key={i}
        className={`occupant-icon ${occupants[i] ? 'icon-occupied' : 'icon-vacant'}`}
      >
        👤
      </span>
    ));
    return icons;
  };

  return (
    <div className="rooms-feature-container">
      <h1 className="rooms-feature-title">PGConnect Rooms Feature</h1>

      {/* Floors Display */}
      {!selectedFloor && (
        <div className="floor-selection-container">
          {floorsData.map((floor) => (
            <div className="floor-card" key={floor.id}>
              <img src={floor.image} alt={floor.name} className="floor-card-image" />
              <h3 className="floor-card-title">{floor.name}</h3>
              <button onClick={() => handleFloorSelection(floor)} className="view-floor-button">View</button>
            </div>
          ))}
        </div>
      )}

      {/* Rooms Display */}
      {selectedFloor && !selectedRoom && (
        <div className="room-selection-container">
          <div className="room-selection-header-container">
            <button onClick={() => setSelectedFloor(null)} className="back-to-floors-button">
              Back to Floors
            </button>
            <h2 className="room-selection-title">Rooms on {selectedFloor.name}</h2>
          </div>
          <div className="room-cards-container">
            {selectedFloor.rooms.map((room) => (
              <div className="room-card" key={room.id}>
                <div className="room-no-container">
                  <h3 className="room-card-title">Room {room.id}</h3>
                </div>
                <div className="room-image-container">
                  <img src={room.imageUrl} alt={`Room ${room.id}`} className="room-image" />
                </div>
                <div className="room-details-container">
                  <p className="room-type">Type: {room.type}</p>
                  <p className="room-sharing">Sharing: {room.sharing}</p>
                  <p className="room-rent">Rent: ₹{room.rent}</p>
                  <p className="room-status">Status: {room.status}</p>
                  <div className="occupancy-icons-container">
                    {renderOccupants(room.occupants, room.sharing)}
                  </div>
                  <button onClick={() => handleRoomSelection(room)} className="view-room-button">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Room Details Display */}
      {selectedRoom && (
        <div className="room-details-container-per-room">
          {/* Header */}
          <div className="room-details-header">
            <button onClick={() => setSelectedRoom(null)} className="back-to-rooms-button">Back to Rooms</button>
            <h2 className="room-details-title">Room {selectedRoom.id} Details</h2>
            {selectedRoom.status !== 'Full' && (
              <button onClick={handleAddButtonClick} className="add-occupant-button">Add</button>
            )}
          </div>

          {/* Room Details */}
          <div className="room-details-section">
            <p className="room-type"><strong>Type:</strong> {selectedRoom.type}</p>
            <p className="room-sharing"><strong>Sharing:</strong> {selectedRoom.sharing}</p>
            <p className="room-rent"><strong>Rent:</strong> ₹{selectedRoom.rent}</p>
            <p className="room-status"><strong>Status:</strong> {selectedRoom.status}</p>
          </div>

          {/* Occupants List Container */}
          <div className="occupants-list-container">
            <h3 className="occupants-list-title">Occupants:</h3>
            {selectedRoom.occupants.length > 0 ? (
              selectedRoom.occupants.map((occupant, index) => (
                <div className="occupant-card" key={index}>
                  <p className="occupant-name"><strong>Name:</strong> {occupant.name}</p>
                  <p className="occupant-gender"><strong>Gender:</strong> {occupant.gender}</p>
                  <p className="occupant-payment-status"><strong>Payment Status:</strong> {occupant.paymentStatus}</p>
                  <button className="view-payment-details-button">View Payment Details</button>
                </div>
              ))
            ) : (
              <p className="no-occupants-message">No occupants in this room.</p>
            )}
          </div>
        </div>
      )}

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
                onChange={(e) => setNewOccupant({ ...newOccupant, name: e.target.value })}
              />
            </label>
            <label>
              Gender:
              <select
                value={newOccupant.gender}
                onChange={(e) => setNewOccupant({ ...newOccupant, gender: e.target.value })}
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
                onChange={(e) => setNewOccupant({ ...newOccupant, paymentStatus: e.target.value })}
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

const Rooms = () => {
  return (
    <div className="rooms-background">
      <Navbar />
      <div className="rooms-main-container">
        <RoomsFeature />
      </div>
    </div>
  );
};

export default Rooms;

