import { API } from "../_api";

// Menampilkan Item
export const getItems = async () => {
  try {
    const { data } = await API.get('/items');
    return data.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;  
  }
};
