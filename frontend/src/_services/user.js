import { API } from "../_api";

export const getUserReports = async () => {
  return API.get("/user/reports", {
    headers: 
    { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  }).then(res => res.data);
};

export const getUserClaims = async () => {
  return API.get("/user/claims", {
    headers: 
    { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  }).then(res => res.data);
};


