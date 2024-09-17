import axios from "axios";

export const URI = "http://127.0.0.1:8000/api/v1"; // Local URI

export const appConfig = axios.create({
    baseURL: URI
})

export const appAuthConfig = axios.create({
    baseURL: URI
})

appAuthConfig.interceptors.request.use(function (config) {
    const data = localStorage.getItem("auth-storage");

    const jsonRespone = JSON.parse(data);

    const accessToken = jsonRespone.state.accessToken;

    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
});
