import axios from "axios";

const DONOR_REG = "http://localhost:8080/api/donors/register";
const DONOR_LOGIN = "http://localhost:8080/api/donors/login";
const DONOR_UPDATE = "http://localhost:8080/api/donors/"; 

const DONOR_DELETE = "http://localhost:8080/api/donors/"; 

const APPOINTMENTS_GET_ALL = "http://localhost:8080/api/appointments"; // URL for getting all appointments

const DONORS_GET_ALL = "http://localhost:8080/api/donors"; // URL for getting all donors


class DonorService {
  static registerDonor(donor) {
    return axios.post(DONOR_REG, donor)
      .then(response => {
        console.log("Donor registered successfully:", response.data);
        return response.data; // Return the registered donor data
      })
      .catch(error => {
        console.error("Error registering donor:", error);
        throw error; // Throw the error to be handled by the caller
      });
  }

  static loginDonor(loginRequest) {
    return axios.post(DONOR_LOGIN, loginRequest)
      .then(response => {
        console.log("Donor logged in successfully:", response.data);
        return response.data; // Return the login response data
      })
      .catch(error => {
        console.error("Error logging in donor:", error);
        throw error; // Throw the error to be handled by the caller
      });
  }

  static updateDonor(id, updatedDonor) {
    return axios.put(DONOR_UPDATE + id, updatedDonor)
      .then(response => {
        console.log("Donor updated successfully:", response.data);
        return response.data; // Return the updated donor data
      })
      .catch(error => {
        console.error("Error updating donor:", error);
        throw error; // Throw the error to be handled by the caller
      });
  }

  static deleteDonor(id) {
    return axios.delete(DONOR_DELETE + id)
      .then(response => {
        console.log("Donor deleted successfully:", response.data);
        return response.data; // Return the deleted donor data
      })
      .catch(error => {
        console.error("Error deleting donor:", error);
        throw error; // Throw the error to be handled by the caller
      });
  }

  static getAllAppointments() {
    return axios.get(APPOINTMENTS_GET_ALL)
      .then(response => {
        console.log("Appointments retrieved successfully:", response.data);
        return response.data; // Return the appointments data
      })
      .catch(error => {
        console.error("Error retrieving appointments:", error);
        throw error; // Throw the error to be handled by the caller
      });
  }

  static getAllDonors() {
    return axios.get(DONORS_GET_ALL)
      .then(response => {
        console.log("Donors retrieved successfully:", response.data);
        return response.data; // Return the donors data
      })
      .catch(error => {
        console.error("Error retrieving donors:", error);
        throw error; // Throw the error to be handled by the caller
      });
  }
}

export default DonorService;