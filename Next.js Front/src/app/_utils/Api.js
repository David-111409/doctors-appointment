import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api", // رابط سترابي المحلي
});

const getCategoryList = () => axiosClient.get("/categories?populate=*");

const getAllDoctors = () => axiosClient.get("/doctors?populate=*");

const getDoctorByCategory = (categoryName) =>
  axiosClient.get(`/doctors?filters[category][name][$eq]=${categoryName}&populate=*`);

const Api = {
  getCategoryList,
  getAllDoctors,
  getDoctorByCategory,
};

export default Api;
