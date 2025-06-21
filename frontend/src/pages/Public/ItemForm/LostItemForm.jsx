import { useState, useEffect } from "react";
import {
  FormWrapper,
  Form,
  Title,
  FormGroup,
  SubmitButton,
  Message,
} from "./LostItemForm.styled";
import { getLocations } from "../../../_services/locations";
import { getCategories } from "../../../_services/categories";
import { getStorages } from "../../../_services/storages";
import { createItem } from "../../../_services/Items";

export default function LostItemForm() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    description: "",
    image: null,
    locations_id: "",
    categories_id: "",
    storages_id: "",
    users_id: "", 
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [storages, setStorages] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("userInfo"));
  const userId = currentUser ? currentUser.id : null;

  useEffect(() => {
    if (userId) {
      setFormData((prev) => ({
        ...prev,
        users_id: userId,
      }));
    }

    const fetchData = async () => {
      try {
        const [LocatioData, CategoryData, StorageData] = await Promise.all([
          getLocations(),
          getCategories(),
          getStorages(),
        ]);
        setLocations(LocatioData);
        setCategories(CategoryData);
        setStorages(StorageData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("Gagal memuat data dropdown.");
      }
    };

    fetchData();
  }, [userId]);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      const file = files[0];
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width > 2000 || img.height > 2000) {
          alert("Gambar terlalu besar. Maksimal dimensi 2000x2000 px.");
          return;
        } else {
          setFormData((prev) => ({ ...prev, image: file }));
        }
      };
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        form.append(key, formData[key]);
      }
    });

    try {
      await createItem(form);
      setMessage("Laporan berhasil dikirim.");
      setFormData({
        name: "",
        date: "",
        description: "",
        image: null,
        locations_id: "",
        categories_id: "",
        storages_id: "",
        users_id: userId,
      });
    } catch (err) {
      console.error("Error creating item:", err);
      if (err.response && err.response.data && err.response.data.errors) {
        setMessage("Gagal mengirim laporan. Pastikan semua data sudah benar.");
      } else {
        setMessage("Terjadi kesalahan saat mengirim laporan.");
      }
    } finally {
      setLoading(false);
    }
  };

  console.log("formData:", formData);

  return (
    <div>
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <Title>Form Pelaporan Barang</Title>
          <FormGroup>
            <label>Nama Barang</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <label>Tanggal Penemuan</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <label>Deskripsi</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </FormGroup>

          <FormGroup>
            <label>Upload Gambar (Opsional)</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
            />
          </FormGroup>

          <FormGroup>
            <label>Lokasi</label>
            <select
              name="locations_id"
              value={formData.locations_id}
              onChange={handleChange}
              required
            >
              <option value="">-- Pilih Lokasi --</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </FormGroup>

          <FormGroup>
            <label>Kategori</label>
            <select
              name="categories_id"
              value={formData.categories_id}
              onChange={handleChange}
              required
            >
              <option value="">-- Pilih Kategori --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </FormGroup>

          <FormGroup>
            <label>Penyimpanan</label>
            <select
              name="storages_id"
              value={formData.storages_id}
              onChange={handleChange}
              required
            >
              <option value="">-- Pilih Penyimpanan --</option>
              {storages.map((stor) => (
                <option key={stor.id} value={stor.id}>
                  {stor.name}
                </option>
              ))}
            </select>
          </FormGroup>

          <input type="hidden" name="users_id" value={userId} />

          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Mengirim..." : "Kirim Laporan"}
          </SubmitButton>
          {message && <Message>{message}</Message>}
        </Form>
      </FormWrapper>
    </div>
  );
}
