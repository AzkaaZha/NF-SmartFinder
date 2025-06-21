import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../../../_services/categories";
import { getLocations } from "../../../../_services/locations";
import { getUsers } from "../../../../_services/user";
import { getStorages } from "../../../../_services/storages";
import { createItem } from "../../../../_services/Items";

export default function CreateItemPam() {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [locData, catData, userData, stoData] = await Promise.all([
          getLocations(),
          getCategories(),
          getUsers(),
          getStorages(),
        ]);
        setLocations(locData);
        setCategories(catData);
        setUsers(userData);
        setStorages(stoData);
      } catch (err) {
        setError("Gagal memuat data terkait: " + err.message);
      }
    };

    fetchData();
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

      await createItem(formData);
      alert("Item berhasil ditambahkan!");
      navigate("/dashboardpam/item");
    } catch (err) {
      setError("Terjadi kesalahan saat menyimpan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <h4 className="mb-4 d-flex justify-content-between align-items-center">
        Tambah Item Baru
        <button onClick={() => navigate("/dashboardpam/item")} className="btn btn-secondary btn-sm">
          Kembali
        </button>
      </h4>
      <div className="card shadow mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nama Item</label>
              <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={loading} />
            </div>

            <div className="form-group">
              <label htmlFor="date">Tanggal</label>
              <input type="date" className="form-control" id="date" value={date} onChange={(e) => setDate(e.target.value)} disabled={loading} />
            </div>

            <div className="form-group">
              <label htmlFor="description">Deskripsi</label>
              <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} disabled={loading} />
            </div>

            <div className="form-group">
              <label htmlFor="locationsId">Lokasi</label>
              <select className="form-control" id="locationsId" value={locationsId} onChange={(e) => setLocationsId(e.target.value)} disabled={loading}>
                <option value="">Pilih Lokasi</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="categoriesId">Kategori</label>
              <select className="form-control" id="categoriesId" value={categoriesId} onChange={(e) => setCategoriesId(e.target.value)} disabled={loading}>
                <option value="">Pilih Kategori</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="usersId">Pengguna</label>
              <select className="form-control" id="usersId" value={usersId} onChange={(e) => setUsersId(e.target.value)} disabled={loading}>
                <option value="">Pilih Pengguna</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="storagesId">Storage</label>
              <select className="form-control" id="storagesId" value={storagesId} onChange={(e) => setStoragesId(e.target.value)} disabled={loading}>
                <option value="">Pilih Storage</option>
                {storages.map((sto) => (
                  <option key={sto.id} value={sto.id}>{sto.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="image">Gambar (Opsional)</label>
              <input type="file" className="form-control" id="image" onChange={(e) => setImage(e.target.files[0])} disabled={loading} />
            </div>

            {error && <div className="text-danger">{error}</div>}

            <div className="d-flex justify-content-between mt-4">
              <button type="button" className="btn btn-secondary" onClick={() => navigate("/dashboardpam/item")} disabled={loading}>
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
