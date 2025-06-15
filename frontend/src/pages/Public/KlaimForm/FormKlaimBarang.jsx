import React, { useState } from "react";
import {
  FormWrapper,
  Form,
  Title,
  FormGroup,
  SubmitButton,
} from "./FormKlaimBarang.styled";

export default function FormKlaimBarang() {
  const [form, setForm] = useState({
    nama: "",
    telepon: "",
    deskripsi: "",
    lokasi: "",
    tanggal: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data klaim dikirim:", form);
  };

  return (
    <div>
      <FormWrapper>
        <Title>Form Klaim Barang</Title>
        <Form onSubmit={handleSubmit}>
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

          <SubmitButton type="submit">Kirim Klaim</SubmitButton>
        </Form>
      </FormWrapper>
    </div>
  );
}
