import axios from "axios";

//định nghĩa lại đường dẫn url tránh sửa nhiều lần khi deploy
const api = axios.create({
  baseURL: "http://localhost:8081/api",
});

export default api;
