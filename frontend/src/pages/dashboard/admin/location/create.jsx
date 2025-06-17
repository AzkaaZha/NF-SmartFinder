import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateLocation() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Nama lokasi wajib diisi.");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/locations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) {
        let data = {};
        try {
          data = await res.json();
        } catch (e) {}
        setError(data.message || "Gagal menambah lokasi.");
        setLoading(false);
        return;
      }
      alert(`Lokasi "${name}" berhasil ditambahkan!`);
      navigate(-1);
    } catch (err) {
      setError("Terjadi kesalahan server: " + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow mt-4">
            <div className="card-header">
              <h5 className="mb-0">Tambah Lokasi Baru</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nama Lokasi</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError("");
                    }}
                    placeholder="Masukkan nama lokasi"
                    disabled={loading}
                  />
                  {error && <small className="text-danger">{error}</small>}
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate(-1)}
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
      </div>
    </div>
  );
}
