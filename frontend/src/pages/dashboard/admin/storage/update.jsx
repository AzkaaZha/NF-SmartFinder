import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStorageById, updateStorage } from "../../../../_services/storages";
import { getUser } from "../../../../_services/user";

export default function UpdateStorage() {
<<<<<<< HEAD
  const { id } = useParams();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [users, setUsers] = useState([]);
  const [usersId, setUsersId] = useState("");
=======
  const { id } = useParams(); 
  const [storage, setStorage] = useState({});
  const [name, setName] = useState("");
  const [contact, setContact] = useState(""); 
  const [users, setUsers] = useState([]); 
  const [usersId, setUsersId] = useState(""); 
>>>>>>> 7a2c5da7364ca6d89f720e2097f52aff8ab61cc6
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

<<<<<<< HEAD
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const [storageData, usersData] = await Promise.all([
          getStorageById(id),
          getUser(),
        ]);
        setName(storageData?.name || "");
        setContact(storageData?.contact || "");
        setUsersId(storageData?.users_id || "");
        setUsers(usersData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.response?.data?.message || "Gagal mengambil data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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

  const fetchStorageData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8000/api/storages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        let data = await res.json();
        setError(data.message || "Gagal mengambil data storage.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      const storageData = data.data;
      setStorage(storageData);
      setName(storageData.name);
      setContact(storageData.contact);
      setUsersId(storageData.users_id);
      setLoading(false);
    } catch (err) {
      setError("Terjadi kesalahan server: " + err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStorageData();
    fetchUsers(); 
>>>>>>> 7a2c5da7364ca6d89f720e2097f52aff8ab61cc6
  }, [id]);

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
      await updateStorage(id, { name, contact, users_id: usersId });
      alert("Storage berhasil diperbarui!");
      navigate("/dashboard/storages");
    } catch (err) {
      console.error("Error updating storage:", err);
      setError(err.response?.data?.message || "Gagal memperbarui storage.");
    } finally {
=======
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8000/api/storages/${id}`, {
        method: "PUT",
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
        setError(data.message || "Gagal memperbarui storage.");
        setLoading(false);
        return;
      }

      alert("Storage berhasil diperbarui!");
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
      <h4 className="mb-4">Ubah Storage</h4>
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