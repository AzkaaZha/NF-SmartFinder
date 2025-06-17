import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role: user
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!name || !email || !password || !role) {
      setError("Semua kolom wajib diisi!");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      });

      // Menangani respons jika status bukan OK
      if (!res.ok) {
        // Jika status bukan OK, coba ambil respons JSON untuk debugging
        let data = await res.text();  // Mengambil data dalam bentuk teks
        try {
          data = JSON.parse(data);  // Mengonversi ke JSON jika memungkinkan
        } catch (e) {
          setError("Terjadi kesalahan: Tidak dapat mengurai respons dari server.");
          console.error("Error response:", data);
          setLoading(false);
          return;
        }
        console.error("Error detail:", data);
        setError(data.message || "Gagal membuat pengguna.");
        setLoading(false);
        return;
      }

      alert("Pengguna berhasil dibuat!");
      navigate("/dashboard/users");
    } catch (err) {
      setError("Terjadi kesalahan server: " + err.message);
      console.error("Terjadi kesalahan:", err); // Menampilkan error di console untuk debugging
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <h4 className="mb-4">Tambah Pengguna</h4>
      <div className="card shadow mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Nama User */}
            <div className="form-group">
              <label htmlFor="name">Nama Pengguna</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama pengguna"
                disabled={loading}
              />
            </div>

            {/* Email User */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email"
                disabled={loading}
              />
            </div>

            {/* Password User */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                disabled={loading}
              />
            </div>

            {/* Role (Dropdown) */}
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                className="form-control"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={loading}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Error Message */}
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
