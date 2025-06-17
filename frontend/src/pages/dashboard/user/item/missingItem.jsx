import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function MissingItemUser() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchItems = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/items", {
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
        setError(data.message || "Gagal mengambil data item.");
        setItems([]);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setItems(Array.isArray(data.data) ? data.data : []);
      setLoading(false);
    } catch (err) {
      setError("Terjadi kesalahan server: " + err.message);
      setItems([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="container-fluid">
      <h4 className="mb-4 d-flex justify-content-between align-items-center">
        Daftar Item
        <Link to="/dashboarduser/createitem" className="btn btn-primary btn-sm">
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
                    <th>Nama Item</th>
                    <th>Tanggal</th>
                    <th>Deskripsi</th>
                    <th>Gambar</th>
                    <th>Status</th>
                    <th>Lokasi ID</th>
                    <th>Kategori ID</th>
                    <th>Pengguna ID</th>
                    <th>Storage ID</th>
                    <th>Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={item.id}>
                      <td>{idx + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.date}</td>
                      <td>{item.description}</td>
                      <td>{item.image}</td>
                      <td>{item.status}</td>
                      <td>{item.locations_id}</td>
                      <td>{item.categories_id}</td>
                      <td>{item.users_id}</td>
                      <td>{item.storages_id}</td>
                      <td>
                        {/* Link ke halaman detail item */}
                        <Link to={`/dashboarduser/itemdetail/${item.id}`} className="btn btn-info btn-sm">
                          <i className="fas fa-eye"></i> Lihat Detail
                        </Link>
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
