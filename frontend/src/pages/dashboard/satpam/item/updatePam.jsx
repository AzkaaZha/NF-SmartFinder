import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateItemPam() {
  const { id } = useParams(); // Ambil ID dari URL
  const [item, setItem] = useState({});
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
  const [image, setImage] = useState(null);  // Untuk gambar baru (optional)
  const [currentImage, setCurrentImage] = useState("");  // Gambar lama
  const [status, setStatus] = useState(""); // Status
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Ambil data terkait: Lokasi, Kategori, Pengguna, Storage
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

  // Ambil data item berdasarkan ID untuk mengupdate
  const fetchItemData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8000/api/items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        let data = await res.json();
        setError(data.message || "Gagal mengambil data item.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      const item = data.data;
      setItem(item);
      setName(item.name);
      setDate(item.date);
      setDescription(item.description);
      setLocationsId(item.locations_id);
      setCategoriesId(item.categories_id);
      setUsersId(item.users_id);
      setStoragesId(item.storages_id);
      setCurrentImage(item.image);  // Menyimpan gambar lama
      setStatus(item.status); // Set status item
      setLoading(false);
    } catch (err) {
      setError("Terjadi kesalahan server: " + err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItemData();
    fetchRelatedData(); // Ambil data terkait (lokasi, kategori, pengguna, storage)
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input
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
      formData.append("status", status); // Tambahkan status ke formData

      // Jika gambar baru dipilih, tambahkan ke formData
      if (image) {
        formData.append("image", image);
      } else if (currentImage) {
        // Jika gambar baru tidak dipilih, kirim gambar lama
        formData.append("image", currentImage); // Mengirimkan gambar lama
      }

      formData.append("_method", "PUT"); // Tambahkan ini!

      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8000/api/items/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        console.error("Error detail:", data);
        setError(data.message || "Gagal mengupdate item.");
        setLoading(false);
        return;
      }

      alert("Item berhasil diupdate!");
      navigate("/dashboardpam/items");
    } catch (err) {
      setError("Terjadi kesalahan server: " + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <h4 className="mb-4 d-flex justify-content-between align-items-center">
        Ubah Item
        <button
          onClick={() => navigate("/dashboardpam/items")}
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

            {/* Status (Dropdown) */}
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                className="form-control"
                value={status}
                onChange={e => setStatus(e.target.value)}
                required
                disabled={loading}
              >
                <option value="">-- Pilih Status --</option>
                <option value="pending">pending</option>
                <option value="approved">approved</option>
                <option value="rejected">rejected</option>
              </select>
            </div>

            {/* Gambar (Wajib) */}
            <div className="form-group">
              <label htmlFor="image">Gambar</label>
              <input
                type="file"
                className="form-control"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
                disabled={loading}
              />
              {currentImage && !image && (
                <img
                  src={`http://localhost:8000/storage/${currentImage}`}
                  alt="current"
                  className="mt-3"
                  style={{ maxWidth: "200px" }}
                />
              )}
            </div>

            {/* Error Message */}
            {error && <div className="text-danger">{error}</div>}

            <div className="d-flex justify-content-between mt-4">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/dashboardpam/items")}
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
