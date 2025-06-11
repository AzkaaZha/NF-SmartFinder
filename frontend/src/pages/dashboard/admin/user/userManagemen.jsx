import { useState, useEffect } from "react";

export default function UserManagement() {
  // Contoh data dummy, ganti dengan fetch API jika sudah ada backend
  const [users, setUsers] = useState([
    { id: 1, name: "Budi", email: "budi@mail.com", role: "Admin" },
    { id: 2, name: "Siti", email: "siti@mail.com", role: "User" },
    { id: 3, name: "Andi", email: "andi@mail.com", role: "User" },
  ]);

  // Jika ingin fetch dari API, gunakan useEffect di sini

  return (
    <div className="container-fluid">
      <h4 className="mb-4 d-flex justify-content-between align-items-center">
        Daftar User
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
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={user.id}>
                    <td>{idx + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
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
                {users.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center">
                      Tidak ada data user.
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
