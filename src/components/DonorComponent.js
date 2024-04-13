import React from "react";
import userService from '../services/userService';
import '../style/donor.css';
import DonorService from "../services/DonorService";
import logo from '../images/logo1.jpeg';


class DonorComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            email: '',
            fullName: '',
            quantity: '',
            bloodGroup: '',
            contactNumber: '',
            address: '',
            lastDonationDate: '',
            error: null
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { username, password, email, fullName, quantity, bloodGroup, contactNumber, address, lastDonationDate } = this.state;

        // Create donor object
        const donor = {
            username: username,
            password: password,
            email: email,
            fullName: fullName,
            quantity: quantity,
            bloodGroup: bloodGroup,
            contactNumber: contactNumber,
            address: address,
            lastDonationDate: lastDonationDate
        };

        // Send POST request to register donor
        DonorService.registerDonor(donor)
            .then(() => {
                console.log('Donor registered successfully');
                this.setState({ successMessage: 'Donor registered successfully' });
                window.alert('Donor registered successfully');
                // Optionally, you can redirect or show a success message here
            })
            .catch(error => {
                window.alert('Error! Try Again!');
                this.setState({ error: error });
                console.error('Error registering donor:', error);
            });
    }

    render() {
        const { username, password, email, fullName, quantity, bloodGroup, contactNumber, address, lastDonationDate, error } = this.state;

        return (
            <div className="app">
                    <header className="app-header">
      <img src={logo} alt="Logo" className="logo"/>
    </header>
                <div className="container2">
                    <div className="head"><h1>Register Donor</h1></div>
                    {error && <div className="error-message">Error: {error.message}</div>}
                    <form className="form-container" onSubmit={this.handleSubmit}>
                        <div className="input-group">
                            <label>Username:</label>
                            <input type="text" name="username" value={username} onChange={this.handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>Password:</label>
                            <input type="password" name="password" value={password} onChange={this.handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>Email:</label>
                            <input type="email" name="email" value={email} onChange={this.handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>Full Name:</label>
                            <input type="text" name="fullName" value={fullName} onChange={this.handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>Quantity (ml):</label>
                            <input type="number" name="quantity" value={quantity} onChange={this.handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>Blood Group:</label>
                            <input type="text" name="bloodGroup" value={bloodGroup} onChange={this.handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>Contact Number:</label>
                            <input type="text" name="contactNumber" value={contactNumber} onChange={this.handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>Address:</label>
                            <input type="text" name="address" value={address} onChange={this.handleChange} required />
                        </div>
                        <div className="input-group">
                            <label>Last Donation Date:</label>
                            <input type="date" name="lastDonationDate" value={lastDonationDate} onChange={this.handleChange} required />
                        </div>
                        <div>
                            <button className="submit-btn" type="submit">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default DonorComponent;
