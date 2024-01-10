import React, { useState, useEffect } from 'react';
import ApiService from './ApiService';
import { StyledTableContainer, StyledTable, StyledTableCell, StyledTableHeader } from './StyledTable';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [data, setData] = useState([]);

  // Function to fetch data from the backend
  const fetchData = async () => {
    try {
      const allData = await ApiService.getAllData();
      setData(allData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  // Function to refresh data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 1000); // Refresh data every second

    // Cleanup function
    return () => clearInterval(interval);
  }, []);

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StyledTableContainer>
      <StyledTable>
        <thead>
          <tr>
            <StyledTableHeader>Worker ID</StyledTableHeader>
            <StyledTableHeader>Name</StyledTableHeader>
            <StyledTableHeader>Timestamp</StyledTableHeader>
            <StyledTableHeader>Status</StyledTableHeader>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <StyledTableCell>{item[0]}</StyledTableCell>
              <StyledTableCell>{item[1]}</StyledTableCell>
              <StyledTableCell>{item[2]}</StyledTableCell>
              <StyledTableCell>{item[3]}</StyledTableCell>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </StyledTableContainer>
  );
}

export default App;
