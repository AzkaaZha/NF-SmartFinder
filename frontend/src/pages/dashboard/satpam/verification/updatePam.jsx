import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateVerificationPam() {
  const { id } = useParams(); // Ambil ID dari URL
  const [verification, setVerification] = useState({});
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("pending"); // Default status: pending
  const [proofImage, setProofImage] = useState(null); // Untuk gambar baru (optional)
  const [currentProofImage, setCurrentProofImage] = useState(""); // Gambar lama
  const [itemsId, setItemsId] = useState(""); // ID Item yang dipilih
  const [items, setItems] = useState([]); // Daftar item untuk dropdown
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Ambil data verifikasi berdasarkan ID
  const fetchVerificationData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8000/api/verifications/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Gagal mengambil data verifikasi.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      const verification = data.data;
      setVerification(verification);
      setMessage(verification.message);
      setStatus(verification.status);
      setItemsId(verification.items_id); // Set items_id
      setCurrentProofImage(verification.proof_image);  // Menyimpan gambar lama
      setLoading(false);
    } catch (err) {
      setError("Terjadi kesalahan server: " + err.message);
      setLoading(false);
    }
  };

  // Ambil data items (untuk dropdown)
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
        const data = await res.json();
        setError(data.message || "Gagal mengambil data items.");
        return;
      }

      const data = await res.json();
      setItems(data.data);
    } catch (err) {
      setError("Terjadi kesalahan saat mengambil data items: " + err.message);
    }
  };

  useEffect(() => {
    fetchVerificationData();
    fetchItems(); // Ambil data items untuk dropdown
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!message || !status || !itemsId) {
      setError("Pesan, status, dan Item ID wajib diisi!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("message", message);
      formData.append("status", status);
      formData.append("items_id", itemsId); // Kirim items_id yang valid

      // Jika ada gambar baru, kirim gambar tersebut
      if (proofImage) {
        formData.append("proof_image", proofImage); // Mengirim gambar baru
      } else if (currentProofImage) {
        // Jangan kirim proof_image jika tidak ada gambar baru
        formData.append("proof_image", currentProofImage); // Kirim gambar lama hanya jika dibutuhkan
      }

      formData.append("_method", "PUT"); // Tambahkan ini untuk menggunakan metode PUT pada formData

      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8000/api/verifications/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        let data = await res.json();
        console.error("Error detail:", data);
        setError(data.message || "Gagal mengupdate verifikasi.");
        setLoading(false);
        return;
      }

      alert("Verifikasi berhasil diupdate!");
      navigate("/dashboardpam/verifications");
    } catch (err) {
      setError("Terjadi kesalahan server: " + err.message);
      setLoading(false);
    }
};

  return (
    <div className="container-fluid">
      <h4 className="mb-4">Ubah Verifikasi</h4>
      <div className="card shadow mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Pesan Verifikasi */}
            <div className="form-group">
              <label htmlFor="message">Pesan Verifikasi</label>
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

            {/* Status Verifikasi */}
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

            {/* Gambar Bukti (Opsional) */}
            <div className="form-group">
              <label htmlFor="proof_image">Gambar Bukti</label>
              <input
                type="file"
                className="form-control"
                id="proof_image"
                onChange={(e) => setProofImage(e.target.files[0])}
                disabled={loading}
              />
              {currentProofImage && !proofImage && (
                <img
                  src={`http://localhost:8000/storage/verifications/${currentProofImage}`}
                  alt="current"
                  className="mt-3"
                  style={{ maxWidth: "200px" }}
                />
              )}
            </div>

            {/* Item ID (Dropdown) */}
            <div className="form-group">
              <label htmlFor="items_id">Item</label>
              <select
                className="form-control"
                id="items_id"
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
