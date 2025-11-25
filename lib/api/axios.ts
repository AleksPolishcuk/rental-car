import axios from "axios";

export const nextServer = axios.create({
  baseURL: process.env.NEXT_PABLIC_API_URL,
  timeout: 10000,
});
