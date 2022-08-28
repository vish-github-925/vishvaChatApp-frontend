import axios from "axios";
const API_URL = "https://vish-mern-chat-app.herokuapp.com/api/users/";

// register user
const registerUser = async (userData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem("vish-chat-app-user", JSON.stringify(response.data));
  }
  return response.data;
};

// login user
const loginUser = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data) {
    localStorage.setItem("vish-chat-app-user", JSON.stringify(response.data));
  }
  return response.data;
};

// logout user
const logoutUser = async () => {
  localStorage.removeItem("vish-chat-app-user");
};

const authService = {
  registerUser,
  loginUser,
  logoutUser,
};
export default authService;
