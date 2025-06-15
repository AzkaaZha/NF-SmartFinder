import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './KlaimItem.css'

export default function KlaimItem({ userId, token }) {
    const { id } = useParams(); // Mengambil ID dari URL
    const [formData, setFormData] = useState({
        message: '',
        proof_image: null,
        items_id: id || '', // Mengisi items_id dengan ID dari URL
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/items', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setItems(res.data.data);
                if (id) {
                    const selectedItem = res.data.data.find(item => item.id === parseInt(id));
                    if (selectedItem) {
                        setFormData(prev => ({
                            ...prev,
                            items_id: selectedItem.id,
                            message: `Klaim untuk barang: ${selectedItem.name}` // Mengisi pesan default
                        }));
                    }
                }
            } catch (error) {
                console.error('Error fetching items:', error);
                setMessage('Gagal memuat daftar item.');
            }
        };

        fetchItems();
    }, [token, id]);

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
            const res = await axios.post('http://localhost:8000/api/verifications', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage('Klaim berhasil diajukan.');
            setFormData({ message: '', proof_image: null, items_id: '' });
        } catch (err) {
            console.error('Error response:', err.response);
            setMessage('Gagal mengajukan klaim. Pastikan semua data sudah benar.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="form-wrapper">
                <form onSubmit={handleSubmit} className="klaim-item-form">
                    <h2>Klaim Barang Hilang</h2>

                    <div className="form-group">
                        <label>Pesan</label>
                        <textarea name="message" value={formData.message} onChange={handleChange} rows="4" required />
                    </div>

                    <div className="form-group">
                        <label>Bukti Gambar (Opsional)</label>
                        <input type="file" name="proof_image" onChange={handleChange} accept="image/*" />
                    </div>

                    <div className="form-group">
                        <label>Item yang Dituju</label>
                        <select name="items_id" value={formData.items_id} onChange={handleChange} required>
                            <option value="">-- Pilih Item --</option>
                            {Array.isArray(items) && items.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Mengajukan...' : 'Ajukan Klaim'}
                    </button>

                    {message && <p className="message">{message}</p>}
                </form>
            </div>
        </div>
    );
}
