import axios from "axios";

export const apiServer = axios.create({
  baseURL: "https://notehub-api.goit.study",
  withCredentials: true,
});