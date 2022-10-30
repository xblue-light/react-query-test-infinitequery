import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://dummyapi.io",
  headers: {
    "content-type": "application/json",
  },
});

export const rickAndMortyAxiosClient = axios.create({
  baseURL: "https://rickandmortyapi.com/api/",
  headers: {
    "content-type": "application/json",
  },
});

export default axiosClient;
