import React, { useState } from "react";

import DonorService from "../services/DonorService";
import logo from "../images/logo1.jpeg";
import { Button, Input, Textarea } from "@nextui-org/react";

const DonorComponent = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
    email: "",
    fullName: "",
    quantity: "",
    bloodGroup: "",
    contactNumber: "",
    address: "",
    lastDonationDate: "",
    error: null,
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const donor = {
    username: state.username,
    password: state.password,
    email: state.email,
    fullName: state.fullName,
    quantity: state.quantity,
    bloodGroup: state.bloodGroup,
    contactNumber: state.contactNumber,
    address: state.address,
    lastDonationDate: state.lastDonationDate,
  };

  DonorService.registerDonor(donor)
    .then((donor) => {
      console.log("Donor registered successfully");
      window.alert("Donor registered successfully");
      localStorage.setItem("donorDetails", JSON.stringify(donor));
      window.location.href = "/donorLogin"; // Redirect to "/donorLogin" page
    })
    .catch((error) => {
      window.alert("Error! Try Again!");
      console.error("Error registering donor:", error);
    });
};

  return (
    <div className="flex flex-col justify-center p-4">
      <div className="flex justify-center items-center ">
        <img
          src={logo}
          style={{ height: "3rem", width: "auto", objectFit: "contain" }}
          alt="Logo"
          className="h-10 w-full "
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-4">
        <span className="text-2xl font-bold mt-2">Register Donor</span>

        {/* {error && <div className="error-message">Error: {error.message}</div>} */}
        <form
          className="grid grid-cols-2 gap-4 max-w-xl"
          onSubmit={handleSubmit} // Use handleSubmit function here
        >
          <Input
            type="text"
            label="Username"
            name="username"
            value={state.username}
            onChange={handleChange} // Use handleChange function here
            required
            variant="bordered"
          />

          <Input
            type="password"
            name="password"
            label="Password"
            value={state.password}
            onChange={handleChange} // Use handleChange function here
            required
            variant="bordered"
          />

          <Input
            type="email"
            name="email"
            label="Email"
            value={state.email}
            onChange={handleChange} // Use handleChange function here
            required
            variant="bordered"
          />

          <Input
            type="text"
            name="fullName"
            label="Full Name"
            value={state.fullName}
            onChange={handleChange} // Use handleChange function here
            required
            variant="bordered"
          />

          <Input
            type="number"
            name="quantity"
            label="Quantity"
            value={state.quantity}
            onChange={handleChange} // Use handleChange function here
            required
            variant="bordered"
          />

          <Input
            type="text"
            name="bloodGroup"
            label="Blood Group"
            value={state.bloodGroup}
            onChange={handleChange} // Use handleChange function here
            required
            variant="bordered"
          />

          <Input
            type="text"
            name="contactNumber"
            label="Contact Number"
            value={state.contactNumber}
            onChange={handleChange} // Use handleChange function here
            required
            variant="bordered"
          />

          <Input
            type="date"
            label="Last Donation Date"
            name="lastDonationDate"
            value={state.lastDonationDate}
            onChange={handleChange} // Use handleChange function here
            required
            variant="bordered"
          />

          <Textarea
            type="text"
            name="address"
            className="col-span-2 row-span-2"
            label="Address"
            value={state.address}
            onChange={handleChange} // Use handleChange function here
            required
            variant="bordered"
          />
        </form>
        <div className="max-w-xl   flex ">
          <Button
            variant="shadow"
            className=" w-full"
            style={{ width: "16rem" }}
            color="danger"
            type="submit"
            onClick={handleSubmit}
          >
            <span className="text-base font-bold">Register</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DonorComponent;
