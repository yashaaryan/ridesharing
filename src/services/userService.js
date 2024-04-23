import axios from "axios";

const USER_REG = "http://localhost:8080/users/register";
const USER_LOGIN = "http://localhost:8080/users/login";
const USER_UPDATE = "http://localhost:8080/users/"; // Base URL for updating user
const USER_DELETE = "http://localhost:8080/users/"; // Base URL for deleting user

const ALL_APPOINTMENTS = "http://localhost:8080/api/appointments";

class UserService {
  static registerUser(user) {
    return axios
      .post(USER_REG, user)
      .then((response) => {
        console.log("User registered successfully:", response.data);

        return response.data; // Return the registered user data
      })
      .catch((error) => {
        console.error("Error registering user:", error);
        throw error; // Throw the error to be handled by the caller
      });
  }

  static loginUser(loginRequest) {
    return axios
      .post(USER_LOGIN, loginRequest)
      .then((response) => {
        console.log("User logged in successfully:", response.data);
        return response;
      })
      .catch((error) => {
        console.error("Error logging in user:", error);
        throw error; // Throw the error to be handled by the caller
      });
  }

  static updateUser(id, updatedUser) {
    return axios
      .put(USER_UPDATE + id, updatedUser)
      .then((response) => {
        console.log("User updated successfully:", response.data);
        return response.data; // Return the updated user data
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        throw error; // Throw the error to be handled by the caller
      });
  }

  static deleteUser(id) {
    console.log("id",id);
    return axios
      .delete(USER_DELETE + id)
      .then((response) => {
        console.log("User deleted successfully:", response.data);
        return response.data; // Return the delete response data
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        throw error; // Throw the error to be handled by the caller
      });
  }
}

export default UserService;
