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

export const createLocation = async (locationData) => {
  try {
    const { data } = await API.post('/locations', locationData,
      {
        headers: {
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    return data.data;
  } catch (error) {
    console.error("Error creating location:", error);
    throw error;
  }
};

export const getLocationById = async (id) => {
  try {
    const { data } = await API.get(`/locations/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return data.data;
  } catch (error) {
    console.error(`Error fetching location with ID ${id}:`, error);
    throw error;
  }
};

export const updateLocation = async (id, locationData) => {
  try {
    const { data } = await API.put(`/locations/${id}`, locationData, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return data.data;
  } catch (error) {
    console.error(`Error updating location with ID ${id}:`, error);
    throw error;
  }
};

export const deleteLocation = async (id) => {
  try {
    const { data } = await API.delete(`/locations/${id}`, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return data.data;
  } catch (error) {
    console.error(`Error deleting location with ID ${id}:`, error);
    throw error;
  }
};