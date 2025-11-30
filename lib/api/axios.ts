import axios from "axios";

export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

nextServer.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Server request failed:", error);
    return Promise.reject(error);
  }
);
