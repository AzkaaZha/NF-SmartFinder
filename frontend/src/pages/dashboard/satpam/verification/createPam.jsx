import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateVerificationPam() {
  const [message, setMessage] = useState("");
  const [proofImage, setProofImage] = useState(null); // Untuk gambar bukti
  const [status, setStatus] = useState("pending"); // Default status: pending
  const [items, setItems] = useState([]); // Data item yang tersedia
  const [itemsId, setItemsId] = useState(""); // ID item yang dipilih
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Ambil data items untuk dropdown
  const fetchItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/items", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Gagal mengambil data item.");
      }

      const data = await res.json();
      setItems(data.data);
    } catch (err) {
      setError("Terjadi kesalahan server saat mengambil data item: " + err.message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!message || !itemsId || !status) {
      setError("Semua kolom wajib diisi!");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("message", message);
      formData.append("status", status);
      formData.append("items_id", itemsId);
      
      // Jika ada gambar bukti
      if (proofImage) {
        formData.append("proof_image", proofImage);
      }

      const res = await fetch("http://localhost:8000/api/verifications", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        let data = await res.json();
        console.error("Error detail:", data);
        setError(data.message || "Gagal menambahkan verifikasi.");
        setLoading(false);
        return;
      }

      alert("Verifikasi berhasil ditambahkan!");
      navigate("/dashboardpam/verification");
    } catch (err) {
      setError("Terjadi kesalahan server: " + err.message);
      console.error("Terjadi kesalahan:", err); // Menampilkan error di console untuk debugging
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <h4 className="mb-4">Tambah Verifikasi</h4>
      <div className="card shadow mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Message */}
            <div className="form-group">
              <label htmlFor="message">Pesan</label>
              <input
                type="text"
                className="form-control"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Masukkan pesan verifikasi"
                disabled={loading}
              />
            </div>

            {/* Proof Image */}
            <div className="form-group">
              <label htmlFor="proofImage">Gambar Bukti</label>
              <input
                type="file"
                className="form-control"
                id="proofImage"
                onChange={(e) => setProofImage(e.target.files[0])}
                disabled={loading}
              />
            </div>

            {/* Status (Dropdown) */}
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                className="form-control"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={loading}
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Item ID (Dropdown) */}
            <div className="form-group">
              <label htmlFor="itemsId">Item</label>
              <select
                className="form-control"
                id="itemsId"
                value={itemsId}
                onChange={(e) => setItemsId(e.target.value)}
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

            {/* Error Message */}
            {error && <div className="text-danger">{error}</div>}

            <div className="d-flex justify-content-between mt-4">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/dashboardpam/verification")}
                disabled={loading}
              >
                Batal
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
