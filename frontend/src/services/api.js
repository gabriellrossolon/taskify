import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5260"  // só o host e porta, sem https e sem /task
});

export default api;