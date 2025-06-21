import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getItemById, updateItem } from "../../../../_services/Items";
import { getCategories } from "../../../../_services/categories";
import { getLocations } from "../../../../_services/locations";
import { getUser } from "../../../../_services/user";
import { getStorages } from "../../../../_services/storages";

export default function UpdateItemPam() {
  const { id } = useParams(); 
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
  const [currentImage, setCurrentImage] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [itemData, locationsData, categoriesData, usersData, storagesData] = await Promise.all([
          getItemById(id),
          getLocations(),
          getCategories(),
          getUser(),
          getStorages(),
        ]);

        setName(itemData.name);
        setDate(itemData.date);
        setDescription(itemData.description);
        setLocationsId(itemData.locations_id);
        setCategoriesId(itemData.categories_id);
        setUsersId(itemData.users_id);
        setStoragesId(itemData.storages_id);
        setStatus(itemData.status);
        setCurrentImage(itemData.image);

        setLocations(locationsData);
        setCategories(categoriesData);
        setUsers(usersData);
        setStorages(storagesData);
      } catch (err) {
        console.error(err);
        setError("Terjadi kesalahan saat mengambil data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !date || !description || !locationsId || !categoriesId || !usersId || !storagesId || !status) {
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
      formData.append("status", status);
      formData.append("_method", "PUT");

      if (image) {
        formData.append("image", image);
      }

      await updateItem(id, formData);
      alert("Item berhasil diupdate!");
      navigate("/dashboardpam/items");
    } catch (err) {
      console.error(err);
      setError("Gagal mengupdate item: " + err.message);
    } finally {
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


          
            