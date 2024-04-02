import { axiosInstance } from "../utils/assets";
import { BASE_URL } from "../utils/assets";

const messageServices = {
  getAllMessageByChatId: async (chatId) => {
    try {
      const token = localStorage.getItem("x-access-token");
      if (token) {
        axiosInstance.defaults.headers.common["x-access-token"] = token;
        const response = await axiosInstance.get(
          `${BASE_URL}/message/getMessageByChatId/${chatId}`
        );
        return response.data;
      } else {
        throw new Error("Token not available");
      }
    } catch (error) {
      throw error.response;
    }
  },
};

export default messageServices;
