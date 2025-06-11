import { Link } from "react-router-dom";

export default function AdminDashboard() {
  // Contoh data dummy, nanti bisa diganti dengan data dari API
  const summary = {
    users: 120,
    categories: 8,
    locations: 15,
    lostItems: 34,
    verifications: 12,
    statistics: {
      totalReports: 100,
      verified: 80,
      unverified: 20,
    },
  };

  return (
    <div className="row">
      {/* Data Master */}
      <div className="col-md-12 mb-3">
        <h5>Data Master</h5>
      </div>
      <div className="col-md-4 mb-4">
        <div className="card shadow h-100 py-2">
          <div className="card-body d-flex align-items-center">
            <i className="fas fa-users fa-2x text-primary mr-3"></i>
            <div>
              <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                User Management
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {summary.users} User
              </div>
              <Link to="/dashboard/user" className="small">
                Lihat Detail
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-4">
        <div className="card shadow h-100 py-2">
          <div className="card-body d-flex align-items-center">
            <i className="fas fa-tags fa-2x text-success mr-3"></i>
            <div>
              <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                Kategori Barang
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {summary.categories} Kategori
              </div>
              <Link to="/dashboard/categorie" className="small">
                Lihat Detail
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-4">
        <div className="card shadow h-100 py-2">
          <div className="card-body d-flex align-items-center">
            <i className="fas fa-map-marker-alt fa-2x text-info mr-3"></i>
            <div>
              <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                Lokasi
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {summary.locations} Lokasi
              </div>
              <Link to="/dashboard/location" className="small">
                Lihat Detail
              </Link>
            </div>
          </div>
        </div>
      </div>

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

      {/* Laporan & Statistik */}
      <div className="col-md-12 mb-3 mt-4">
        <h5>Laporan & Statistik</h5>
      </div>
      <div className="col-md-12 mb-4">
        <div className="card shadow h-100 py-2">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <i className="fas fa-chart-bar fa-2x text-danger mr-3"></i>
              <div>
                <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                  Statistik
                </div>
                <div className="mb-1">
                  Total Laporan: <b>{summary.statistics.totalReports}</b> <br />
                  Sudah Diverifikasi: <b>{summary.statistics.verified}</b>{" "}
                  <br />
                  Belum Diverifikasi: <b>{summary.statistics.unverified}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
