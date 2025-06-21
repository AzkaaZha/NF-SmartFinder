import { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const statusBadgeStyle = (status) => {
  switch (status) {
    case "pending":
      return { backgroundColor: "#facc15", color: "#000", padding: "4px 8px", borderRadius: "4px",
        fontWeight: "600", };
    case "approved":
      return { backgroundColor: "#22c55e", color: "#fff", padding: "4px 8px", borderRadius: "4px",
        fontWeight: "600", };
    case "rejected":
      return { backgroundColor: "#ef4444", color: "#fff", padding: "4px 8px", borderRadius: "4px",
        fontWeight: "600", };
    default:
      return {};
  }
};

function LostItems() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("Semua");
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [itemsRes, categoriesRes, locationsRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/items"),
          axios.get("http://127.0.0.1:8000/api/categories"),
          axios.get("http://127.0.0.1:8000/api/locations"),
        ]);
        
        const categoriesData = categoriesRes.data.data;
        const locationsData = locationsRes.data.data;

        setCategories(categoriesData);
        setLocations(locationsData);

        const itemsMapped = itemsRes.data.data.map((item) => {
          const category = categoriesData.find((c) => c.id === item.categories_id);
          const location = locationsData.find((l) => l.id === item.locations_id);
          return {
            ...item,
            categoryName: category ? category.name : "Unknown",
            locationName: location ? location.name : "Unknown",
          };
        });

        setItems(itemsMapped);
        setFilteredItems(itemsMapped);
        setLoading(false);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  useEffect(() => {
    const filtered = items.filter(
      (item) =>
        (filterCategory === "Semua" || item.categoryName === filterCategory) &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchQuery, filterCategory, items]);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date)) return "-";
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      <div className="container py-5" style={{ marginTop: "100px" }}>
        {/* Search & Filter */}
        <div className="d-flex gap-2 mb-4" style={{ flexWrap: "nowrap" }}>
          <Form.Control
            className="flex-grow-1"
            type="text"
            placeholder="Cari barang hilang..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Form.Select
            style={{ maxWidth: 200, minWidth: 150 }}
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="Semua">Semua Kategori</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </Form.Select>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Memuat data barang hilang...</p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div className="col-12 col-md-6" key={item.id}>
                  <div className="card h-100 d-flex flex-row shadow-sm">
                    {/* Gambar */}
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: "200px",
                        height: "200px",
                        overflow: "hidden",
                        flexShrink: 0,
                        borderTopLeftRadius: "0.5rem",
                        borderBottomLeftRadius: "0.5rem",
                        backgroundColor: "#f8f9fa",
                      }}
                    >
                      <img
                        src={item.img_url}
                        alt={item.name}
                  
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    {/* Konten */}
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="card-title mb-2 fw-semibold" style={{ color: "#27227d" }}>
                          {item.name}
                        </h5>
                        <p className="mb-1">
                          <strong>Deskripsi:</strong>{" "}
                          <span
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {item.description}
                          </span>
                        </p>
                        <p className="mb-1">
                          <strong>Ditemukan di:</strong> {item.locationName}
                        </p>
                        <p className="mb-0">
                          <strong>Tanggal Ditemukan:</strong> {formatDate(item.date)}
                        </p>
                      </div>
                      <div className="text-end mt-3">
                        <Button
                          variant="primary"
                          onClick={() => {
                            setSelectedItem(item);
                            setShowModal(true);
                          }}
                          style={{
                            color: "#27227d",
                            backgroundColor: "#f59e0b",
                            borderColor: "#f59e0b",
                          }}
                        >
                          Detail
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center mt-5">
                <p>Tidak ada barang ditemukan sesuai pencarian atau filter.</p>
              </div>
            )}
          </div>
        )}

        {/* Modal Detail */}
        {selectedItem && (
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{selectedItem.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                src={selectedItem.img_url || "/assets/img/placeholder.jpg"}
                alt={selectedItem.name}
                className="img-fluid mb-3"
                style={{ objectFit: "cover", maxHeight: "300px", width: "100%" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assets/img/placeholder.jpg";
                }}
              />
              <p>
                <strong>Status: </strong>
                <span style={statusBadgeStyle(selectedItem.status)}>
                  {selectedItem.status.charAt(0).toUpperCase() + selectedItem.status.slice(1)}
                </span>
              </p>
              <p><strong>Kategori:</strong> {selectedItem.categoryName}</p>
              <p><strong>Deskripsi:</strong> {selectedItem.description}</p>
              <p><strong>Lokasi Ditemukan:</strong> {selectedItem.locationName}</p>
              <p><strong>Tanggal Ditemukan:</strong> {formatDate(selectedItem.date)}</p>
            </Modal.Body>
            <Modal.Footer>
              <Link
                to={`/klaim/${selectedItem.id}`}
                className="btn"
                style={{ backgroundColor: "#f59e0b", color: "#27227d" }}
              >
                Klaim Barang
              </Link>
              <Button variant="secondary" onClick={handleCloseModal}>
                Tutup
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default LostItems;
