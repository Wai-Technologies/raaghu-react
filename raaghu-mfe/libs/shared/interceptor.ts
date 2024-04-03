import axios from "axios";
import { request } from "../proxy/core/request";

const instance = axios.create({
    baseURL: localStorage.getItem("REACT_APP_API_URL") || "https://raaghureactapi.azurewebsites.net",
});

instance.interceptors.request.use((config: any) => {
    const token = localStorage.getItem("accessToken");
    const tenant = localStorage.getItem("__tenant");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    else if (tenant) {
        config.headers.Authorization = `__tenant  ${tenant} `;
    }
    return config;
});

export default instance;
