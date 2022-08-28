import axios from "axios";

const API_URL = "https://vish-mern-chat-app.herokuapp.com/api/room/";

// create
const create = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  if (response.data) {
    localStorage.setItem("vish-chat-app-rooms", JSON.stringify(response.data));
  }
  return response.data;
};
// join
const join = async (roomData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "join", roomData, config);
  if (response.data) {
    localStorage.setItem("vish-chat-app-rooms", JSON.stringify(response.data));
  }
  return response.data;
};
// leave
const leave = async (roomData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "leave", roomData, config);
  if (response.data) {
    localStorage.removeItem("vish-chat-app-rooms");
  }
  return response.data;
};

// get users
const getUsers = async (roomData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + `users/${roomData}`, config);
  return response.data;
};
const roomService = {
  create,
  join,
  leave,
  getUsers,
};

export default roomService;
