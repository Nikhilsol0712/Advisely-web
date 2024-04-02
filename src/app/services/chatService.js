import { axiosInstance } from "../utils/assets";
import { BASE_URL } from "../utils/assets";
// Define the API service
const chatServices = {
  getAllMyChats: async () => {
    try {
      const token = localStorage.getItem("x-access-token");
      if (token) {
        axiosInstance.defaults.headers.common["x-access-token"] = token;
        const response = await axiosInstance.get(
          `${BASE_URL}/chat/getAllMyChats`
        );
        return response.data;
      } else {
        throw new Error("Token not available");
      }
    } catch (error) {
      throw error.response;
    }
  },

  createNewChat: async (data) => {
    try {
      const token = localStorage.getItem("x-access-token");
      if (token) {
        axiosInstance.defaults.headers.common["x-access-token"] = token;
        const response = await axiosInstance.post(`${BASE_URL}/chat`, data);
        return response.data;
      } else {
        throw new Error("Token not available");
      }
    } catch (error) {
      throw error.response;
    }
  },
};

export default chatServices;
