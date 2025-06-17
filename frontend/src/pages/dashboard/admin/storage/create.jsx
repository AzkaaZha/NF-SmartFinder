import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateStorage() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState(""); // Tambahkan state untuk contact
  const [users, setUsers] = useState([]); // Tambahkan state untuk users
  const [usersId, setUsersId] = useState(""); // Tambahkan state untuk users_id
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Ambil data users
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Gagal mengambil data pengguna.");
      }

      const data = await res.json();
      setUsers(data.data);
    } catch (err) {
      setError("Terjadi kesalahan server saat mengambil data pengguna: " + err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!name || !contact || !usersId) {
      setError("Nama, Contact dan Pengguna storage wajib diisi!");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/storages", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          contact: contact,
          users_id: usersId, // Mengirimkan users_id
        }),
      });

      // Cek jika status code tidak OK
      if (!res.ok) {
        let data = await res.json();
        console.error("Error detail:", data);
        setError(data.message || "Gagal menambahkan storage.");
        setLoading(false);
        return;
      }

      alert("Storage berhasil ditambahkan!");
      navigate("/dashboard/storages");
    } catch (err) {
      setError("Terjadi kesalahan server: " + err.message);
      console.error("Terjadi kesalahan:", err); // Menampilkan error di console untuk debugging
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <h4 className="mb-4">Tambah Storage</h4>
      <div className="card shadow mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Nama Storage */}
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

            {/* Contact Storage */}
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

            {/* Users ID (Dropdown) */}
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

            {/* Error Message */}
            {error && <div className="text-danger">{error}</div>}

            <div className="d-flex justify-content-between mt-4">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/dashboard/storages")}
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
