import React from "react";
import AdminService from "../services/AdminService";
import logo from "../images/logo1.jpeg";
import { Button, Input } from "@nextui-org/react";

class AdminComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
      error: null,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { username, password, email } = this.state;

    // Create admin object
    const admin = {
      username: username,
      password: password,
      email: email,
    };

    // Send POST request to register admin
    AdminService.registerAdmin(admin)
      .then(() => {
        console.log("Admin registered successfully");
        window.alert("Admin registered successfully");


        window.location.href = "/adminLogin";
        // Optionally, you can navigate to a different page or show a success message here
      })
      .catch((error) => {
        this.setState({ error: error });
        console.error("Error registering admin:", error);
      });
  };

  render() {
    const { username, password, email, error } = this.state;

    return (
      <div className="flex flex-col justify-center p-3">
       <div className="flex justify-center items-center ">
          <img
            src={logo}
            style={{ height: "3rem", width: "auto", objectFit: "contain" }}
            alt="Logo"
            className="h-10 w-full "
          />
        </div>

        <div className="flex flex-col justify-center items-center w-full">
          <span className="text-2xl font-bold mt-5">Register Admin</span>

          {error && <div className="error-message">Error: {error.message}</div>}
          <form
            className=" grid grid-cols-1 mt-4 gap-4 w-[24rem] items-center justify-center "
            onSubmit={this.handleSubmit}
          >
            <Input
              type="text"
              label="Username"

              name="username"
              value={username}
              onChange={this.handleChange}
              required
              variant="bordered"
            />

            <Input
              type="password"
              label="Password"
              name="password"
              value={password}
              onChange={this.handleChange}
              required
              variant="bordered"
            />

            <Input
              type="email"
              name="email"
              label="Email"
              value={email}
              onChange={this.handleChange}
              required
              variant="bordered"
            />
          </form>
          <div className="max-w-xl mt-5   ">
            <Button
              variant="shadow"
              className=" w-full"
              style={{ width: "16rem" }}
              color="danger"
              type="submit"
              onClick={this.handleSubmit}
            >
             <span className="text-base font-bold">Register</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminComponent;
