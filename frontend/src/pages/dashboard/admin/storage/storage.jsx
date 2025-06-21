import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteStorage, getStorages } from "../../../../_services/storages";


export default function StorageList() {
  const [storages, setStorages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(null);

  const fetchStorages = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getStorages();
      setStorages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching storages:", err);
      setError(err.response?.data?.message || "Gagal mengambil data storage.");
      setStorages([]);
    } finally {
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
      await deleteStorage(id);
      setStorages((prev) => prev.filter((storage) => storage.id !== id));
    } catch (err) {
      console.error(`Error deleting storage with ID ${id}:`, err);
      alert(err.response?.data?.message || "Gagal menghapus storage.");
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="container-fluid">
      <h4 className="mb-4 d-flex justify-content-between align-items-center">
        Daftar Storage
        <Link to="/dashboard/createsto" className="btn btn-primary btn-sm">
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
                          to={`/dashboard/updatesto/${storage.id}`}
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
                      <td colSpan={5} className="text-center">
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