import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SatpamDashboard() {
  const [summary, setSummary] = useState({
    users: 0,
    categories: 0,
    locations: 0,
    lostItems: 0,
    verifications: 0,
    statistics: {
      totalReports: 0,
      verified: 0,
      unverified: 0,
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch("http://localhost:8000/api/dashboard-summary", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Gagal mengambil data dashboard.");
      }

      const data = await res.json();
      setSummary(data.data);
      setLoading(false);
    } catch (err) {
      setError("Terjadi kesalahan: " + err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="row">
      {/* Manajemen Barang */}
      <div className="col-md-12 mb-3 mt-4">
        <h5>Manajemen Barang</h5>
      </div>
      <div className="col-md-6 mb-4">
        <div className="card shadow h-100 py-2">
          <div className="card-body d-flex align-items-center">
            <i className="fas fa-search fa-2x text-warning mr-3"></i>
            <div>
              <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                Barang Hilang
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {summary.lostItems} Laporan
              </div>
              <Link to="/dashboard/item" className="small">
                Lihat Detail
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Verifikasi */}
      <div className="col-md-6 mb-4">
        <div className="card shadow h-100 py-2">
          <div className="card-body d-flex align-items-center">
            <i className="fas fa-check-circle fa-2x text-secondary mr-3"></i>
            <div>
              <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">
                Verifikasi
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {summary.verifications} Perlu Verifikasi
              </div>
              <Link to="/dashboard/verification" className="small">
                Lihat Detail
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Storage */}
      <div className="col-md-6 mb-4">
        <div className="card shadow h-100 py-2">
          <div className="card-body d-flex align-items-center">
            <i
              className="fas fa-database fa-2x"
              style={{ color: "#ff9800", marginRight: "1rem" }}
            ></i>
            <div>
              <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">
                Storage
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {summary.verifications} daftar Penyimpanan
              </div>
              <Link to="/dashboard/storage" className="small">
                Lihat Detail
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
