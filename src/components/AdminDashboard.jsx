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
import BloodService from "../services/BloodService";
import AppointmentService from "../services/AppointmentServices";
import DonorService from "../services/DonorService";

const MainContent = () => {
    const [bloodInventory, setBloodInventory] = useState([]);
    const [donors, setDonors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [displayType, setDisplayType] = useState("bloodInventory");

    const [inputValue, setInputValue] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [appointmentIdToDelete, setAppointmentIdToDelete] = useState("");

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        if (displayType === "appointments") {
            AppointmentService.getAllAppointments()
                .then((data) => {
                    setAppointments(data);
                })
                .catch((error) => {
                    console.error("Error fetching appointments:", error);
                });
        } else {
            BloodService.fetchBloodInventory()
                .then((data) => {
                    setBloodInventory(data);
                })
                .catch((error) => {
                    console.error("Error fetching blood inventory:", error);
                });
        }
    }, [displayType]);

    const handleSubmit = () => {
        AppointmentService.getAppointmentByDonorId(inputValue)
            .then((data) => {
                console.log("donorAppointments", data);
                setAppointments(data);
                setDisplayType("donorAppointments");
            })
            .catch((error) => {
                console.error("Error fetching appointments:", error);
            });

        setIsModalOpen(false);
    };

    const handleDeleteAppointment = () => {
        AppointmentService.deleteAppointment(appointmentIdToDelete)
            .then((data) => {
                console.log("Appointment deleted successfully:", data);
                // Filter out the deleted appointment
                const updatedAppointments = appointments.filter(
                    (appointment) =>
                        appointment.appointmentId !== appointmentIdToDelete
                );
                setAppointments(updatedAppointments);
            })
            .catch((error) => {
                console.error("Error deleting appointment:", error);
            });

        setIsDeleteModalOpen(false);
    };

    const handleViewDonors = () => {
        DonorService.getAllDonors()
            .then((data) => {
                console.log("Donors retrieved successfully:", data);
                setDonors(data);
                setDisplayType("donors");
            })
            .catch((error) => {
                console.error("Error retrieving donors:", error);
            });
    };

    return (
        <div className="flex flex-col gap-4  items-center p-4 min-h-screen">
            <h2>Welcome Admin!</h2>
            <div className="flex flex-row items-center gap-5">
                <ButtonBox
                    buttonText="View Donors"
                    onClick={handleViewDonors}
                />
                <ButtonBox
                    buttonText="Donor Appointments"
                    onClick={() => setIsModalOpen(true)}
                />
                <ButtonBox
                    buttonText="View Appointments"
                    onClick={() => setDisplayType("appointments")}
                />
                <ButtonBox
                    buttonText="Cancel Appointments"
                    onClick={() => setIsDeleteModalOpen(true)}
                />
            </div>
            <div className="flex flex-col items-center gap-2 ">
                {displayType === "bloodInventory" ? (
                    <div className="flex flex-col items-center gap-2 ">
                        <h4>Blood Inventory</h4>
                        <Table aria-label="Blood Inventory Table">
                            <TableHeader>
                                <TableColumn>Blood ID</TableColumn>
                                <TableColumn>Blood Group</TableColumn>
                                <TableColumn>Quantity</TableColumn>
                                <TableColumn>Donation Date</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {bloodInventory.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.bloodId}</TableCell>
                                        <TableCell>{item.bloodGroup}</TableCell>
                                        <TableCell>
                                            {item.bloodQuantity}
                                        </TableCell>
                                        <TableCell>
                                            {item.donationDate}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : displayType === "appointments" ? (
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
                ) : displayType === "donors" ? (
                    <div className="flex flex-col items-center gap-2 ">
                        <h4>Donors</h4>
                        <Table aria-label="Donors Table">
                            <TableHeader>
                                <TableColumn>Username</TableColumn>
                                <TableColumn>Email</TableColumn>
                                <TableColumn>Full Name</TableColumn>
                                <TableColumn>Quantity</TableColumn>
                                <TableColumn>Blood Group</TableColumn>
                                <TableColumn>Contact Number</TableColumn>
                                <TableColumn>Address</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {donors.map((donor, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{donor.username}</TableCell>
                                        <TableCell>{donor.email}</TableCell>
                                        <TableCell>{donor.fullName}</TableCell>
                                        <TableCell>{donor.quantity}</TableCell>
                                        <TableCell>
                                            {donor.bloodGroup}
                                        </TableCell>
                                        <TableCell>
                                            {donor.contactNumber}
                                        </TableCell>
                                        <TableCell>{donor.address}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : null}
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

            <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
                <ModalContent>
                    <ModalHeader>Enter Donor ID</ModalHeader>
                    <ModalBody>
                        <Input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onPress={handleSubmit}>
                            Submit
                        </Button>
                        <Button
                            color="danger"
                            variant="light"
                            onPress={() => setIsModalOpen(false)}
                        >
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal
                isOpen={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
            >
                <ModalContent>
                    <ModalHeader>Enter Appointment ID to Cancel</ModalHeader>
                    <ModalBody>
                        <Input
                            type="text"
                            value={appointmentIdToDelete}
                            onChange={(e) =>
                                setAppointmentIdToDelete(e.target.value)
                            }
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="secondary"
                            onPress={handleDeleteAppointment}
                        >
                            Submit
                        </Button>
                        <Button
                            color="danger"
                            variant="light"
                            onPress={() => setIsDeleteModalOpen(false)}
                        >
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

const AdminDashboard = () => {
    return (
        <div className="flex flex-col relative">
            <NavBar />
            <MainContent />
            <Footer />
        </div>
    );
};

export default AdminDashboard;
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
        <footer className="  h-20 w-full border-t flex flex-col items-center justify-center  ">
            <span>&copy; 2024 Team SWE. All rights reserved.</span>
        </footer>
    );
};
