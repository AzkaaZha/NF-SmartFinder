import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryById, updateCategory } from "../../../../_services/categories";

export default function UpdateCategorie() {
  const { id } = useParams(); 
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategorie = async () => {
      setLoading(true);
      try {
        const data = await getCategoryById(id);
        setName(data?.name || "");
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Gagal mengambil data kategori.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategorie();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Nama kategori wajib diisi.");
      return;
    }

    setLoading(true);
    try {
      await updateCategory(id, { name });
      alert("Kategori berhasil diubah!");
      navigate("/dashboard/categorie"); 
    } catch (err) {
      console.error("Update error:", err);
      setError(err?.response?.data?.message || "Gagal mengubah kategori.");
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
              <h5 className="mb-0">Ubah Kategori</h5>
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
