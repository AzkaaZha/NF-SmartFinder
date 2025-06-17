import { API } from "../_api";

export const getCategories = async () => {
  try {
    const { data } = await API.get('/categories');
    return data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};