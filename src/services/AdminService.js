import axios from "axios";

const ADMIN_REG ="http://localhost:8080/api/admin/register";

class AdminService {
  static registerAdmin(admin) {
    return axios.post(ADMIN_REG, admin)
      .then(response => {
        console.log("Admin registered successfully:", response.data);
        return response.data; // Return the registered donor data
      })
      .catch(error => {
        console.error("Error registering Admin:", error);
        throw error; // Throw the error to be handled by the caller
      });
  }
}

export default AdminService;
