import React, { useState } from 'react';
import axios from 'axios';
import '../style/style.css';
import logo from '../images/logo1.jpeg';



const DonorLoginComponent = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/donors/login', credentials);
      // Redirect or perform additional actions on successful login
      console.log(response.data); // Log the success message
      window.alert('Donor Login successfully');

      setError(''); // Clear any previous errors
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle unauthorized access
        setError('Invalid username or password');
      } else {
        // Handle other errors
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="app">
          <header className="app-header">
      <img src={logo} alt="Logo" className="logo"/>
    </header>
      <div className="container">
        <div className="head"><h1>Donor Login</h1></div>
        {error && <div className="error-message">Error: {error}</div>}
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username:</label>
            <input type="text" name="username" value={credentials.username} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
          </div>
          <div>
            <button className="submit-btn" type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonorLoginComponent;
