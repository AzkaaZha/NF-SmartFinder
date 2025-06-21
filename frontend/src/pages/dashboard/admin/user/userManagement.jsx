import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteUser, getUser } from "../../../../_services/user";


export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getUser();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Gagal mengambil data pengguna.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus pengguna ini?")) return;
    setDeleteLoading(id);
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      alert("Gagal menghapus pengguna.");
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="container-fluid">
      <h4 className="mb-4 d-flex justify-content-between align-items-center">
        Daftar Pengguna
        <Link to="/dashboard/createus" className="btn btn-primary btn-sm">
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
                    <th>Nama Pengguna</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user, idx) => (
                      <tr key={user.id}>
                        <td>{idx + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(user.id)}
                            disabled={deleteLoading === user.id}
                          >
                            {deleteLoading === user.id ? (
                              <span className="spinner-border spinner-border-sm" />
                            ) : (
                              <i className="fas fa-trash" />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center">
                        Tidak ada data pengguna.
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
