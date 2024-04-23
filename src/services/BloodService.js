import axios from "axios";

const BLOOD_REG = "http://localhost:8080/blood";
const BLOOD_SEARCH = "http://localhost:8080/users/search"; 

class BloodService {
  static fetchBloodInventory() {
    return axios.get(BLOOD_REG)
      .then(response => {
        console.log("Blood inventory fetched successfully:", response.data);
        return response.data; // Return the fetched blood inventory data
      })
      .catch(error => {
        console.error("Error fetching blood inventory:", error);
        throw error; // Throw the error to be handled by the caller
      });
  }


  static searchBlood(bloodGroup, bloodQuantity) {

    const bloodDetails = {
        bloodGroup,
        bloodQuantity
    };

    console.log("Formatted blood details:", bloodDetails);
    console.log(BLOOD_SEARCH);

    // Use axios.post to send the formatted blood details as the request body
    return axios.post(BLOOD_SEARCH, bloodDetails)
      .then(response => {
        console.log("Blood search completed successfully:", response.data);
        return response.data; // Return the search results
      })
      .catch(error => {
        console.error("Error searching blood:", error);
        throw error; // Throw the error to be handled by the caller
      });
}


}

export default BloodService;