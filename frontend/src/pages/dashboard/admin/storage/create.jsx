import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createStorage } from "../../../../_services/storages";
import { getUser } from "../../../../_services/user";

export default function CreateStorage() {
  const [name, setName] = useState("");
<<<<<<< HEAD
  const [contact, setContact] = useState("");
  const [users, setUsers] = useState([]);
  const [usersId, setUsersId] = useState("");
=======
  const [contact, setContact] = useState(""); 
  const [users, setUsers] = useState([]); 
  const [usersId, setUsersId] = useState(""); 
>>>>>>> 7a2c5da7364ca6d89f720e2097f52aff8ab61cc6
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

<<<<<<< HEAD
=======
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

>>>>>>> 7a2c5da7364ca6d89f720e2097f52aff8ab61cc6
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        setLoading(true);
        const usersData = await getUser();
        setUsers(usersData);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.response?.data?.message || "Gagal mengambil data pengguna.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsersData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !contact || !usersId) {
      setError("Nama, Contact, dan Pengguna storage wajib diisi!");
      return;
    }

    setLoading(true);
    setError("");
    try {
<<<<<<< HEAD
      await createStorage({ name, contact, users_id: usersId });
      alert("Storage berhasil ditambahkan!");
      navigate("/dashboard/storages");
    } catch (err) {
      console.error("Error creating storage:", err);
      setError(err.response?.data?.message || "Gagal menambahkan storage.");
    } finally {
=======
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
          users_id: usersId, 
        }),
      });

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
      console.error("Terjadi kesalahan:", err);
>>>>>>> 7a2c5da7364ca6d89f720e2097f52aff8ab61cc6
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