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

export const getStorageById = async (id) => {
  try {
    const { data } = await API.get(`/storages/${id}`);
    return data.data;
  } catch (error) {
    console.error(`Error fetching storage with ID ${id}:`, error);
    throw error;
  }
};

export const createStorage = async (storageData) => {
  try {
    const { data } = await API.post('/storages', storageData,
      {
        headers: {
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );
    return data.data;
  } catch (error) {
    console.error("Error creating storage:", error);
    throw error;
  }
};

export const updateStorage = async (id, storageData) => {
  try {
    const { data } = await API.put(`/storages/${id}`, storageData, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return data.data;
  } catch (error) {
    console.error(`Error updating storage with ID ${id}:`, error);
    throw error;
  }
};

export const deleteStorage = async (id) => {
  try {
    const { data } = await API.delete(`/storages/${id}`, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return data.data;
  } catch (error) {
    console.error(`Error deleting storage with ID ${id}:`, error);
    throw error;
  }
};