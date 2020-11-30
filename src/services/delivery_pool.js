import axios from "axios";

const baseUrl = "http://localhost:5000/api/v1";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
});

const delivery_pool_API = {
  location: () => {
    return axiosInstance.post("/location");
  },
};

export default delivery_pool_API;
