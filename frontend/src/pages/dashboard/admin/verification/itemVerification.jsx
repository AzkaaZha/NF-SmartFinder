import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function VerificationList() {
  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(null);

  // Fungsi untuk mengambil data verifikasi
  const fetchVerifications = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("accessToken"); // Mengambil token dari localStorage
      const res = await fetch("http://localhost:8000/api/verifications", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      // Memeriksa apakah response sukses
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Gagal mengambil data verifikasi.");
        setVerifications([]);
        setLoading(false);
        return;
      }

      // Jika sukses, set data ke state verifications
      const data = await res.json();
      setVerifications(data.data || []); // Pastikan data di-set dengan benar
      setLoading(false);
    } catch (err) {
      setError("Terjadi kesalahan server: " + err.message);
      setVerifications([]);
      setLoading(false);
    }
  };

  // Memanggil fungsi fetchVerifications pada saat komponen pertama kali dimuat
  useEffect(() => {
    fetchVerifications();
  }, []);

  // Fungsi untuk menghapus verifikasi
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus verifikasi ini?")) return;
    setDeleteLoading(id);
    try {
      const token = localStorage.getItem("token"); // Mengambil token dari localStorage
      const res = await fetch(`http://localhost:8000/api/verifications/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      // Memeriksa apakah response berhasil
      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Gagal menghapus verifikasi.");
        setDeleteLoading(null);
        return;
      }

      // Jika berhasil, filter data dan hapus verifikasi yang dihapus dari daftar
      setVerifications((prev) => prev.filter((ver) => ver.id !== id));
      setDeleteLoading(null);
    } catch (err) {
      alert("Terjadi kesalahan server: " + err.message);
      setDeleteLoading(null);
    }
  };

  return (
    <div className="container-fluid">
      <h4 className="mb-4 d-flex justify-content-between align-items-center">
        Daftar Verifikasi
        <Link to="/dashboard/createver" className="btn btn-primary btn-sm">
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
                      <td>{ver.status}</td>
                      <td>{ver.items_id}</td>
                      <td>
                        <Link
                          to={`/dashboard/updatever/${ver.id}`}
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
