import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCreateUser } from "../../../../_services/user";

export default function CreateUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.role) {
      setError("Semua kolom wajib diisi!");
      return;
    }

    setLoading(true);
    try {
      await getCreateUser(form);
      alert("Pengguna berhasil dibuat!");
      navigate("/dashboard/user");
    } catch (err) {
      console.error("Gagal membuat user:", err);
      setError(err?.response?.data?.message || "Gagal membuat pengguna.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <h4 className="mb-4">Tambah Pengguna</h4>
      <div className="card shadow mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nama Pengguna</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Masukkan nama"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Masukkan email"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Masukkan password"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Role</label>
              <select
                className="form-control"
                name="role"
                value={form.role}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="user">User</option>
                <option value="satpam">Satpam</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {error && <div className="text-danger">{error}</div>}

            <div className="d-flex justify-content-between mt-4">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/dashboard/user")}
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
