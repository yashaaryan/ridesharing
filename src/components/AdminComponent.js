import React from "react";
import AdminService from '../services/AdminService';
import '../style/style.css';
import logo from '../images/logo1.jpeg';


class AdminComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            email: '',
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

        const { username, password, email } = this.state;

        // Create admin object
        const admin = {
            username: username,
            password: password,
            email: email
        };

        // Send POST request to register admin
        AdminService.registerAdmin(admin)
            .then(() => {
                console.log('Admin registered successfully');
                window.alert('Admin registered successfully');

                // Optionally, you can navigate to a different page or show a success message here
            })
            .catch(error => {
                this.setState({ error: error });
                console.error('Error registering admin:', error);
            });
    }

    render() {
        const { username, password, email, error } = this.state;

        return (
            <div className="app">
                    <header className="app-header">
      <img src={logo} alt="Logo" className="logo"/>
    </header>
                <div className="container">
                    <div className="head"><h1>Register Admin</h1></div>
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
                        <div>
                            <button className="submit-btn" type="submit">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AdminComponent;
