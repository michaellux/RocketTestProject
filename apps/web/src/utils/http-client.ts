import axios from "axios";

const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:7000",
});

export default service;
