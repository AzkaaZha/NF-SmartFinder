import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteItem, getItems } from "../../../../_services/Items";

export default function MissingItem() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getItems();
      setItems(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching items:", err);
      setError(err.response?.data?.message || "Gagal mengambil data item.");
      setItems([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus item ini?")) return;
    setDeleteLoading(id);
    try {
      await deleteItem(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      setDeleteLoading(null);
    } catch (err) {
      console.error(`Error deleting item with ID ${id}:`, err);
      alert(err.response?.data?.message || "Gagal menghapus item.");
      setDeleteLoading(null);
    }
  };

  return (
    <div className="container-fluid">
      <h4 className="mb-4 d-flex justify-content-between align-items-center">
        Daftar Item
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
                    <th>Nama Item</th>
                    <th>Tanggal</th>
                    <th>Deskripsi</th>
                    <th>Gambar</th>
                    <th>status</th>
                    <th>Lokasi ID</th>
                    <th>Kategori ID</th>
                    <th>Pengguna ID</th>
                    <th>Storage ID</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={item.id}>
                      <td>{idx + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.date}</td>
                      <td>{item.description}</td>
                      <td>
                        {item.image && (
                          <a href={item.image} target="_blank" rel="noopener noreferrer">
                            Lihat Gambar
                          </a>
                        )}
                      </td>
                      <td>{item.status}</td>
                      <td>{item.locations_id}</td>
                      <td>{item.categories_id}</td>
                      <td>{item.users_id}</td>
                      <td>{item.storages_id}</td>
                      <td>
                        <Link to={`/dashboard/updateitem/${item.id}`} className="btn btn-warning btn-sm mr-2">
                          <i className="fas fa-edit"></i>
                        </Link>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(item.id)}
                          disabled={deleteLoading === item.id}
                        >
                          {deleteLoading === item.id ? (
                            <span className="spinner-border spinner-border-sm"></span>
                          ) : (
                            <i className="fas fa-trash"></i>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr>
                      <td colSpan={11} className="text-center">
                        Tidak ada data item.
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