import React from 'react';

const RoomDisplay = ({ selectedFloor, roomFilters }) => {
  const rooms = [
    { id: 1, type: '2 Sharing', status: 'Full', price: 5000 },
    { id: 2, type: '3 Sharing', status: 'Partially Full', price: 4000 },
    { id: 4, type: '3 Sharing', status: 'Partially Full', price: 4000 },
    { id: 5, type: '3 Sharing', status: 'Partially Full', price: 4000 },
    { id: 6, type: '3 Sharing', status: 'Partially Full', price: 4000 },
    { id: 7, type: '3 Sharing', status: 'Partially Full', price: 4000 },
    { id: 8, type: '3 Sharing', status: 'Partially Full', price: 4000 },
    { id: 9, type: '3 Sharing', status: 'Partially Full', price: 4000 },
    { id: 3, type: '4 Sharing', status: 'Empty', price: 3000 }
  ]; // Example room data
  
  const filteredRooms = rooms.filter(room => {
    if (roomFilters.roomType && room.type !== roomFilters.roomType) return false;
    if (roomFilters.occupancy && room.status !== roomFilters.occupancy) return false;
    if (roomFilters.priceRange && (room.price < roomFilters.priceRange[0] || room.price > roomFilters.priceRange[1])) return false;
    return true;
  });

  return (
    <div className="room-display">
      <h2>Rooms Available on {selectedFloor}</h2>
      <div className="room-cards">
        {filteredRooms.map(room => (
          <div key={room.id} className={`room-card ${room.status.toLowerCase()}`}>
            <p>{room.type}</p>
            <p>Status: {room.status}</p>
            <p>Price: ₹{room.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomDisplay;
