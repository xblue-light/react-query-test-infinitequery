import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://dummyapi.io",
  headers: {
    "content-type": "application/json",
  },
});

export default axiosClient;
