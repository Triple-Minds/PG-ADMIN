import React from 'react';

const FloorSelection = ({ floors, setSelectedFloor }) => {
  return (
    <div className="floor-selection">
      <h2>Select a Floor</h2>
      <div className="floor-cards">
        {floors.map((floor, index) => (
          <div 
            key={index} 
            className="floor-card"
            onClick={() => setSelectedFloor(floor)}
          >
            {floor}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloorSelection;
