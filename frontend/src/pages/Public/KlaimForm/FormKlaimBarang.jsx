import React, { useState } from "react";
import {
  FormWrapper,
  Form,
  Title,
  FormGroup,
  SubmitButton,
  Message,
} from "./FormKlaimBarang.styled";
import { createVerification } from "../../../_services/verifications";

export default function FormKlaimBarang() {
  const [form, setForm] = useState({
    nama: "",
    telepon: "",
    deskripsi: "",
    lokasi: "",
    tanggal: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const dataToSend = {
      name: form.nama,
      phone: form.telepon,
      description: form.deskripsi,
      lost_location: form.lokasi,
      lost_date: form.tanggal,
      status: "pending", // default status klaim
    };

    try {
      await createVerification(dataToSend);
      setMessage("Klaim berhasil dikirim. Menunggu verifikasi.");
      setForm({
        nama: "",
        telepon: "",
        deskripsi: "",
        lokasi: "",
        tanggal: "",
      });
    } catch (error) {
      console.error("Gagal mengirim klaim:", error);
      setMessage("Gagal mengirim klaim. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <Title>Form Klaim Barang</Title>
          <FormGroup>
            <label>Nama</label>
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <label>Nomor Telepon</label>
            <input
              type="tel"
              name="telepon"
              value={form.telepon}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <label>Deskripsi Barang</label>
            <textarea
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
              rows={3}
              required
            />
          </FormGroup>

          <FormGroup>
            <label>Lokasi Kehilangan</label>
            <input
              type="text"
              name="lokasi"
              value={form.lokasi}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <label>Tanggal Kehilangan</label>
            <input
              type="date"
              name="tanggal"
              value={form.tanggal}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Mengirim..." : "Kirim Klaim"}
          </SubmitButton>

          {message && <Message>{message}</Message>}
        </Form>
      </FormWrapper>
    </div>
  );
}
