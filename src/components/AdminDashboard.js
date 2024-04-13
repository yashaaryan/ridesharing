import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../images/logo1.jpeg';
import { Link } from 'react-router-dom';


const NavBar = () => {
    return (
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="navbar-links">
          <Link to="/adminLogin" className="nav-link">Admin</Link>
          <Link to="/userLogin" className="nav-link">User</Link>
          <Link to="/donorLogin" className="nav-link">Donor</Link>
        </div>
      </nav>
    );
  };

  const sampleData = [
    { bloodGroup: 'A+', bloodQuantity: 10, donationDate: '2024-04-01' },
    { bloodGroup: 'B-', bloodQuantity: 5, donationDate: '2024-03-15' },
    { bloodGroup: 'O+', bloodQuantity: 15, donationDate: '2024-04-05' },
    { bloodGroup: 'AB+', bloodQuantity: 8, donationDate: '2024-03-20' },
    { bloodGroup: 'O-', bloodQuantity: 12, donationDate: '2024-04-10' },
    { bloodGroup: 'A-', bloodQuantity: 7, donationDate: '2024-04-03' },
  ];
  

const ButtonBox = ({ buttonText, onClick }) => {
  return (
    <div className="button-box" onClick={onClick}>
      <button>{buttonText}</button>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 Team SWE. All rights reserved.</p>
      </div>
    </footer>
  );
};

const MainContent = () => {
    const [bloodInventory, setBloodInventory] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    // For prototype, set sample data
    setBloodInventory(sampleData);
  }, []);
  useEffect(() => {
    fetchData('api_endpoint_blood_inventory');
  }, []);

  const fetchData = async (apiEndpoint) => {
    try {
      const response = await axios.get(apiEndpoint);
     setBloodInventory(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const togglePopup = async () => {
    try {
      //const response = await axios.get('api_endpoint_all_donors');
      const sampleDonors = [
        { name: 'John Doe', bloodGroup: 'A+' },
        { name: 'Jane Smith', bloodGroup: 'B-' },
        { name: 'David Johnson', bloodGroup: 'O+' },
      ];
      setDonors(sampleDonors);
      setShowPopup(!showPopup);
    } catch (error) {
      console.error('Error fetching donors:', error);
    }
  };

  return (
    <div className="main-content">
      <h1>Welcome Admin!</h1>
      <div className="button-container">
        <ButtonBox buttonText="View Donors" onClick={togglePopup} />
        <ButtonBox buttonText="View User" onClick={() => fetchData('api_endpoint_2')} />
        <ButtonBox buttonText="View Appointmnets" onClick={() => fetchData('api_endpoint_3')} />
        <ButtonBox buttonText="Cancel Appointments" onClick={() => fetchData('api_endpoint_4')} />
      </div>
      <div className="table-container">
        <h2>Blood Inventory</h2>
        <table className="blood-table">
          <thead>
            <tr>
              <th>Blood Group</th>
              <th>Quantity</th>
              <th>Donation Date</th>
            </tr>
          </thead>
          <tbody>
            {bloodInventory.map((item, index) => (
              <tr key={index}>
                <td>{item.bloodGroup}</td>
                <td>{item.bloodQuantity}</td>
                <td>{item.donationDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h2>All Donors</h2>
            <ul>
              {donors.map((donor, index) => (
                <li key={index}>
                  {donor.name} - {donor.bloodGroup}
                </li>
              ))}
            </ul>
            <button onClick={togglePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div className="app">
      <NavBar />
      <MainContent />
      <Footer />
    </div>
  );
};

export default AdminDashboard;
