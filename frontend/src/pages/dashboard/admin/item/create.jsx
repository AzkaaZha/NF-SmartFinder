import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateItem() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [storages, setStorages] = useState([]);
  const [locationsId, setLocationsId] = useState("");
  const [categoriesId, setCategoriesId] = useState("");
  const [usersId, setUsersId] = useState("");
  const [storagesId, setStoragesId] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchRelatedData = async () => {
    try {
      const token = localStorage.getItem("token");

      const [locationsRes, categoriesRes, usersRes, storagesRes] = await Promise.all([
        fetch("http://localhost:8000/api/locations", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:8000/api/categories", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:8000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:8000/api/storages", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!locationsRes.ok || !categoriesRes.ok || !usersRes.ok || !storagesRes.ok) {
        throw new Error("Gagal mengambil data terkait.");
      }

      const [locationsData, categoriesData, usersData, storagesData] = await Promise.all([
        locationsRes.json(),
        categoriesRes.json(),
        usersRes.json(),
        storagesRes.json(),
      ]);

      setLocations(locationsData.data);
      setCategories(categoriesData.data);
      setUsers(usersData.data);
      setStorages(storagesData.data);
    } catch (err) {
      setError("Terjadi kesalahan server saat mengambil data terkait: " + err.message);
    }
  };

  useEffect(() => {
    fetchRelatedData(); 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !date || !description || !locationsId || !categoriesId || !usersId || !storagesId) {
      setError("Semua kolom wajib diisi!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("date", date);
      formData.append("description", description);
      formData.append("locations_id", locationsId);
      formData.append("categories_id", categoriesId);
      formData.append("users_id", usersId);
      formData.append("storages_id", storagesId);
      if (image) formData.append("image", image);

      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/items", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        let data = await res.json();
        setError(data.message || "Gagal menambahkan item.");
        setLoading(false);
        return;
      }

      alert("Item berhasil ditambahkan!");
      navigate("/dashboard/items");
    } catch (err) {
      setError("Terjadi kesalahan server: " + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <h4 className="mb-4 d-flex justify-content-between align-items-center">
        Tambah Item Baru
        <button
          onClick={() => navigate("/dashboard/items")}
          className="btn btn-secondary btn-sm"
        >
          Kembali
        </button>
      </h4>
      <div className="card shadow mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Nama Item */}
            <div className="form-group">
              <label htmlFor="name">Nama Item</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama item"
                disabled={loading}
              />
            </div>

            {/* Tanggal */}
            <div className="form-group">
              <label htmlFor="date">Tanggal</label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Deskripsi */}
            <div className="form-group">
              <label htmlFor="description">Deskripsi</label>
              <textarea
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Masukkan deskripsi"
                disabled={loading}
              />
            </div>

            {/* Lokasi ID (Dropdown) */}
            <div className="form-group">
              <label htmlFor="locationsId">Lokasi</label>
              <select
                className="form-control"
                id="locationsId"
                value={locationsId}
                onChange={(e) => setLocationsId(e.target.value)}
                disabled={loading}
              >
                <option value="">Pilih Lokasi</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Kategori ID (Dropdown) */}
            <div className="form-group">
              <label htmlFor="categoriesId">Kategori</label>
              <select
                className="form-control"
                id="categoriesId"
                value={categoriesId}
                onChange={(e) => setCategoriesId(e.target.value)}
                disabled={loading}
              >
                <option value="">Pilih Kategori</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Pengguna ID (Dropdown) */}
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

            {/* Storage ID (Dropdown) */}
            <div className="form-group">
              <label htmlFor="storagesId">Storage</label>
              <select
                className="form-control"
                id="storagesId"
                value={storagesId}
                onChange={(e) => setStoragesId(e.target.value)}
                disabled={loading}
              >
                <option value="">Pilih Storage</option>
                {storages.map((storage) => (
                  <option key={storage.id} value={storage.id}>
                    {storage.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Gambar (Opsional) */}
            <div className="form-group">
              <label htmlFor="image">Gambar (Opsional)</label>
              <input
                type="file"
                className="form-control"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
                disabled={loading}
              />
            </div>

            {/* Error Message */}
            {error && <div className="text-danger">{error}</div>}

            <div className="d-flex justify-content-between mt-4">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/dashboard/item")}
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
