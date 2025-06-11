import { useState, useEffect } from "react";

export default function MissingItem() {
  // Contoh data dummy, ganti dengan fetch dari API/backend kamu
  const [items, setItems] = useState([
    {
      id: 1,
      name: "hp",
      date: "2024-05-22",
      description: "merek xiomi",
      image: "xiomi.jpg",
      status: "pending",
    },
    {
      id: 2,
      name: "Laptop",
      date: "2024-05-22",
      description: "merek asus",
      image: "asus.jpg",
      status: "pending",
    },
  ]);

  // Jika ingin fetch dari API, gunakan useEffect di sini

  return (
    <div className="container-fluid">
      <h4 className="mb-4 d-flex justify-content-between align-items-center">
        Daftar Barang Hilang
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
                  <th>Nama Barang</th>
                  <th>Tanggal</th>
                  <th>Deskripsi</th>
                  <th>Gambar</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={item.id}>
                    <td>{idx + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.date}</td>
                    <td>{item.description}</td>
                    <td>
                      <img
                        src={`/assets/img/${item.image}`}
                        alt={item.name}
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
                {items.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center">
                      Tidak ada data barang hilang.
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
