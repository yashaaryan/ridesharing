import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../images/logo1.jpeg";
import { Link } from "react-router-dom";
import { Button, Input } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import UserService from "../services/userService";
import BloodService from "../services/BloodService";

const NavBar = () => {
  return (
    <nav className="flex border-b justify-between items-center px-4 py-2">
      <div className="flex justify-center items-center ">
        <img
          src={logo}
          style={{ height: "3rem", width: "auto", objectFit: "contain" }}
          alt="Logo"
          className="h-10 w-full "
        />
      </div>
      <div className="flex flex-row items-center gap-5">
        <Link
          to="/adminLogin"
          className=" rounded-md  text-current no-underline"
        >
          Admin
        </Link>
        <Link
          to="/userLogin"
          className=" rounded-md  text-current no-underline"
        >
          User
        </Link>
        <Link
          to="/donorLogin"
          className=" rounded-md  text-current no-underline"
        >
          Donor
        </Link>
      </div>
    </nav>
  );
};

const ButtonBox = ({ buttonText, onClick }) => {
  return (
    <Button color="secondary" onClick={onClick}>
      <span className="text-base font-semibold">{buttonText}</span>
    </Button>
  );
};

const sampleData = [
  { bloodGroup: "A+", bloodQuantity: 10, donationDate: "2024-04-01" },
  { bloodGroup: "B-", bloodQuantity: 5, donationDate: "2024-03-15" },
  { bloodGroup: "O+", bloodQuantity: 15, donationDate: "2024-04-05" },
  { bloodGroup: "AB+", bloodQuantity: 8, donationDate: "2024-03-20" },
  { bloodGroup: "O-", bloodQuantity: 12, donationDate: "2024-04-10" },
  { bloodGroup: "A-", bloodQuantity: 7, donationDate: "2024-04-03" },
];

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full border-t flex flex-col items-center justify-center py-2 ">
      <span>&copy; 2024 Team SWE. All rights reserved.</span>
    </footer>
  );
};

