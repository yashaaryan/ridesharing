import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../images/logo1.jpeg";
import { Link } from "react-router-dom";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Modal,
    useDisclosure,
    ModalContent,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Input,
} from "@nextui-org/react";
import DonorService from "../services/DonorService";
import AppointmentService from "../services/AppointmentServices";

const NavBar = () => {
    return (
        <nav className="flex border-b justify-between items-center px-4 py-2">
            <div className="flex justify-center items-center ">
                <img
                    src={logo}
                    style={{
                        height: "3rem",
                        width: "auto",
                        objectFit: "contain",
                    }}
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
            <span className="text-xs font-semibold">{buttonText}</span>
        </Button>
    );
};

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
    const [displayType, setDisplayType] = useState("appointments");
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [myData, setMyData] = useState(null);
    const [appointments, setAppointments] = useState([]); // [{}
    const [updatedDonor, setUpdatedDonor] = useState({
        username: "",
        password: "",
        email: myData?.email,
    });

    const [appointmentDetails, setAppointmentDetails] = useState({
        donorId: myData?.donorId,
        appointmentDate: "",
        appointmentTime: "",
    });

    const [isBookModalOpen, setIsBookModalOpen] = useState(false);
    const {
        isOpen: isUpdateOpen,
        onOpen: onOpenUpdate,
        onClose: onCloseUpdate,
    } = useDisclosure();

    const {
        isOpen: isDeleteOpen,
        onOpen: onOpenDelete,
        onClose: onCloseDelete,
    } = useDisclosure();

    const handleUpdate = () => {
        setUpdatedDonor({
            username: myData.username,
            password: myData.password,
        });
        onOpenUpdate();
    };

    const handleBookAppointment = () => {
        AppointmentService.bookAppointment(appointmentDetails)
            .then((data) => {
                console.log("Appointment booked successfully:", data);
                alert("Appointment booked successfully!");
                // Refresh the appointments
            })
            .catch((error) => {
                console.error("Error booking appointment:", error);
            });

        setIsBookModalOpen(false);
    };
    useEffect(() => {
        // Get data from local storage
        const data = localStorage.getItem("donorDetails");
        // Parse the data if it exists
        const parsedData = data ? JSON.parse(data) : null;
        // Set the data in state
        setMyData(parsedData);
    }, []);

    const handleUpdateChange = (e) => {
        setUpdatedDonor({ ...updatedDonor, [e.target.name]: e.target.value });
    };

    const confirmUpdate = () => {
        const updatedData = {
            ...myData, // Spread the data from local storage
            ...updatedDonor, // Spread the updated data
        };

        DonorService.updateDonor(myData.donorId, updatedData)
            .then(() => {
                console.log("Donor updated successfully");
                setMyData(updatedData); // Update the local state
                localStorage.setItem(
                    "donorDetails",
                    JSON.stringify(updatedData)
                ); // Update the local storage
                onCloseUpdate();
            })
            .catch((error) => {
                console.error("Error updating donor:", error);
            });
    };

    const handleDelete = () => {
        onOpenDelete();
    };

    const confirmDelete = () => {
        DonorService.deleteDonor(myData.donorId)
            .then(() => {
                console.log("Donor deleted successfully");
                window.location.href = "/donorLogin";
            })
            .catch((error) => {
                console.error("Error deleting donor:", error);
            });
    };

    useEffect(() => {
        DonorService.getAllAppointments()
            .then((data) => {
                if (data.length === 0) {
                    console.log("No appointments found");
                } else {
                    setAppointments(data);
                }
            })
            .catch((error) => {
                console.error("Error retrieving appointments:", error);
            });
    }, []);

    const handleViewAppointments = () => {
        AppointmentService.getAppointmentByDonorId(myData.donorId)
            .then((data) => {
                console.log("Appointments retrieved successfully:", data);
                setAppointments(data);
            })
            .catch((error) => {
                console.error("Error retrieving appointments:", error);
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

    return (
        <div className="flex flex-col gap-4 justify-center items-center p-4">
            <h2>Welcome!</h2>
            <div className="flex flex-row items-center gap-5">
                <ButtonBox buttonText="Update Profile" onClick={handleUpdate} />
                <ButtonBox
                    buttonText="Make Appointments"
                    onClick={() => {
                        setIsBookModalOpen(true);
                        setAppointmentDetails((prevDetails) => ({
                            ...prevDetails,
                            donorId: myData.donorId,
                        }));
                    }}
                />
                <ButtonBox
                    buttonText="View Appointments"
                    onClick={() => {
                        setDisplayType("donorAppointments");
                        handleViewAppointments();
                    }}
                />
                <ButtonBox buttonText="Delete profile" onClick={handleDelete} />
            </div>
            <div className="flex flex-col items-center gap-2 ">
                <div className="flex flex-col items-center gap-2 ">
                    {displayType === "appointments" ? (
                        <div className="flex flex-col items-center gap-2 ">
                            <h4>Appointments</h4>
                            <Table aria-label="Appointments Table">
                                <TableHeader>
                                    <TableColumn>Appointment ID</TableColumn>
                                    <TableColumn>Donor ID</TableColumn>
                                    <TableColumn>Appointment Date</TableColumn>
                                    <TableColumn>Appointment Time</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {appointments.map((appointment, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {appointment.appointmentId}
                                            </TableCell>
                                            <TableCell>
                                                {appointment.donorId}
                                            </TableCell>
                                            <TableCell>
                                                {appointment.appointmentDate}
                                            </TableCell>
                                            <TableCell>
                                                {appointment.appointmentTime}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : displayType === "donorAppointments" ? (
                        <div className="flex flex-col items-center gap-2 ">
                            <h4>Donor Appointments</h4>
                            <Table aria-label="Donor Appointments Table">
                                <TableHeader>
                                    <TableColumn>Appointment ID</TableColumn>
                                    <TableColumn>Donor ID</TableColumn>
                                    <TableColumn>Appointment Date</TableColumn>
                                    <TableColumn>Appointment Time</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {appointments.map((appointment, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {appointment.appointmentId}
                                            </TableCell>
                                            <TableCell>
                                                {appointment.donorId}
                                            </TableCell>
                                            <TableCell>
                                                {appointment.appointmentDate}
                                            </TableCell>
                                            <TableCell>
                                                {appointment.appointmentTime}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : null}
                </div>
            </div>
            {isOpen && (
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    All Donors
                                </ModalHeader>
                                <ModalBody>
                                    {donors.map((donor, index) => (
                                        <p key={index}>
                                            {donor.name} - {donor.bloodGroup}
                                        </p>
                                    ))}
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        color="danger"
                                        variant="light"
                                        onPress={onClose}
                                    >
                                        Close
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            )}

            {isUpdateOpen && (
                <Modal isOpen={isUpdateOpen} onOpenChange={onCloseUpdate}>
                    <ModalContent>
                        <ModalHeader>Update Profile</ModalHeader>
                        <ModalBody>
                            <form
                                className="flex flex-col gap-4"
                                onSubmit={confirmUpdate}
                            >
                                <Input
                                    type="text"
                                    label="Username"
                                    name="username"
                                    value={updatedDonor.username}
                                    onChange={handleUpdateChange}
                                    required
                                />
                                <Input
                                    type="password"
                                    label="Password"
                                    name="password"
                                    value={updatedDonor.password}
                                    onChange={handleUpdateChange}
                                    required
                                />
                                <Button color="secondary" type="submit">
                                    Submit
                                </Button>
                            </form>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}

            {isDeleteOpen && (
                <Modal isOpen={isDeleteOpen} onOpenChange={onCloseDelete}>
                    <ModalContent>
                        <ModalHeader>Delete Profile</ModalHeader>
                        <ModalBody>
                            Are you sure you want to delete your profile?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onPress={confirmDelete}>
                                Yes
                            </Button>
                            <Button
                                color="secondary"
                                variant="light"
                                onPress={onCloseDelete}
                            >
                                No
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}

            <Modal isOpen={isBookModalOpen} onOpenChange={setIsBookModalOpen}>
                <ModalContent>
                    <ModalHeader>Enter Appointment Details</ModalHeader>
                    <ModalBody>
                        <Input
                            type="date"
                            value={appointmentDetails.appointmentDate}
                            onChange={(e) =>
                                setAppointmentDetails({
                                    ...appointmentDetails,
                                    appointmentDate: e.target.value,
                                })
                            }
                        />
                        <Input
                            type="time"
                            value={appointmentDetails.appointmentTime}
                            onChange={(e) =>
                                setAppointmentDetails({
                                    ...appointmentDetails,
                                    appointmentTime: e.target.value,
                                })
                            }
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="secondary"
                            onPress={handleBookAppointment}
                        >
                            Submit
                        </Button>
                        <Button
                            color="danger"
                            variant="light"
                            onPress={() => setIsBookModalOpen(false)}
                        >
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

const DonorDashboard = () => {
    return (
        <div className="flex flex-col relative">
            <NavBar />
            <MainContent />
            <Footer />
        </div>
    );
};

export default DonorDashboard;
