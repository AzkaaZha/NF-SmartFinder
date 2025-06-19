import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FormWrapper,
  Form,
  Title,
  FormGroup,
  SubmitButton,
  Message,
} from "./KlaimItem.styled";
import { getItems } from "../../../_services/Items";
import { createVerification } from "../../../_services/verifications";

export default function KlaimItem() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    message: "",
    proof_image: null,
    items_id: id || "",
    users_id: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const userIdFromStorage = currentUser ? currentUser.id : "";

    setFormData((prev) => ({
      ...prev,
      users_id: userIdFromStorage,
    }));

    const fetchItems = async () => {
      try {
        const [ItemData] = await Promise.all([getItems()]);
        setItems(ItemData);
        if (id) {
          const selectedItem = ItemData.find(
            (item) => item.id === parseInt(id)
          );
          if (selectedItem) {
            setFormData((prev) => ({
              ...prev,
              items_id: selectedItem.id,
              message: `Klaim untuk barang: ${selectedItem.name}`,
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching items:", error);
        setMessage("Gagal memuat daftar item.");
      }
    };

    fetchItems();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  const form = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    if (value) form.append(key, value);
  });
// Pastikan ini nama token yang benar

  try {
    await createVerification(form);
    setMessage("Klaim berhasil diajukan.");
    setFormData({
      message: "",
      proof_image: null,
      items_id: "",
      users_id: formData.users_id, // tetap simpan user ID
    });
  } catch (err) {
    console.error("Gagal membuat verifikasi:", err);
    setMessage("Gagal mengajukan klaim. Pastikan semua data sudah benar.");
  } finally {
    setLoading(false);
  }
};


  return (
    <FormWrapper>
      <FormGroup className="form-wrapper">
        <Form onSubmit={handleSubmit} className="klaim-item-form">
          <Title>Klaim Barang Hilang</Title>

          <FormGroup>
            <label>Pesan</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              required
            />
          </FormGroup>

          <FormGroup>
            <label>Bukti Gambar (Opsional)</label>
            <input
              type="file"
              name="proof_image"
              onChange={handleChange}
              accept="image/*"
            />
          </FormGroup>

          <FormGroup>
            <label>Item yang Dituju</label>
            <select
              name="items_id"
              value={formData.items_id}
              onChange={handleChange}
              required
            >
              <option value="">-- Pilih Item --</option>
              {Array.isArray(items) &&
                items.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </FormGroup>

          <input type="hidden" name="users_id" value={formData.users_id} />

          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Mengajukan..." : "Ajukan Klaim"}
          </SubmitButton>

          {message && <Message className="message">{message}</Message>}
        </Form>
      </FormGroup>
    </FormWrapper>
  );
}
