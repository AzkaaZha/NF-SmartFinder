import { API } from "../_api";
import { useJwt } from "react-jwt";

export const login = async ({ email, password }) => {
  try {
    const { data } = await API.post(`/login`, { email, password });
    return data; 
  } catch (error) {
    console.error("Login error:", error);
    throw error; 
  }
};

export const register = async ({ name, email, password }) => {
  try {
    const { data } = await API.post(`/register`, { name, email, password });
    return data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const logout = async ({ token }) => {
  try {
    const { data } = await API.post(`/logout`, { token }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    localStorage.removeItem("accessToken");
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const useDecodeToken = (token) => {
  const { decodedToken, isExpired } = useJwt(token);

  try {
    if (isExpired) {
      return {
        success: false,
        message: "Token has expired",
        data: null,
      }
    }
    return {
      success: true,
      message: "Token decoded successfully",
      data: decodedToken,
    };
  } catch (error) {
    console.error("Error decoding token:", error);
    return {
      success: false,
      message: "Failed to decode token",
      data: null,
    };
  }
}