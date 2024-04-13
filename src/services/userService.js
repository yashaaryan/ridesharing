import axios from "axios";

const USER_REG = "http://localhost:8080/users/register";

class UserService {
  static registerUser(user) {
    return axios.post(USER_REG, user)
      .then(response => {
        console.log("User registered successfully:", response.data);
        return response.data; // Return the registered user data
      })
      .catch(error => {
        console.error("Error registering user:", error);
        throw error; // Throw the error to be handled by the caller
      });
  }
}

export default UserService;
