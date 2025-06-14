import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function LocationList() {
  // Contoh data dummy lokasi
  const [locations, setLocations] = useState([
    { id: 1, name: "Gedung A" },
    { id: 2, name: "Perpustakaan" },
    { id: 3, name: "Kantin" },
  ]);

  // Jika ingin fetch dari API, gunakan useEffect di sini

  return (
    <div className="container-fluid">
      <h4 className="mb-4 d-flex justify-content-between align-items-center">
        Daftar Lokasi
        <Link
          to="/dashboard/create"
          className="btn btn-primary btn-sm"
        >
          <i className="fas fa-plus mr-1"></i> Tambah Data
        </Link>
      </h4>
      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">
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
                      <button className="btn btn-warning btn-sm mr-2">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="btn btn-danger btn-sm">
                        <i className="fas fa-trash"></i>
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
          </div>
        </div>
      </div>
    </div>
  );
}
