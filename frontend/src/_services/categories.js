import { API } from "../_api";

export const getCategories = async () => {
  try {
    const { data } = await API.get("/categories");
    return data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const createCategory = async (categoryData) => {
  try {
    const { data } = await API.post("/categories", categoryData, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return data.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const getCategoryById = async (id) => {
  try {
    const { data } = await API.get(`/categories/${id}`);
    return data.data;
  } catch (error) {
    console.error(`Error fetching category with ID ${id}:`, error);
    throw error;
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const { data } = await API.put(`/categories/${id}`, categoryData, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return data.data;
  } catch (error) {
    console.error(`Error updating category with ID ${id}:`, error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const { data } = await API.delete(`/categories/${id}`, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return data.data;
  } catch (error) {
    console.error(`Error deleting category with ID ${id}:`, error);
    throw error;
  }
};
