import React from 'react';

const Filters = ({ roomFilters, setRoomFilters }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setRoomFilters({ ...roomFilters, [name]: value });
  };

  const handlePriceChange = (e) => {
    setRoomFilters({ ...roomFilters, priceRange: [e.target.value, roomFilters.priceRange[1]] });
  };

  return (
    <div className="filters">
      <h2>Filters</h2>

      <label>Room Type:</label>
      <select name="roomType" onChange={handleFilterChange}>
        <option value="">Any</option>
        <option value="AC">AC</option>
        <option value="Non-AC">Non-AC</option>
      </select>

      <label>Occupancy:</label>
      <select name="occupancy" onChange={handleFilterChange}>
        <option value="">Any</option>
        <option value="Full">Full</option>
        <option value="Partially Full">Partially Full</option>
        <option value="Empty">Empty</option>
      </select>

      <label>Sharing Type:</label>
      <select name="sharing" onChange={handleFilterChange}>
        <option value="">Any</option>
        <option value="2 Sharing">2 Sharing</option>
        <option value="3 Sharing">3 Sharing</option>
        <option value="4 Sharing">4 Sharing</option>
      </select>

      <label>Price Range: </label>
      <input
        type="range"
        name="priceRange"
        min="1000"
        max="10000"
        value={roomFilters.priceRange[0]}
        onChange={handlePriceChange}
      />
      <p>Price: ₹{roomFilters.priceRange[0]}</p>
    </div>
  );
};

export default Filters;
