import axios from "axios";

const url = "https://nfsmartfinder.karyakreasi.id";

export const API = axios.create({
  baseURL: `${url}/api`,
});

export const API_IMAGE = axios.create({
  baseURL: `${url}/storage`,
});
