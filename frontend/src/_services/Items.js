import { API } from "../_api";

export const getItems = async () => {
  try {
    const { data } = await API.get("/items");
    return data.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const getItemById = async (id) => {
  try {
    const { data } = await API.get(`/items/${id}`);
    return data.data;
  } catch (error) {
    console.error(`Error fetching item with ID ${id}:`, error);
    throw error;
  }
};

export const createItem = async (data) => {
  try {
    const response = await API.post("/items", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
};

export const updateItem = async (id, itemData) => {
  try {
    const response = await API.put(`/items/${id}`, itemData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating item with ID ${id}:`, error);
    throw error;
  }
};

export const deleteItem = async (id) => {
  try {
    const { data } = await API.delete(`/items/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return data.data;
  } catch (error) {
    console.error(`Error deleting item with ID ${id}:`, error);
    throw error;
  }
};
