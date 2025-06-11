import { useState, useEffect } from "react";

export default function ItemCategorie() {
  // Contoh data dummy kategori barang
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Elektronik",
      description: "Barang-barang elektronik seperti HP, laptop, dll.",
    },
    { id: 2, name: "Dokumen", description: "KTP, SIM, kartu pelajar, dsb." },
    { id: 3, name: "Aksesoris", description: "Jam tangan, kacamata, dsb." },
  ]);

  // Jika ingin fetch dari API, gunakan useEffect di sini

  return (
    <div className="container-fluid">
      <h4 className="mb-4 d-flex justify-content-between align-items-center">
        Daftar Kategori Barang
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
                  <th>Nama Kategori</th>
                  <th>Deskripsi</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, idx) => (
                  <tr key={cat.id}>
                    <td>{idx + 1}</td>
                    <td>{cat.name}</td>
                    <td>{cat.description}</td>
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
                {categories.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center">
                      Tidak ada data kategori.
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
