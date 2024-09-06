import axios from "axios";
import { useAuthStore } from "../stores/auth";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
});

axiosClient.interceptors.request.use((config) => {
  const authStore = useAuthStore();

  config.headers.Authorization = `Bearer ${authStore.user.token}`;
  return config;
});

export default axiosClient;
