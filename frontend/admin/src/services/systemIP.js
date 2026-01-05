import axios from "axios";
import { ADMIN_STORAGE_KEYS } from "../screens/admin/admin.constant";
// import { setApiBaseUrl } from "./studentAxiosInstance";

export const systemIP = async () => {
  try {
    const host = window.location.hostname;

    const res = await axios.get(`http://${host}:8080/system/ipv4`);

    const ip = res.data;

    // store IP
    localStorage.setItem(ADMIN_STORAGE_KEYS.IPV4, ip);

    // set axios baseURL
    // setApiBaseUrl(ip);

    console.log("API initialized with IP:", ip);

    return ip; // optional, useful if caller needs it
  } catch (error) {
    console.error("Failed to init API after login", error);
    throw error;
  }
};
