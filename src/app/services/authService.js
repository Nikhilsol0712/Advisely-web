import { axiosInstance } from "../utils/assets";
import { BASE_URL } from "../utils/assets";

export const authServices = {
  registerUser: async (formData) => {
    try {
      const AxiosRequestConfig = {
        method: "post",
        url: "/signup",
        data: formData,

        headers: {
          ...axiosInstance.defaults.headers,
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await axiosInstance(AxiosRequestConfig);

      return response.data;
    } catch (error) {
      throw { message: error.message };
    }
  },

  signinUSer: async (data) => {
    try {
      const response = await axiosInstance.post(`${BASE_URL}/signin`, data);
      console.log("response from sss=====", response.data);
      return response.data;
    } catch (error) {
      throw { message: error.response.data };
    }
  },
};
