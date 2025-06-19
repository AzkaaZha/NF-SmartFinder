import { API } from "../_api";

export const getStorages = async () => {
  try {
    const { data } = await API.get('/storages');
    return data.data;
  } catch (error) {
    console.error("Error fetching storages:", error);
    throw error;
  }
};