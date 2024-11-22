import axios from "axios";

const api = import.meta.env.VITE_API_URL;
console.log("the api is done", api);

const axiosInstance = axios.create({
  baseURL: api,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
