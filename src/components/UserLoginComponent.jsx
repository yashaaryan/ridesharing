import React, { useState } from "react";
import axios from "axios";
import logo from "../images/logo1.jpeg";
import { Button, Input } from "@nextui-org/react";
import { Link } from "react-router-dom";
import UserService from "../services/userService";
const UserLoginComponent = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await UserService.loginUser(credentials);  
    localStorage.setItem("userDetails", JSON.stringify(response.data));
      window.alert("User Login successfully");

      setError(""); 

      window.location.href = "/userDashboard";
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle unauthorized access
        setError("Invalid username or password");
      } else {
        // Handle other errors
        setError("An error occurred. Please try again later.");
      }
    }
  };

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
        <span className="text-2xl font-bold mt-5">User Login</span>
        {error && <div className="error-message">Error: {error}</div>}
        <form
          className="flex flex-col mt-4  w-[24rem]  gap-4"
          onSubmit={handleSubmit}
        >
          <Input
            type="text"
            name="username"
            label="Username"
            variant="bordered"
            value={credentials.username}
            onChange={handleChange}
            required
          />

          <Input
            type="password"
            name="password"
            label="Password"
            variant="bordered"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <div className="flex flex-row items-center gap-2 text-xs text-zinc-500 col-span-1">
            <span>Don't have an account? </span>
            <Link
              className="text-red-700  font-semibold text-current "
              to={"/"}
            >
              <span>Register</span>
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <Button
              variant="shadow"
              className=" w-full"
              style={{ width: "16rem" }}
              color="danger"
              type="submit"
            >
              <span className="text-base font-bold">Login</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLoginComponent;
