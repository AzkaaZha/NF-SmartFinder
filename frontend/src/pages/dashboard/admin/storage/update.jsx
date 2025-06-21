import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStorageById, updateStorage } from "../../../../_services/storages";
import { getUser } from "../../../../_services/user";

export default function UpdateStorage() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [users, setUsers] = useState([]);
  const [usersId, setUsersId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      await updateStorage(id, { name, contact, users_id: usersId });
      alert("Storage berhasil diperbarui!");
      navigate("/dashboard/storages");
    } catch (err) {
      console.error("Error updating storage:", err);
      setError(err.response?.data?.message || "Gagal memperbarui storage.");
    } finally {
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