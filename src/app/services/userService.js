import { axiosInstance } from "../utils/assets";
import axios from "axios";
import { BASE_URL } from "../utils/assets";

const userServices = {
  findSmeBySubCatID: async (subCatId) => {
    try {
      const token = localStorage.getItem("x-access-token");
      if (token) {
        axiosInstance.defaults.headers.common["x-access-token"] = token;
        const response = await axiosInstance.get(
          `${BASE_URL}/users/findMatchingSme/${subCatId}`
        );
        return response.data;
      } else {
        throw new Error("Token not available");
      }
    } catch (error) {
      throw error.response;
    }
  },

  findAllSme: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/findAllSme`);
      return response.data;
    } catch (error) {
      throw error.response;
    }
  },

  getUserById: async (userID) => {
    try {
      const token = localStorage.getItem("x-access-token");
      if (token) {
        axiosInstance.defaults.headers.common["x-access-token"] = token;
        const response = await axiosInstance.get(`${BASE_URL}/user/${userID}`);
        return response.data;
      } else {
        throw new Error("Token not available");
      }
    } catch (error) {
      throw error.response;
    }
  },
};

export default userServices;
