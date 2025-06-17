import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function StorageListPam() {
  const [storages, setStorages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(null);

  const fetchStorages = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/storages", {
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
        setError(data.message || "Gagal mengambil data storage.");
        setStorages([]);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setStorages(Array.isArray(data.data) ? data.data : []);
      setLoading(false);
    } catch (err) {
      setError("Terjadi kesalahan server: " + err.message);
      setStorages([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStorages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus storage ini?")) return;
    setDeleteLoading(id);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8000/api/storages/${id}`, {
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
        alert(data.message || "Gagal menghapus storage.");
        setDeleteLoading(null);
        return;
      }
      setStorages((prev) => prev.filter((storage) => storage.id !== id));
      setDeleteLoading(null);
    } catch (err) {
      alert("Terjadi kesalahan server: " + err.message);
      setDeleteLoading(null);
    }
  };

  return (
    <div className="container-fluid">
      <h4 className="mb-4 d-flex justify-content-between align-items-center">
        Daftar Storage
        <Link to="/dashboardpam/createsto" className="btn btn-primary btn-sm">
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
                    <th>Nama Storage</th>
                    <th>Contact</th>
                    <th>Users ID</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {storages.map((storage, idx) => (
                    <tr key={storage.id}>
                      <td>{idx + 1}</td>
                      <td>{storage.name}</td>
                      <td>{storage.contact}</td>
                      <td>{storage.users_id}</td>
                      <td>
                        <Link
                          to={`/dashboardpam/updatesto/${storage.id}`}
                          className="btn btn-warning btn-sm mr-2"
                        >
                          <i className="fas fa-edit"></i>
                        </Link>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(storage.id)}
                          disabled={deleteLoading === storage.id}
                        >
                          {deleteLoading === storage.id ? (
                            <span className="spinner-border spinner-border-sm"></span>
                          ) : (
                            <i className="fas fa-trash"></i>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {storages.length === 0 && (
                    <tr>
                      <td colSpan={3} className="text-center">
                        Tidak ada data storage.
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
