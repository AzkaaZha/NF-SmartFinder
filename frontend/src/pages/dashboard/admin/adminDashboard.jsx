import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
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

  const fetchSummaryData = async () => {
    try {
      const token = localStorage.getItem("token");

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
    fetchSummaryData();
  }, []);

  return (
    <div className="row">
      {/* Data Master */}
      <div className="col-md-12 mb-3">
        <h5>Data Master</h5>
      </div>

      {/* Users */}
      <div className="col-md-4 mb-4">
        <div className="card shadow h-100 py-2">
          <div className="card-body d-flex align-items-center">
            <i className="fas fa-users fa-2x text-primary mr-3"></i>
            <div>
              <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                User Management
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {loading ? "Loading..." : summary.users} User
              </div>
              <Link to="/dashboard/user" className="small">
                Lihat Detail
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="col-md-4 mb-4">
        <div className="card shadow h-100 py-2">
          <div className="card-body d-flex align-items-center">
            <i className="fas fa-tags fa-2x text-success mr-3"></i>
            <div>
              <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                Kategori Barang
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {loading ? "Loading..." : summary.categories} Kategori
              </div>
              <Link to="/dashboard/categorie" className="small">
                Lihat Detail
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Locations */}
      <div className="col-md-4 mb-4">
        <div className="card shadow h-100 py-2">
          <div className="card-body d-flex align-items-center">
            <i className="fas fa-map-marker-alt fa-2x text-info mr-3"></i>
            <div>
              <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                Lokasi
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {loading ? "Loading..." : summary.locations} Lokasi
              </div>
              <Link to="/dashboard/location" className="small">
                Lihat Detail
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Lost Items */}
      <div className="col-md-6 mb-4">
        <div className="card shadow h-100 py-2">
          <div className="card-body d-flex align-items-center">
            <i className="fas fa-search fa-2x text-warning mr-3"></i>
            <div>
              <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                Barang Hilang
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {loading ? "Loading..." : summary.lostItems} Laporan
              </div>
              <Link to="/dashboard/item" className="small">
                Lihat Detail
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Verifications */}
      <div className="col-md-6 mb-4">
        <div className="card shadow h-100 py-2">
          <div className="card-body d-flex align-items-center">
            <i className="fas fa-check-circle fa-2x text-secondary mr-3"></i>
            <div>
              <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">
                Verifikasi
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {loading ? "Loading..." : summary.verifications} Perlu
                Verifikasi
              </div>
              <Link to="/dashboard/verification" className="small">
                Lihat Detail
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
