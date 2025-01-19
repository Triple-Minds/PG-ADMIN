import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { color } from 'chart.js/helpers';

// Register the necessary chart elements
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const monthWiseData = [
  {
    month: 'January',
    totalCostForMonth: 10000,
    noOfEmpPaid: 10,
    noOfEmpNonPaid: 2,
    noOfEmpOverPaid: 1,
    currentNumber: 29080,
    totalNumber: 30000,
    income: 30000,
    outcome: 40000,
    balance: 8000,
  },
  {
    month: 'February',
    totalCostForMonth: 12000,
    noOfEmpPaid: 12,
    noOfEmpNonPaid: 1,
    noOfEmpOverPaid: 2,
    currentNumber: 39021,
    totalNumber: 40000,
    income: 30000,
    outcome: 40000,
    balance: 3000,
  },
  {
    month: 'March',
    totalCostForMonth: 15000,
    noOfEmpPaid: 15,
    noOfEmpNonPaid: 0,
    noOfEmpOverPaid: 3,
    currentNumber: 43432,
    totalNumber: 45000,
    income: 30000,
    outcome: 40000,
    balance: 3000,
  },
];

const ChartDiv = () => {
  // State to manage the selected month
  const [selectedMonth, setSelectedMonth] = useState(monthWiseData[0].month);

  // Function to handle month change
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // Get data for the selected month
  const selectedMonthData = monthWiseData.find((data) => data.month === selectedMonth);

  // Prepare the chart data for the selected month
  const chartData = {
    labels: ['Income', 'Outcome', 'Balance'],
    datasets: [
      {
        data: [selectedMonthData.income, selectedMonthData.outcome, selectedMonthData.balance],
        backgroundColor: ['#1E90FF', '#FF6347', '#32CD32'], // Light Blue, Bright Red, Fresh Green for dark theme
        hoverBackgroundColor: ['#4682B4', '#FF4500', '#228B22'], // Slightly darker versions for hover effect
      },
    ],
    color: "#fff", // White color for text (labels, etc.)
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Total Income, Outcome, and Balance for ${selectedMonth} (Donut Chart)`,
        color: '#fff',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
      legend: {
        position: 'top',
        color:"#fff",
      },
    },
  };

  return (
    <div>
        <div>
        <label htmlFor="monthSelect" className='monthName'>Select Month: </label>
        <select
          id="monthSelect"
          value={selectedMonth}
          onChange={handleMonthChange}
          color='#fff'
        >
          {monthWiseData.map((data) => (
            <option key={data.month} value={data.month}>
              {data.month}
            </option>
          ))}
        </select>
      </div>
      
      {/* Donut chart */}
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
};

export default ChartDiv;
