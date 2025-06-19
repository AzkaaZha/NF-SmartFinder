export const getStatusBadgeStyle = (status) => {
  switch (status) {
    case "pending":
      return {
        backgroundColor: "#facc15",
        color: "#000",
        padding: "4px 8px",
        borderRadius: "4px",
        fontWeight: "600",
      };
    case "approved":
      return {
        backgroundColor: "#22c55e",
        color: "#fff",
        padding: "4px 8px",
        borderRadius: "4px",
        fontWeight: "600",
      };
    case "rejected":
      return {
        backgroundColor: "#ef4444",
        color: "#fff",
        padding: "4px 8px",
        borderRadius: "4px",
        fontWeight: "600",
      };
    default:
      return {};
  }
};