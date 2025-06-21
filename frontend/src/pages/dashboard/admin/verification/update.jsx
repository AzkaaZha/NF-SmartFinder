import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getVerificationById, updateVerification } from "../../../../_services/verifications";
;

export default function UpdateVerification() {
  const { id } = useParams();
  const [form, setForm] = useState({ message: "", status: "pending", items_id: "" });
  const [proofImage, setProofImage] = useState(null);
  const [currentProofImage, setCurrentProofImage] = useState("");
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ver, itemRes] = await Promise.all([
        getVerificationById(id),
        fetch("http://localhost:8000/api/items", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            Accept: "application/json",
          },
        }).then(res => res.json()),
      ]);
      setForm({ message: ver.message, status: ver.status, items_id: ver.items_id });
      setCurrentProofImage(ver.proof_image);
      setItems(itemRes.data || []);
    } catch (err) {
      setError("Gagal mengambil data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { message, status, items_id } = form;
    if (!message || !status || !items_id) {
      setError("Semua kolom wajib diisi.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("_method", "PUT");
      Object.entries(form).forEach(([key, val]) => formData.append(key, val));
      if (proofImage) formData.append("proof_image", proofImage);

      await updateVerification(id, formData);
      alert("Verifikasi berhasil diperbarui!");
      navigate("/dashboard/verification");
    } catch (err) {
      setError("Gagal: " + err.message);
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
              <label>Pesan Verifikasi</label>
              <input type="text" name="message" className="form-control" value={form.message} onChange={handleChange} disabled={loading} />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="status" className="form-control" value={form.status} onChange={handleChange} disabled={loading}>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="form-group">
              <label>Gambar Bukti</label>
              <input type="file" className="form-control" onChange={(e) => setProofImage(e.target.files[0])} disabled={loading} />
              {currentProofImage && !proofImage && (
                <img src={`http://localhost:8000/storage/verifications/${currentProofImage}`} alt="Bukti" className="mt-3" style={{ maxWidth: "200px" }} />
              )}
            </div>
            <div className="form-group">
              <label>Item</label>
              <select name="items_id" className="form-control" value={form.items_id} onChange={handleChange} disabled={loading}>
                <option value="">Pilih Item</option>
                {items.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            {error && <div className="text-danger mt-2">{error}</div>}
            <div className="d-flex justify-content-between mt-4">
              <button type="button" className="btn btn-secondary" onClick={() => navigate("/dashboard/verification")} disabled={loading}>Batal</button>
              <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Menyimpan..." : "Simpan"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
