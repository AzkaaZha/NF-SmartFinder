import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../layout/header';
import Footer from '../layout/footer';

export default function LostItemForm({ userId, userName }) {
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
    const [locations, setLocations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [storages, setStorages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [locRes, catRes, storRes] = await Promise.all([
                    axios.get('http://localhost:8000/api/locations'),
                    axios.get('http://localhost:8000/api/categories'),
                    axios.get('http://localhost:8000/api/storages'),
                ]);

                setLocations(locRes.data.data);
                setCategories(catRes.data.data);
                setStorages(storRes.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setMessage('Gagal memuat data dropdown.');
            }
        };

        fetchData();
    }, []);

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
            await axios.post('http://localhost:8000/api/items', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            setMessage('Laporan berhasil dikirim.');
            setFormData({
                name: '',
                date: '',
                description: '',
                image: null,
                locations_id: '',
                categories_id: '',
                storages_id: '',
                users_id: userId,
            });
        } catch (err) {
            console.error('Error response:', err.response);
            setMessage('Gagal mengirim laporan. Pastikan semua data sudah benar.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Header />
            <div className="form-wrapper">
                <form onSubmit={handleSubmit} className="lost-item-form">
                    <h2>Form Pelaporan Barang</h2>

                    {/* Tampilkan info user sebagai teks */}
                    {/* <p><strong>Pelapor:</strong> {userName}</p> */}

                    <div className="form-group">
                        <label>Nama Barang</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Tanggal Penemuan</label>
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

                    {/* Hidden input untuk users_id */}
                    <input type="hidden" name="users_id" value={userId} />

                    <button type="submit" disabled={loading}>
                        {loading ? 'Mengirim...' : 'Kirim Laporan'}
                    </button>

                    {message && <p className="message">{message}</p>}
                </form>
            </div>
            <Footer />
        </div>
    );
}