const MainContent = () => {
  const [bloodInventory, setBloodInventory] = useState([]);
  const [donors, setDonors] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [myData, setMyData] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const {
    isOpen: isDeleteOpen,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const {
    isOpen: isUpdateOpen,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();

  const [updatedUser, setUpdatedUser] = useState({
    username: "",
    password: "",
    email: myData?.email,
  });

  const {
    isOpen: isSearchOpen,
    onOpen: onOpenSearch,
    onClose: onCloseSearch,
  } = useDisclosure();
  const [searchParams, setSearchParams] = useState({
    bloodGroup: "",
    bloodQuantity: "",
  });

  const handleSearch = () => {
    onOpenSearch();
  };

  const handleSearchChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const confirmSearch = (e) => {
    e.preventDefault();
    BloodService.searchBlood(
      searchParams.bloodGroup,
      searchParams.bloodQuantity
    )
      .then((data) => {
        setBloodInventory(data); // Set the search results in the bloodInventory state
        onCloseSearch(); // Close the search modal
      })
      .catch((error) => {
        console.error("Error searching blood:", error);
      });
  };

  useEffect(() => {
    // Get data from local storage
    const data = localStorage.getItem("userDetails");
    // Parse the data if it exists
    const parsedData = data ? JSON.parse(data) : null;
    // Set the data in state
    setMyData(parsedData);
    BloodService.fetchBloodInventory()
      .then((data) => {
        setBloodInventory(data);
      })
      .catch((error) => {
        console.error("Error fetching blood inventory:", error);
      });
  }, []);

  const handleUpdate = () => {
    setUpdatedUser({ username: myData.username, password: myData.password });
    onOpenUpdate();
  };

  useEffect(() => {
    setUpdatedUser({ username: myData?.username, password: myData?.password });
  }, [myData]);

  const handleUpdateChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const confirmUpdate = () => {
    UserService.updateUser(myData.userId, updatedUser)
      .then(() => {
        console.log("User updated successfully");
        setMyData(updatedUser); // Update the local state
        localStorage.setItem("userDetails", JSON.stringify(updatedUser)); // Update the local storage
        onCloseUpdate();
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  const fetchData = async (apiEndpoint) => {
    try {
      const response = await axios.get(apiEndpoint);
      setBloodInventory(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = () => {
    onOpenDelete();
  };
  const confirmDelete = () => {
    UserService.deleteUser(myData.userId)
      .then(() => {
        console.log("User deleted successfully");
        window.location.href = "/userLogin";
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center p-4">
      <h1>Welcome User!</h1>
      <div className="flex flex-row items-center gap-5">
        <ButtonBox buttonText="Update Profile" onClick={handleUpdate} />
        <ButtonBox buttonText="Search for Donors" onClick={handleSearch} />
        <ButtonBox buttonText="Delete Profile" onClick={handleDelete} />
      </div>
      <div className="flex flex-col items-center gap-2 ">
        <h4>Blood Inventory</h4>
        <Table aria-label="Blood Inventory Table">
          <TableHeader>
            <TableColumn>Blood Group</TableColumn>
            <TableColumn>Quantity</TableColumn>
            <TableColumn>Donation Date</TableColumn>
          </TableHeader>
          <TableBody>
            {bloodInventory.length > 0 ? (
              bloodInventory.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.bloodGroup}</TableCell>
                  <TableCell>{item.bloodQuantity}</TableCell>
                  <TableCell>{item.donationDate}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>No data available</TableCell>
                <TableCell colSpan={3}>No data available</TableCell>
                <TableCell colSpan={3}>No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {isOpen && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  All Appointments
                </ModalHeader>
                <ModalBody>
                  {donors.map((donor, index) => (
                    <p key={index}>
                      {donor.name} - {donor.bloodGroup}
                    </p>
                  ))}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}

      {isDeleteOpen && (
        <Modal isOpen={isDeleteOpen} onOpenChange={onCloseDelete}>
          <ModalContent>
            <ModalHeader>Delete Profile</ModalHeader>
            <ModalBody>Are you sure you want to delete your profile?</ModalBody>
            <ModalFooter>
              <Button color="danger" onPress={confirmDelete}>
                Yes
              </Button>
              <Button color="secondary" variant="light" onPress={onCloseDelete}>
                No
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {isUpdateOpen && (
        <Modal isOpen={isUpdateOpen} onOpenChange={onCloseUpdate}>
          <ModalContent>
            <ModalHeader>Update Profile</ModalHeader>
            <ModalBody>
              <form
                className="flex flex-col gap-4 mb-10"
                onSubmit={confirmUpdate}
              >
                <Input
                  type="text"
                  label="Username"
                  name="username"
                  value={updatedUser.username}
                  onChange={handleUpdateChange}
                  required
                  variant="bordered"
                />
                <Input
                  type="password"
                  label="Password"
                  name="password"
                  value={updatedUser.password}
                  onChange={handleUpdateChange}
                  required
                  variant="bordered"
                />
                <Button color="secondary" type="submit">
                  Submit
                </Button>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      {isSearchOpen && (
        <Modal isOpen={isSearchOpen} onOpenChange={onCloseSearch}>
          <ModalContent>
            <ModalHeader>Search for Donors</ModalHeader>
            <ModalBody className="">
              <form
                className="flex flex-col gap-4 mb-10"
                onSubmit={confirmSearch}
              >
                <Input
                  type="text"
                  label="Blood Group"
                  name="bloodGroup"
                  value={searchParams.bloodGroup}
                  onChange={handleSearchChange}
                  required
                  variant="bordered"
                />
                <Input
                  type="number"
                  label="Blood Quantity"
                  name="bloodQuantity"
                  value={searchParams.bloodQuantity}
                  onChange={handleSearchChange}
                  required
                  variant="bordered"
                />
                <Button color="secondary" type="submit">
                  Search
                </Button>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

const UserDashboard = () => {
  return (
    <div className="app">
      <NavBar />
      <MainContent />
      <Footer />
    </div>
  );
};

export default UserDashboard;
