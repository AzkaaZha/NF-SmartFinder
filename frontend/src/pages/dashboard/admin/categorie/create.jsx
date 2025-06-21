import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../../../_services/categories";


export default function CreateCategorie() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Nama kategori wajib diisi.");
      return;
    }

    setLoading(true);
    try {
      await createCategory({ name });
      alert(`Kategori "${name}" berhasil ditambahkan!`);
      navigate("/dashboard/categories");
    } catch (err) {
      console.error("Error:", err);
      setError(err?.response?.data?.message || "Gagal menambah kategori.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow mt-4">
            <div className="card-header">
              <h5 className="mb-0">Tambah Kategori Baru</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nama Kategori</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError("");
                    }}
                    placeholder="Masukkan nama kategori"
                    disabled={loading}
                  />
                  {error && <small className="text-danger">{error}</small>}
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/dashboard/categories")}
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
