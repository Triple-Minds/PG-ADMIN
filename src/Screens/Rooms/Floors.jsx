import React from 'react';
import { useParams } from 'react-router-dom';
import './rooms.css';
import floorImg from '../../Assets/FloorImg.jpg'
import roomImg from '../../Assets/FloorImg.jpg'
import Navbar from '../../Components/Navbar';

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
const FloorDetails = () => {
  const { floorId } = useParams();
  const floor = floorsData.find((floor) => floor.id === parseInt(floorId));

  if (!floor) return <div>Floor not found.</div>;

  const handleRoomSelection = (roomId) => {
    window.location.href = `/rooms/${floorId}/${roomId}`;
  };

  const handleBackToFloors = () => {
    window.location.href = '/rooms';
  };

  return (
    <div className="room-selection-container">
        <div className="room-selection-header-container">
            <button onClick={handleBackToFloors} className="back-to-floors-button">Back to Floors</button>
            <h2 className="room-selection-title">Rooms on {floor.name}</h2>
        </div>
        <div className="room-cards-container">
            {floor.rooms.map((room) => (
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
                <button onClick={() => handleRoomSelection(room.id)} className="view-room-button">
                    View Details
                </button>
                </div>
            </div>
            ))}
        </div>
    </div>
  );
};

const Floors = () => {
    return (
      <div className="rooms-background">
        <Navbar />
        <div className="rooms-main-container">
          <FloorDetails/>
        </div>
      </div>
    );
  };
  
  export default Floors;
