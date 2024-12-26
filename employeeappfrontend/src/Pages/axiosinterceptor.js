import axios from "axios";
const axiosInstance=axios.create({
// baseURL:'http://localhost:3000'
baseURL:'https://employeemanagement-server.vercel.app'
})
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Adjust token retrieval logic as necessary
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

return config;}
,(error)=>{
    return Promise.reject(error)
}
)
export default axiosInstance