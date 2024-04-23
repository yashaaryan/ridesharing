import React, { useState } from "react";
import axios from "axios";
import logo from "../images/logo1.jpeg";
import { Button, Input } from "@nextui-org/react";
import DonorService from "../services/DonorService";

const DonorLoginComponent = () => {
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

  // Handle form submission
  const handleSubmit = (e) => {
  e.preventDefault();

  DonorService.loginDonor(credentials)
    .then((donor) => {
      console.log("Donor logged in successfully");
      window.alert("Donor Login successfully");
      localStorage.setItem("donorDetails", JSON.stringify(donor));
      window.location.href = "/donorDashboard"; // Redirect to "/donorDashboard" page
      setError(""); // Clear any previous errors
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        // Handle unauthorized access
        setError("Invalid username or password");
      } else {
        // Handle other errors
        setError("An error occurred. Please try again later.");
      }
    });
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
        <span className="text-2xl font-bold mt-5">Donor Login</span>
        {error && <div className="error-message">Error: {error}</div>}
        <form
          className="flex flex-col mt-4  w-[24rem]  gap-4"
          onSubmit={handleSubmit}
        >
          <Input
            type="text"
            name="username"
            variant="bordered"
            label="Username"
            value={credentials.username}
            onChange={handleChange}
            required
          />

          <Input
            type="password"
            name="password"
            variant="bordered"
            label="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />

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

export default DonorLoginComponent;
