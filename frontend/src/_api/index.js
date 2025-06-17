import axios from "axios";

export const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api"
});

// API Gambar
export const API_IMAGE = axios.create({
  baseURL: "http://127.0.0.1:8000/storage/"
});
