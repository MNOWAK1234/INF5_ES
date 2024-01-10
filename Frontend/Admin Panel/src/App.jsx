import React, { useState, useEffect } from 'react';
import ApiService from './ApiService';
import {
  StyledBackground,
  StyledTableContainer,
  StyledTable,
  StyledTableCell,
  StyledTableHeader,
  StyledTitle,
  StyledTableTitle,
  StyledNavBar,
  StyledNavLink,
} from './Styles';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [data, setData] = useState([]);
  const [entriesToShow, setEntriesToShow] = useState(4); // Initial number of entries to display
  const [totalEntries, setTotalEntries] = useState(0);

  // Function to fetch data from the backend
  const fetchData = async () => {
    try {
      const allData = await ApiService.getAllData();
      setData(allData);
      setTotalEntries(allData.length);
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

  // Function to load more entries
  const loadMoreEntries = () => {
    // Increase the number of entries to display by 2 (for example)
    setEntriesToShow(entriesToShow + 2);
  };


  return (
    <StyledBackground>
      <div>
        <StyledTitle>Administration Panel</StyledTitle>
        <StyledNavBar>
          <StyledNavLink href="#getWorkerData">Worker Data</StyledNavLink>
          <StyledNavLink href="#getDataByTimestamp">Entries By Timestamp</StyledNavLink>
          <StyledNavLink href="#getDataByWorkerAndTimestamps">Entries of Worker by Timestamps</StyledNavLink>
          <StyledNavLink href="#getCurrentWorkers">Working Today</StyledNavLink>
          <StyledNavLink href="#getEntryCount">Statistics</StyledNavLink>
          <StyledNavLink href="#getAllData">History</StyledNavLink>
        </StyledNavBar>
        <StyledTableTitle>Access Logs</StyledTableTitle>
        <StyledTableContainer>
          <StyledTable>
          <thead>
            <tr>
              <StyledTableHeader>ID</StyledTableHeader>
              <StyledTableHeader>Name</StyledTableHeader>
              <StyledTableHeader>Timestamp</StyledTableHeader>
              <StyledTableHeader>Status</StyledTableHeader>
            </tr>
          </thead>
          <tbody>
              {data.slice(0, entriesToShow).map((item, index) => (
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
        {entriesToShow < totalEntries && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button onClick={loadMoreEntries}>Get 2 More</button>
          </div>
        )}
      </div>
    </StyledBackground>
  );
}

export default App;
