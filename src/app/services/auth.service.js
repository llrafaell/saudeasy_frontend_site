import axios from "axios";
import environment from "../environments/environment";

const API_URL = environment.apiUrl;

const register = (username, email, password) => {
  return axios.post(API_URL + "auth/signup", {
    username,
    email,
    password,
  });
};

const login = (email, password) => {

  return axios
    .post(API_URL + "auth/signin", {}, 
    {
      auth: { 
         username: email, 
         password: password 
      }

    })
    .then((response) => {
      
      if (response.data.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }

      return response.data.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const isLogin = () => {
  if (localStorage.getItem("user")) {
      return true;
  }
  return false;
}

export default {
  register,
  login,
  logout,
  getCurrentUser,
  isLogin,
};