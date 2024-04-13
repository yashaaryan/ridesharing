import axios from "axios";

const DONOR_REG = "http://localhost:8080/api/donors/register";

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
}

export default DonorService;
