import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DefaultersListPage = () => {
  const [defaulters, setDefaulters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/defaulters/');
        setDefaulters(response.data);
      } catch (error) {
        console.error('Error fetching defaulters:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Defaulters List</h2>
      <ul>
        {defaulters.map(defaulter => (
          <li key={defaulter.id}>
            <p>User Name: {defaulter.user.first_name} {defaulter.user.last_name} </p>
            <p>Stop Date: {defaulter.pending_since_date}</p>
            <p>Remaining Loan Amount: {defaulter.default_amount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DefaultersListPage;
