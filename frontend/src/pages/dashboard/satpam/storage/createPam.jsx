import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../../_services/user";
import { createStorage } from "../../../../_services/storages";

export default function CreateStoragePam() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [users, setUsers] = useState([]);
  const [usersId, setUsersId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const data = await getUser();
      setUsers(data);
    } catch (err) {
      setError("Terjadi kesalahan saat mengambil data pengguna.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !contact || !usersId) {
      setError("Nama, Contact, dan Pengguna storage wajib diisi!");
      return;
    }

    setLoading(true);
    try {
      await createStorage({
        name,
        contact,
        users_id: usersId,
      });

      alert("Storage berhasil ditambahkan!");
      navigate("/dashboardpam/storages");
    } catch (err) {
      setError("Terjadi kesalahan saat menyimpan data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <h4 className="mb-4">Tambah Storage</h4>
      <div className="card shadow mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nama Storage</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama storage"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact">Contact</label>
              <input
                type="text"
                className="form-control"
                id="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Masukkan contact storage"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="usersId">Pengguna</label>
              <select
                className="form-control"
                id="usersId"
                value={usersId}
                onChange={(e) => setUsersId(e.target.value)}
                disabled={loading}
              >
                <option value="">Pilih Pengguna</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            {error && <div className="text-danger">{error}</div>}

            <div className="d-flex justify-content-between mt-4">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/dashboardpam/storages")}
                disabled={loading}
              >
                Batal
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
