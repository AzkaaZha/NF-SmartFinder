import { useState } from 'react';
import axios from 'axios';
import 'frontend\public\assets\lost-item-form.css';

export default function LostItemForm({ locations, categories, storages, userId }) {
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        description: '',
        image: null,
        locations_id: '',
        categories_id: '',
        storages_id: '',
        users_id: userId,
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

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
        setMessage('');

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (formData[key]) {
                data.append(key, formData[key]);
            }
        });

        try {
            const res = await axios.post('http://localhost:8000/api/items', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage('Laporan berhasil dikirim.');
            setFormData({ ...formData, name: '', date: '', description: '', image: null });
        } catch (err) {
            setMessage('Gagal mengirim laporan.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="lost-item-form">
            <h2>Form Kehilangan Barang</h2>

            <div className="form-group">
                <label>Nama Barang</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label>Tanggal Hilang</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label>Deskripsi</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required />
            </div>

            <div className="form-group">
                <label>Upload Gambar (Opsional)</label>
                <input type="file" name="image" onChange={handleChange} accept="image/*" />
            </div>

            <div className="form-group">
                <label>Lokasi</label>
                <select name="locations_id" value={formData.locations_id} onChange={handleChange} required>
                    <option value="">-- Pilih Lokasi --</option>
                    {locations.map(loc => (
                        <option key={loc.id} value={loc.id}>{loc.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Kategori</label>
                <select name="categories_id" value={formData.categories_id} onChange={handleChange} required>
                    <option value="">-- Pilih Kategori --</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Penyimpanan</label>
                <select name="storages_id" value={formData.storages_id} onChange={handleChange} required>
                    <option value="">-- Pilih Penyimpanan --</option>
                    {storages.map(stor => (
                        <option key={stor.id} value={stor.id}>{stor.name}</option>
                    ))}
                </select>
            </div>

            <input type="hidden" name="users_id" value={formData.users_id} />

            <button type="submit" disabled={loading}>
                {loading ? 'Mengirim...' : 'Kirim Laporan'}
            </button>

            {message && <p className="message">{message}</p>}
        </form>
    );
}
