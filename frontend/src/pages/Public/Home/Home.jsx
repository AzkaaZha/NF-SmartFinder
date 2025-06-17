import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  AboutSection,
  FeaturesSection,
  LostItemsSection,
  SectionTitle,
  ButtonWrapper,
  CardWrapper,
} from "./Home.styled";
import Container from "../../../components/ui/Container";
import Button  from "../../../components/ui/Button/Button";
import Hero from "../../../components/Hero/Hero";

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

function Home() {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/items")
      .then((response) => {
        setItems(Array.isArray(response.data.data) ? response.data.data : []);
      })
      .catch((error) => {
        console.error("Gagal mengambil data:", error);
      })
      .finally(() => setLoading(false));
  }, []);

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
      <main className="main">
        <Hero />

        {/* About Section */}
        <AboutSection id="about">
          <Container>
            <div className="row mt-5 gy-4 align-items-center justify-content-between">
              <div className="col-xl-5">
                <span className="about-meta">ABOUT</span>
                <h2 className="about-title">Tentang NF SmartFinder</h2>
                <p className="about-description">
                  NF SmartFinder adalah platform pelaporan barang hilang dan temuan yang dibuat khusus untuk civitas akademika STT Terpadu Nurul Fikri.
                  Aplikasi ini membantu mahasiswa, dosen, dan staf untuk melaporkan atau mencari barang yang hilang atau ditemukan di lingkungan kampus.
                </p>
              </div>
              <div className="col-xl-6">
                <div className="image-wrapper">
                  <div className="images position-relative">
                    <img
                      src="assets/img/about.jpg"
                      alt="Business Meeting"
                      className="img-fluid main-image rounded-4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </AboutSection>

        {/* Features Section */}
        <FeaturesSection>
          <Container>
            <SectionTitle>
              <h2>Fitur Unggulan</h2>
              <p>
                Beragam fitur yang mempermudah civitas akademika dalam melaporkan dan menemukan barang yang hilang di lingkungan kampus.
              </p>
            </SectionTitle>

            {/* Tab Navigation */}
            <div className="d-flex justify-content-center">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <Button
                    className="nav-link active"
                    data-bs-toggle="tab"
                    data-bs-target="#features-tab-1"
                    type="button"
                  >
                    Lapor Barang Temuan
                  </Button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link"
                    data-bs-toggle="tab"
                    data-bs-target="#features-tab-2"
                    type="button"
                  >
                    Cari Barang Hilang
                  </button>
                </li>
              </ul>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {/* Tab 1 */}
              <div className="tab-pane fade active show" id="features-tab-1">
                <div className="row">
                  <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                    <h3>Lapor Barang Temuan</h3>
                    <p className="fst-italic">
                      Pengguna dapat melaporkan barang yang ditemukan di lingkungan kampus agar pemiliknya dapat dengan mudah menemukannya kembali.
                    </p>
                    <ul>
                      <li><i className="bi bi-check2-all"></i> <span>Upload foto dan deskripsi barang yang ditemukan.</span></li>
                      <li><i className="bi bi-check2-all"></i> <span>Barang diserahkan ke pos satpam untuk diamankan.</span></li>
                      <li><i className="bi bi-check2-all"></i> <span>Admin akan memverifikasi dan menampilkan barang di daftar temuan.</span></li>
                      <li><i className="bi bi-check2-all"></i> <span>Memudahkan pemilik barang untuk mengajukan klaim.</span></li>
                    </ul>
                    <ButtonWrapper>
                      <Button as={Link} to="/lostitems" variant="outline">
                        Buat Laporan
                      </Button>
                    </ButtonWrapper>
                  </div>
                  <div className="col-lg-6 order-1 order-lg-2 text-center">
                    <img
                      src="assets/img/features1.svg"
                      alt="Barang Ditemukan"
                      className="img-fluid w-75"
                    />
                  </div>
                </div>
              </div>

              {/* Tab 2 */}
              <div className="tab-pane fade" id="features-tab-2">
                <div className="row">
                  <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                    <h3>Cari Barang Hilang</h3>
                    <ul>
                      <li><i className="bi bi-check2-all"></i> <span>Pencarian barang hilang yang sudah dilaporkan pengguna lain.</span></li>
                      <li><i className="bi bi-check2-all"></i> <span>Filter berdasarkan nama barang, kategori, atau lokasi hilang.</span></li>
                      <li><i className="bi bi-check2-all"></i> <span>Temukan kecocokan dengan barang yang ditemukan oleh pengguna lain.</span></li>
                    </ul>
                    <p className="fst-italic">
                      Fitur pencarian membantu pengguna menemukan kembali barang miliknya yang telah dilaporkan hilang dengan mudah dan cepat.
                    </p>
                    <ButtonWrapper>
                      <Button as={Link} to="/lostitems" variant="outline">
                        Cari Barang
                      </Button>
                    </ButtonWrapper>
                  </div>
                  <div className="col-lg-6 order-1 order-lg-2 text-center">
                    <img
                      src="assets/img/features2.svg"
                      alt="Cari Barang"
                      className="img-fluid w-75"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </FeaturesSection>

       {/* Lost Items Section */}
        <LostItemsSection>
          <Container>
            <SectionTitle>
              <h2>Informasi Barang</h2>
              <p>Mencari barang dengan mudah untuk ditemukan.</p>
            </SectionTitle>

            <div className="row g-4">
              {loading ? (
                <div className="text-center mt-5">
                  <Spinner animation="border" variant="primary" />
                  <p className="mt-2">Memuat data barang hilang...</p>
                </div>
              ) : (
                items.slice(0, 4).map((item) => (
                  <CardWrapper key={item.id} className="col-12 col-md-6">
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
                            <strong>Lokasi:</strong> {item.locationName || "Tidak diketahui"}
                          </p>
                          <p className="mb-0">
                            <strong>Tanggal:</strong>{" "}
                            {item.date
                              ? new Date(item.date).toLocaleDateString("id-ID", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })
                              : "-"}
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
                  </CardWrapper>
                ))
              )}
            </div>

            <div className="text-center mt-4">
              <Button as={Link} to="/lostitems" variant="outline">
                Lihat Semua...
              </Button>
            </div>
          </Container>
        </LostItemsSection>

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
      </main>
    </div>
  );
}

export default Home;