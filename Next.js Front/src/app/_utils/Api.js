import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api", // رابط سترابي المحلي
});

export default axiosClient;
