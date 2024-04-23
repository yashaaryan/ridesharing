import React from "react";
import userService from "../services/userService";

import logo from "../images/logo1.jpeg";
import { Image, Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // Import the v4 function from the uuid package

class UserComponent extends React.Component {
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

    // Create user object
    const user = {
      username: username,
      password: password,
      email: email,
    };

    // Send POST request to register user
    userService
      .registerUser(user)
      .then((data) => {
        console.log("User registered successfully", data);
        localStorage.setItem("userDetails", JSON.stringify(data));
        // Optionally, you can redirect or show a success message here
        window.alert("User registered successfully");
        window.location.href = "/userLogin";
      })
      .catch((error) => {
        this.setState({ error: error });
        console.error("Error registering user:", error);
      });
  };

  render() {
    const { username, password, email, error } = this.state;

    return (
      <div
        style={{ justifyContent: "space-around" }}
        className=" flex p-5  flex-row gap-5 items-center w-full   "
      >
        <div
          style={{ borderRadius: "0.5rem", width: "33.33%" }}
          className="flex border rounded-lg w-1/3 flex-col gap-4   p-5 "
        >
          <img
            src={logo}
            alt="Logo"
            style={{ height: "3rem", width: "auto", objectFit: "contain" }}
          />
          <h3 className="text-center inter-bold ">Register User</h3>

          {error && <div className="error-message">Error: {error.message}</div>}
          <form className="flex flex-col gap-4" onSubmit={this.handleSubmit}>
            <Input
              variant="bordered"
              type="text"
              label="Username"
              name="username"
              value={username}
              onChange={this.handleChange}
              required
            />

            <Input
              type="email"
              name="email"
              variant="bordered"
              value={email}
              label="Email"
              onChange={this.handleChange}
              required
            />
            <Input
              type="password"
              variant="bordered"
              name="password"
              label="Password"
              value={password}
              onChange={this.handleChange}
              required
            />
            <div className="flex flex-row items-center gap-2 text-xs text-zinc-500 col-span-1">
              <span> Already Registered? </span>
              <Link
                className="text-red-700  font-semibold text-current "
                to={"/userLogin"}
              >
                <span> Login</span>
              </Link>
            </div>

            <Button color="danger" variant="shadow" type="submit">
              <span style={{ fontWeight: "bold" }}> Register</span>
            </Button>
          </form>
        </div>

        <div
          style={{ gap: "2rem", width: "33.33%" }}
          className="flex flex-col items-center justify-center  "
        >
          <h2 className="inter-bold  ">Donate Blood, Save Life</h2>
          <img
            src="/user-comp/main-bg.svg"
            alt="Logo"
            style={{ height: "100%", width: "100%", objectFit: "contain" }}
          />
        </div>
      </div>
    );
  }
}

export default UserComponent;
