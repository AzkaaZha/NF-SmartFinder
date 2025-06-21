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
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user?.id) {
      setFormData((prev) => ({ ...prev, users_id: user.id }));
    }

    const fetchItems = async () => {
      try {
        const [ItemData] = await Promise.all([getItems()]);
        setItems(ItemData);

        if (id) {
          const selectedItem = ItemData.find((item) => item.id === parseInt(id));
          if (selectedItem) {
            setFormData((prev) => ({
              ...prev,
              items_id: selectedItem.id,
              message: `Klaim untuk barang: ${selectedItem.name}`,
            }));
          }
        }
      } catch {
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
      if (key === "proof_image" && !value) return;
      form.append(key, value);
    });

    try {
      await createVerification(form);
      setMessage("Klaim berhasil diajukan.");
      setFormData({
        message: "",
        proof_image: null,
        items_id: "",
        users_id: formData.users_id,
      });
    } catch (err) {
      if (err.response?.data?.data) {
        const allMessages = Object.values(err.response.data.data).flat().join(", ");
        setMessage(`Validasi gagal: ${allMessages}`);
      } else {
        setMessage("Gagal mengajukan klaim.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper>
      <FormGroup>
        <Form onSubmit={handleSubmit}>
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
              {items.map((item) => (
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

          {message && <Message>{message}</Message>}
        </Form>
      </FormGroup>
    </FormWrapper>
  );
}
