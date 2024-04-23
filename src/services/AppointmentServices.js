import axios from "axios";

const APPOINTMENTS_GET_ALL = "http://localhost:8080/api/appointments";
const APPOINTMENT_GET_BY_DONOR = "http://localhost:8080/api/appointments/";
const APPOINTMENT_DELETE = "http://localhost:8080/api/appointments/";

const APPOINTMENT_BOOK = "http://localhost:8080/api/appointments/book";

class AppointmentService {
    static getAllAppointments() {
        return axios
            .get(APPOINTMENTS_GET_ALL)
            .then((response) => {
                console.log(
                    "Appointments retrieved successfully:",
                    response.data
                );
                return response.data; // Return the appointments data
            })
            .catch((error) => {
                console.error("Error retrieving appointments:", error);
                throw error; // Throw the error to be handled by the caller
            });
    }

    static getAppointmentByDonorId(id) {
        return axios
            .get(APPOINTMENT_GET_BY_DONOR + id)
            .then((response) => {
                console.log(
                    "Appointment retrieved successfully:",
                    response.data
                );
                return response.data; // Return the appointment data
            })
            .catch((error) => {
                console.error("Error retrieving appointment:", error);
                throw error; // Throw the error to be handled by the caller
            });
    }

    static deleteAppointment(id) {
        return axios
            .delete(APPOINTMENT_DELETE + id)
            .then((response) => {
                console.log("Appointment deleted successfully:", response.data);
                return response.data; 
            })
            .catch((error) => {
                console.error("Error deleting appointment:", error);
                throw error;
            });
    }

    static bookAppointment(appointmentDetails) {
        return axios
            .post(APPOINTMENT_BOOK, appointmentDetails)
            .then((response) => {
                console.log("Appointment booked successfully:", response.data);
                return response.data; // Return the booked appointment data
            })
            .catch((error) => {
                console.error("Error booking appointment:", error);
                throw error; // Throw the error to be handled by the caller
            });
    }
}

export default AppointmentService;
