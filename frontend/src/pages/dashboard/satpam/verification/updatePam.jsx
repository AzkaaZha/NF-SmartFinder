import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getVerificationById, updateVerification } from "../../../../_services/verifications";
import { getItems } from "../../../../_services/Items";

export default function UpdateVerificationPam() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    message: "",
    status: "pending",
    proof_image: null,
    items_id: "",
    users_id: "",
  });

  const [currentProofImage, setCurrentProofImage] = useState("");
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const verification = await getVerificationById(id);
        const itemsList = await getItems();

        setFormData({
          message: verification.message,
          status: verification.status,
          proof_image: null,
          items_id: verification.items_id,
        });

        setCurrentProofImage(verification.proof_image);
        setItems(itemsList);
      } catch (err) {
        setError("Gagal memuat data. Pastikan Anda memiliki akses yang valid.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.message || !formData.status || !formData.items_id) {
      setError("Pesan, status, dan Item wajib diisi!");
      setLoading(false);
      return;
    }

    const form = new FormData();
    form.append("message", formData.message);
    form.append("status", formData.status);
    form.append("items_id", formData.items_id);

    // ✅ Tambahkan users_id
    const userId = localStorage.getItem("userId");
    if (userId) {
      form.append("users_id", userId);
    }

    if (formData.proof_image) {
      form.append("proof_image", formData.proof_image);
    }
    form.append("_method", "PUT");

    try {
      await updateVerification(id, form);
      alert("Verifikasi berhasil diperbarui.");
      navigate("/dashboardpam/verifications");
    } catch (err) {
      console.error("DETAIL ERROR:", err?.response?.data || err);
      setError("Gagal mengupdate verifikasi. Cek koneksi atau token Anda.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container-fluid">
      <h4 className="mb-4">Ubah Verifikasi</h4>
      <div className="card shadow mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Pesan</label>
              <input
                type="text"
                className="form-control"
                name="message"
                value={formData.message}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                className="form-control"
                value={formData.status}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="form-group">
              <label>Gambar Bukti</label>
              <input
                type="file"
                name="proof_image"
                className="form-control"
                onChange={handleChange}
                disabled={loading}
              />
              {currentProofImage && !formData.proof_image && (
                <img
                  src={`http://localhost:8000/storage/verifications/${currentProofImage}`}
                  alt="Current Proof"
                  style={{ maxWidth: "200px" }}
                  className="mt-2"
                />
              )}
            </div>

            <div className="form-group">
              <label>Item</label>
              <select
                name="items_id"
                className="form-control"
                value={formData.items_id}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">Pilih Item</option>
                {items.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {error && <div className="text-danger mt-2">{error}</div>}

            <div className="d-flex justify-content-between mt-4">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/dashboardpam/verifications")}
                disabled={loading}
              >
                Batal
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
