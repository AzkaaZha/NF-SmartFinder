import { API } from "../_api";

export const getLocations = async () => {
  try {
    const { data } = await API.get('/locations');
    return data.data;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};