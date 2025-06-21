import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getItems, deleteItem } from "../../../../_services/Items";

export default function MissingItemPam() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await getItems();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Terjadi kesalahan saat mengambil data: " + err.message);
    } finally {
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
    } catch (err) {
      alert("Gagal menghapus item: " + err.message);
    } finally {
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
                    <th>Status</th>
                    <th>Lokasi</th>
                    <th>Kategori</th>
                    <th>Pelapor</th>
                    <th>Penyimpanan</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length > 0 ? (
                    items.map((item, idx) => (
                      <tr key={item.id}>
                        <td>{idx + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.date}</td>
                        <td>{item.description}</td>
                        <td>
                          {item.image ? (
                            <img src={`http://localhost:8000/storage/${item.image}`} alt={item.name} width="50" />
                          ) : (
                            "Tidak ada"
                          )}
                        </td>
                        <td>{item.status}</td>
                        <td>{item.location?.name || item.locations_id}</td>
                        <td>{item.category?.name || item.categories_id}</td>
                        <td>{item.user?.name || item.users_id}</td>
                        <td>{item.storage?.name || item.storages_id}</td>
                        <td>
                          <Link to={`/dashboardpam/updateitem/${item.id}`} className="btn btn-warning btn-sm mr-2">
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
                    ))
                  ) : (
                    <tr>
                      <td colSpan="11" className="text-center">
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
