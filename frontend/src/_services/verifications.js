import { API } from "../_api";

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

export const getVerification = async () => {
  try {
    const { data } = await API.get("/verifications", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return data.data;
  } catch (error) {
    console.error("Error fetching verifications:", error);
    throw error;
  }
};

export const getVerificationById = async (id) => {
  try {
    const { data } = await API.get(`/verifications/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
    );
    return data.data;
  } catch (error) {
    console.error(`Error fetching verification with ID ${id}:`, error);
    throw error;
  }
};

export const createVerification = async (verificationData) => {
  
  try {
    const { data } = await API.post("/verifications", verificationData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return data.data;
  } catch (error) {
    console.error("Error creating verification:", error);
    throw error;
  }
};

export const updateVerification = async (id, verificationData) => {
  try {
    const { data } = await API.post(`/verifications/${id}`, verificationData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return data.data;
  } catch (error) {
    console.error(`Error updating verification with ID ${id}:`, error?.response || error);
    throw error;
  }
};

export const deleteVerification = async (id) => {
  try {
    const { data } = await API.delete(`/verifications/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return data.data;
  } catch (error) {
    console.error(`Error deleting verification with ID ${id}:`, error);
    throw error;
  }
};
