
import { Poppins } from "next/font/google";
import axios from "axios";
export const BASE_URL = "https://advisely-backend.onrender.com/api/v1";
export const IMAGE_SOURCE = "https://advisely-backend.onrender.com/uploads/";
export const SERVER = "https://advisely-backend.onrender.com/";

export const dynamicUI = {
  "COLOR-PRIMARY": "#977AF1",
  "COLOR-SECONDARY": "#f9b408",
  "COLOR-BLACK": "#000000",
  "COLOR-BLUE": "#004DC1",
  "COLOR-RED": "#FF4646",
  "COLOR-GREY": "#D6D1D1",
  "FONT-L": "Poppins-Light",
  "FONT-R": "Poppins-Regular",
  "FONT-M": "Poppins-Medium",
  "FONT-S": "Poppins-SemiBold",
  "FONT-B": "Poppins-Bold",
  INPUT: {
    "BORDER-GREY": "#ABA8A8",
    "BORDER-RADIUS": 20,
  },
  BUTTON: {
    "B-COLOR-WHITE": "#FFF",
    "B-BGCOLOR-PURPLE": "#8C8CFF",
    "B-BGCOLOR-YELLOWISHORANGE": "#F9B408",
    "BORDER-RADIUS": 20,
  },
  HEADER: {
    "H-BGCOLOR-PURPLE": "#8C8CFF",
    "H-COLOR-WHITE": "#FFF",
    "H-COLOR-BLACK": "#000000",
  },
};

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

