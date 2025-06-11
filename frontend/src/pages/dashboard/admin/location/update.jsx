import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateLocation() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const dummyLocations = [
      { id: 1, name: "Gedung A" },
      { id: 2, name: "Perpustakaan" },
      { id: 3, name: "Kantin" },
    ];
    const found = dummyLocations.find((loc) => String(loc.id) === id);
    if (found) setName(found.name);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Nama lokasi wajib diisi.");
      return;
    }
    alert(`Lokasi berhasil diubah!`);
    navigate(-1); 
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
                  />
                  {error && <small className="text-danger">{error}</small>}
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate(-1)}
                  >
                    Batal
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Simpan
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
