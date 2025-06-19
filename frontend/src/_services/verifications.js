import { API } from "../_api";

// Fungsi utilitas untuk mendapatkan gaya badge berdasarkan status
export const getStatusBadgeStyle = (status) => {
  const baseStyle = {
    padding: "4px 8px",
    borderRadius: "4px",
    fontWeight: "600",
  };

  switch (status) {
    case "pending":
      return { ...baseStyle, backgroundColor: "#facc15", color: "#000" };
    case "approved":
      return { ...baseStyle, backgroundColor: "#22c55e", color: "#fff" };
    case "rejected":
      return { ...baseStyle, backgroundColor: "#ef4444", color: "#fff" };
    default:
      return {};
  }
};

// Service: Ambil semua data verifikasi
export const getVerification = async () => {
  try {
    const { data } = await API.get("/verifications");
    return data.data;
  } catch (error) {
    console.error("Error fetching verifications:", error);
    throw error;
  }
};

// Service: Ambil satu data verifikasi berdasarkan ID
export const getVerificationById = async (id) => {
  try {
    const { data } = await API.get(`/verifications/${id}`);
    return data.data;
  } catch (error) {
    console.error(`Error fetching verification with ID ${id}:`, error);
    throw error;
  }
};

// Service: Tambah data verifikasi baru
export const createVerification = async (verificationData, token) => {
  try {
    const { data } = await API.post("/verifications", verificationData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  } catch (error) {
    console.error("Error creating verification:", error);
    throw error;
  }
};

// Service: Update data verifikasi berdasarkan ID
export const updateVerification = async (id, verificationData) => {
  try {
    const { data } = await API.put(`/verifications/${id}`, verificationData);
    return data.data;
  } catch (error) {
    console.error(`Error updating verification with ID ${id}:`, error);
    throw error;
  }
};

// Service: Hapus data verifikasi berdasarkan ID
export const deleteVerification = async (id) => {
  try {
    const { data } = await API.delete(`/verifications/${id}`);
    return data.data;
  } catch (error) {
    console.error(`Error deleting verification with ID ${id}:`, error);
    throw error;
  }
};
