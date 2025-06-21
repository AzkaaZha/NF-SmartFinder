import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLocationById, updateLocation } from "../../../../_services/locations";


export default function UpdateLocation() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocation = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getLocationById(id);
        setName(data?.name || "");
      } catch (err) {
        console.error(`Error fetching location with ID ${id}:`, err);
        setError(err.response?.data?.message || "Gagal mengambil data lokasi.");
      } finally {
        setLoading(false);
      }
    };
    fetchLocation();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Nama lokasi wajib diisi.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await updateLocation(id, { name });
      alert("Lokasi berhasil diubah!");
      navigate(-1);
    } catch (err) {
      console.error(`Error updating location with ID ${id}:`, err);
      setError(err.response?.data?.message || "Gagal mengubah lokasi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow mt-4">
            <div className="card-header">
              <h5 className="mb-0">Ubah Lokasi</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nama Lokasi</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError("");
                    }}
                    placeholder="Masukkan nama lokasi"
                    disabled={loading}
                  />
                  {error && <small className="text-danger">{error}</small>}
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate(-1)}
                    disabled={loading}
                  >
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
      </div>
    </div>
  );
}