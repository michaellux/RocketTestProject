import axios from "axios";

const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "https://combative-stockings-clam.cyclic.app",
});

export default service;
