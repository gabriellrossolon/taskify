import axios from "axios";

const api = axios.create({
  baseURL: "https://taskifybackend-chbdh8dwghbegfhy.brazilsouth-01.azurewebsites.net"
});

export default api;