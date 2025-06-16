import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function ItemDetail() {
  const { id } = useParams(); // Ambil ID dari URL
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItemDetail = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:8000/api/items/${id}`, {
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
          setItem(null);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setItem(data.data);
        setLoading(false);
      } catch (err) {
        setError("Terjadi kesalahan server: " + err.message);
        setItem(null);
        setLoading(false);
      }
    };

    fetchItemDetail();
  }, [id]);

  return (
    <div className="container mt-5">
      <h4 className="mb-4 text-center">Detail Item</h4>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-danger text-center">{error}</div>
      ) : (
        <div className="card shadow-lg p-4">
          <div className="row">
            {/* Gambar Item */}
            <div className="col-md-6 mb-4">
              <img
                src={`http://localhost:8000/storage/${item.image}`}
                alt={item.name}
                className="img-fluid rounded shadow-lg"
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
            </div>

            {/* Detail Item */}
            <div className="col-md-6">
              <h5 className="mb-3">{item.name}</h5>
              <p className="text-muted">{item.description}</p>
              <hr />
              <p><strong>Status:</strong> {item.status}</p>
              <p><strong>Lokasi:</strong> {item.locations_id}</p>
              <p><strong>Kategori:</strong> {item.categories_id}</p>
              <p><strong>Pengguna:</strong> {item.users_id}</p>
              <p><strong>Storage:</strong> {item.storages_id}</p>
            </div>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button
              className="btn btn-secondary"
              onClick={() => window.history.back()}
            >
              Kembali
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
