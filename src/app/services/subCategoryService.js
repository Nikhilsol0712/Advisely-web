import { axiosInstance } from "../utils/assets";
import { BASE_URL } from "../utils/assets";

const subCategoryServices = {
  getAllsubCategories: async () => {
    try {
      const token = localStorage.getItem("x-access-token");
      if (token) {
        axiosInstance.defaults.headers.common["x-access-token"] = token;
        const response = await axiosInstance.get(`${BASE_URL}/subCategory`);
        return response.data;
      } else {
        throw new Error("Token not available");
      }
    } catch (error) {
      throw error.response;
    }
  },
};

export default subCategoryServices;
