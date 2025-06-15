import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ItemCategorie() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      if (!res.ok) {
        let data = {};
        try {
          data = await res.json();
        } catch (e) {}
        setError(data.message || "Gagal mengambil data kategori.");
        setCategories([]);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setCategories(Array.isArray(data.data) ? data.data : []);
      setLoading(false);
    } catch (err) {
      setError("Terjadi kesalahan server: " + err.message);
      setCategories([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus kategori ini?")) return;
    setDeleteLoading(id);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8000/api/categories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      if (!res.ok) {
        let data = {};
        try {
          data = await res.json();
        } catch (e) {}
        alert(data.message || "Gagal menghapus kategori.");
        setDeleteLoading(null);
        return;
      }
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      setDeleteLoading(null);
    } catch (err) {
      alert("Terjadi kesalahan server: " + err.message);
      setDeleteLoading(null);
    }
  };

  return (
    <div className="container-fluid">
      <h4 className="mb-4 d-flex justify-content-between align-items-center">
        Daftar Kategori
        <Link to="/dashboard/createcat" className="btn btn-primary btn-sm">
          <i className="fas fa-plus mr-1"></i> Tambah Data
        </Link>
      </h4>
      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : error ? (
              <div className="text-danger text-center">{error}</div>
            ) : (
              <table className="table table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th>No</th>
                    <th>Nama Kategori</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat, idx) => (
                    <tr key={cat.id}>
                      <td>{idx + 1}</td>
                      <td>{cat.name}</td>
                      <td>
                        <Link to={`/dashboard/updatecat/${cat.id}`} className="btn btn-warning btn-sm mr-2">
                          <i className="fas fa-edit"></i>
                        </Link>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(cat.id)}
                          disabled={deleteLoading === cat.id}
                        >
                          {deleteLoading === cat.id ? (
                            <span className="spinner-border spinner-border-sm"></span>
                          ) : (
                            <i className="fas fa-trash"></i>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {categories.length === 0 && (
                    <tr>
                      <td colSpan={3} className="text-center">
                        Tidak ada data kategori.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
