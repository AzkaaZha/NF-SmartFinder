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

export const getUser = async () => {
  try {
    const { data } = await API.get("/users",{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return data.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export const getCreateUser = async (data) => {
  try {
    const response = await API.post("/users", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
} 

export const updateUser = async (id, itemData) => {
  try {
    const response = await API.put(`/users/${id}`, itemData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const { data } = await API.delete(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return data.data;
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw error;
  }
};

