// frontend/src/api.js
export const fetchUserData = async () => {
    const response = await fetch('http://localhost:5000/users');
    return response.json();
  };
  
  // frontend/src/App.js
  import React, { useEffect, useState } from 'react';
  import { fetchUserData } from './api';
  
  function App() {
    const [userData, setUserData] = useState([]);
  
    useEffect(() => {
      fetchUserData().then(data => setUserData(data));
    }, []);
  
    return (
      <div>
        <h1>User Data</h1>
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      </div>
    );
  }
  
  export default App;
  