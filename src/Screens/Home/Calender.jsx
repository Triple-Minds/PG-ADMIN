import React, { useState } from "react";

const Calender = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [reminder, setReminder] = useState("");
  const [reminders, setReminders] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = new Date(2025, selectedMonth + 1, 0).getDate();

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value, 10));
    setSelectedDate(null);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setReminder(reminders[`${selectedMonth}-${date}`] || "");
    setShowPopup(true);
  };

  const handleSave = () => {
    setReminders({ ...reminders, [`${selectedMonth}-${selectedDate}`]: reminder });
    setShowPopup(false);
  };

  return (
    <div className="right_calendar">
      <div style={{ display: "flex", justifyContent: "space-between",gap:"10px",alignItems:"center" }}>
        <select value={selectedMonth} onChange={handleMonthChange}>
        {months.map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))} 
      </select>
      <div style={{ color: "white" }}>{new Date().getFullYear()}</div></div>

      <div className="calendar-grid">
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <div
            key={day}
            className="calendar-day"
            onClick={() => handleDateClick(day)}
          >
            <span>{day}</span>
            {reminders[`${selectedMonth}-${day}`] && (
              <small>📌</small>
            )}
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="popup">
          <h3 color="white">Set Reminder for {months[selectedMonth]} {selectedDate}</h3>
          <input
            type="text"
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
            placeholder="Enter your reminder"
            className="input_calender"
          />
          <div className="popup-actions">
            <button onClick={handleSave}  className="btn_calender">Save</button>
            <button onClick={() => setShowPopup(false)} className="btn_calender">Close</button>
          </div>
        </div>
      )}

     
    </div>
  );
};

export default Calender;
