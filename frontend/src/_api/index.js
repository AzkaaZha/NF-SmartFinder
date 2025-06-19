import axios from "axios";

// const url = "https://nfsmartfinder.karyakreasi.id";
const url = "http://127.0.0.1:8000";

export const API = axios.create({
  baseURL: `${url}/api`,
});

export const API_IMAGE = axios.create({
  baseURL: `${url}/storage`,
});
