import React, { useState } from "react";
import Header from "../layout/header";
import Footer from "../layout/footer";
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
            <Header />
            <div className="form-wrapper">
                <h2>Form Klaim Barang</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nama</label>
                        <input type="text" name="nama" value={form.nama} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Nomor Telepon</label>
                        <input type="tel" name="telepon" value={form.telepon} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Deskripsi Barang</label>
                        <textarea name="deskripsi" value={form.deskripsi} onChange={handleChange} rows={3} required />
                    </div>

                    <div className="form-group">
                        <label>Lokasi Kehilangan</label>
                        <input type="text" name="lokasi" value={form.lokasi} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Tanggal Kehilangan</label>
                        <input type="date" name="tanggal" value={form.tanggal} onChange={handleChange} required />
                    </div>

                    <button type="submit" className="submit-btn">
                        Kirim Klaim
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
}
