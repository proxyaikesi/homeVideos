import axios from "axios";

const API_URL = "http://localhost:3000";

export const loginApi = (username, password, type) => {
  return axios.post(`${API_URL}/login`, { username, password, type });
};

export const verifyToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return Promise.reject("No token available");
  }
  return axios.post(`${API_URL}/verifyToken`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
