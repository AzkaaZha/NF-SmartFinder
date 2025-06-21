import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteLocation, getLocations } from "../../../../_services/locations";


export default function LocationList() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(null);

  const fetchLocations = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getLocations();
      setLocations(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching locations:", err);
      setError(err.response?.data?.message || "Gagal mengambil data lokasi.");
      setLocations([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus lokasi ini?")) return;
    setDeleteLoading(id);
    try {
      await deleteLocation(id);
      setLocations((prev) => prev.filter((loc) => loc.id !== id));
      setDeleteLoading(null);
    } catch (err) {
      console.error(`Error deleting location with ID ${id}:`, err);
      alert(err.response?.data?.message || "Gagal menghapus lokasi.");
      setDeleteLoading(null);
    }
  };

  return (
    <div className="container-fluid">
      <h4 className="mb-4 d-flex justify-content-between align-items-center">
        Daftar Lokasi
        <Link
          to="/dashboard/createloc"
          className="btn btn-primary btn-sm"
        >
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
                    <th>Nama Lokasi</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {locations.map((loc, idx) => (
                    <tr key={loc.id}>
                      <td>{idx + 1}</td>
                      <td>{loc.name}</td>
                      <td>
                        <Link 
                          to={`/dashboard/updateloc/${loc.id}`}
                          className="btn btn-warning btn-sm mr-2">
                          <i className="fas fa-edit"></i>
                        </Link>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(loc.id)}
                          disabled={deleteLoading === loc.id}
                        >
                          {deleteLoading === loc.id ? (
                            <span className="spinner-border spinner-border-sm"></span>
                          ) : (
                            <i className="fas fa-trash"></i>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {locations.length === 0 && (
                    <tr>
                      <td colSpan={3} className="text-center">
                        Tidak ada data lokasi.
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