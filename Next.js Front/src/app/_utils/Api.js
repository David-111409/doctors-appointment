import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api", // رابط سترابي المحلي
});

const getCategoryList = () => axiosClient.get("/categories?populate=*");

const getAllDoctors = () => axiosClient.get("/doctors?populate=*");

const getDoctorByCategory = (categoryName) =>
  axiosClient.get(`/doctors?filters[category][name][$eq]=${categoryName}&populate=*`);

const getDoctorById = (id) => axiosClient.get(`/doctors/${id}?populate=*`);

const getTop5Doctors = () => axiosClient.get("/doctors?populate=*&pagination[limit]=6");

const createAppointment = (data) => axiosClient.post("/appointments", data);

// جلب كافة المواعيد المرتبطة بإيميل معين
const getUserAppointments = (userEmail) =>
  axiosClient.get(`/appointments?filters[email][$eq]=${userEmail}&populate=doctor`);

// الحذف يعتمد على الـ documentId في Strapi 5 أو الـ id في النسخ الأقدم
const deleteBooking = (id) => axiosClient.delete("/appointments/" + id);

const Api = {
  getCategoryList,
  getAllDoctors,
  getDoctorByCategory,
  getDoctorById,
  getTop5Doctors,
  createAppointment,
  getUserAppointments,
  deleteBooking,
};

export default Api;
