import { useState, useEffect } from "react";

export default function ItemVerification() {
  // Data dummy, ganti dengan fetch dari API/backend kamu
  const [verifications, setVerifications] = useState([
    {
      id: 1,
      message: "ini adalah hp saya",
      proof_image: "bukti1.jpg",
      status: "pending",
      items_id: 1,
      created_at: "2025-05-24 09:28:53",
      updated_at: "2025-05-24 09:28:53",
    },
    // Tambahkan data lain jika perlu
  ]);

  return (
    <div className="container-fluid">
      <h4 className="mb-4 d-flex justify-content-between align-items-center">
        Daftar Verifikasi Barang
        <button className="btn btn-primary btn-sm">
          <i className="fas fa-plus mr-1"></i> Tambah Data
        </button>
      </h4>
      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr>
                  <th>No</th>
                  <th>Pesan</th>
                  <th>Bukti Gambar</th>
                  <th>Status</th>
                  <th>Tanggal</th>
                  <th>Aksi</th> {/* Kolom aksi */}
                </tr>
              </thead>
              <tbody>
                {verifications.map((item, idx) => (
                  <tr key={item.id}>
                    <td>{idx + 1}</td>
                    <td>{item.message}</td>
                    <td>
                      <img
                        src={`/assets/img/${item.proof_image}`}
                        alt="bukti"
                        style={{ width: 60, height: 40, objectFit: "cover" }}
                      />
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          item.status === "pending"
                            ? "badge-warning"
                            : "badge-success"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>{item.created_at}</td>
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
                {verifications.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center">
                      Tidak ada data verifikasi.
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
