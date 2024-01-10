import React, { useEffect } from 'react';
import ApiService from './ApiService'; // Import the ApiService

function App() {
  // Example usage of the ApiService functions
  useEffect(() => {
    // Fetch all data
    const fetchData = async () => {
      try {
        const allData = await ApiService.getAllData();
        console.log('All data:', allData);
      } catch (error) {
        console.error('Error fetching all data:', error.message);
      }
    };
    fetchData();

    // Fetch worker data for a specific username
    const fetchWorkerData = async () => {
      const username = 'exampleUsername';
      try {
        const workerData = await ApiService.getWorkerData(username);
        console.log('Worker data:', workerData);
      } catch (error) {
        console.error('Error fetching worker data:', error.message);
      }
    };
    fetchWorkerData();

    // You can similarly call other functions from the ApiService here...
  }, []);

  return (
    <div>
      <h1>Using ApiService Functions</h1>
      {/* Your JSX content goes here */}
    </div>
  );
}

export default App;
