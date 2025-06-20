import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getVerification,
  deleteVerification,
  getStatusBadgeStyle,
} from "../../../../_services/verifications";

export default function VerificationListPam() {
  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(null);

  const fetchVerifications = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getVerification();
      setVerifications(data || []);
    } catch (err) {
      setError("Gagal mengambil data verifikasi.");
      setVerifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerifications();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus verifikasi ini?")) return;
    setDeleteLoading(id);
    try {
      await deleteVerification(id);
      setVerifications((prev) => prev.filter((ver) => ver.id !== id));
    } catch (err) {
      alert("Gagal menghapus verifikasi.");
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="container-fluid">
      <h4 className="mb-4 d-flex justify-content-between align-items-center">
        Daftar Verifikasi
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
                    <th>Pesan</th>
                    <th>Gambar Bukti</th>
                    <th>Status</th>
                    <th>Item ID</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {verifications.map((ver, idx) => (
                    <tr key={ver.id}>
                      <td>{idx + 1}</td>
                      <td>{ver.message}</td>
                      <td>
                        {ver.proof_image && (
                          <a
                            href={ver.proof_image}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Lihat Gambar
                          </a>
                        )}
                      </td>
                      <td>
                        <span style={getStatusBadgeStyle(ver.status)}>
                          {ver.status}
                        </span>
                      </td>
                      <td>{ver.items_id}</td>    
                      <td>
                        <Link
                          to={`/dashboardpam/updatever/${ver.id}`}
                          className="btn btn-warning btn-sm mr-2"
                        >
                          <i className="fas fa-edit"></i>
                        </Link>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(ver.id)}
                          disabled={deleteLoading === ver.id}
                        >
                          {deleteLoading === ver.id ? (
                            <span className="spinner-border spinner-border-sm"></span>
                          ) : (
                            <i className="fas fa-trash"></i>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {verifications.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center">
                        Tidak ada data verifikasi.
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
