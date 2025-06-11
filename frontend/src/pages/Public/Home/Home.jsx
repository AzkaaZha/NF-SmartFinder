import Hero from "../../../components/Hero/Hero";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AboutSection, FeaturesSection } from "./Home.styled";
import Container from "../../../components/ui/Container";
import Button from "../../../components/ui/Button/Button";

function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/items")
      .then((response) => {
        setItems(Array.isArray(response.data.data) ? response.data.data : []);
      })
      .catch((error) => {
        console.error("Gagal mengambil data:", error);
      });
  }, []);

  return (
    <div>
      <main className="main">
        <Hero />

        {/* About Section */}
        <AboutSection id="about" className="about section">
          <Container>
            <div className="row gy-4 align-items-center justify-content-between">
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
                    <img src="assets/img/about.jpg" alt="Business Meeting" className="img-fluid main-image rounded-4" />
                  </div>
                </div>
              </div>  
            </div>
          </Container> 
        </AboutSection>
        {/* End About Section */}

        {/* Features Section */}
        <FeaturesSection id="features" className="features section">
          <Container className="section-title">
            <h2>Fitur Unggulan</h2>
            <p>Beragam fitur yang mempermudah civitas akademika dalam melaporkan dan menemukan barang yang hilang di lingkungan kampus.</p>
          </Container>

          <Container>
            <div className="d-flex justify-content-center">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#features-tab-1" type="button">
                    Lapor Barang Temuan
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link" data-bs-toggle="tab" data-bs-target="#features-tab-2" type="button">
                    Cari Barang Hilang
                  </button>
                </li>
              </ul>
            </div>

            <div className="tab-content">
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
                      <li><i className="bi bi-check2-all"></i> <span>Memudahkan pemilik barang untuk mengajukan klaim.</span></li> <br />

                      <div className="hero-buttons">
                          <Button as={Link} to="/lostitems" variant="outline">
                            Buat Laporan
                          </Button>
                      </div>
                    </ul>
                  </div>
                  <div className="col-lg-6 order-1 order-lg-2 text-center">
                    <img src="assets/img/features-illustration-2.webp" alt="Barang Ditemukan" className="img-fluid"/>
                  </div>
                </div>
              </div>

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
                    </p><br />

                    <div className="hero-buttons">
                        <Button as={Link} to="/lostitems" variant="outline">
                          Cari Barang
                        </Button>
                      </div>
                  </div>
                  <div className="col-lg-6 order-1 order-lg-2 text-center">
                    <img src="assets/img/features-illustration-3.webp" alt="Cari Barang" className="img-fluid"/>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </FeaturesSection>
        {/* End Features Section */}

        {/* Lost Items Section */}
        <section className="lost-items-section py-5">
          <Container>             
            <div className="section-title text-center mb-4">
              <h2>Informasi Barang</h2>
              <p>Mencari barang dengan mudah untuk ditemukan.</p>
            </div>

            <div className="row g-4">
              {items.slice(0, 4).map((item) => (
                <div key={item.id} className="col-12 col-md-6">
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
                          {item.date ? new Date(item.date).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }) : "-"}
                        </p>
                      </div>
                      <div className="text-end mt-3">
                        <Button
                          as="a"
                          href={`/barang-hilang#item-${item.id}`}
                          style={{ padding: "0.25rem 0.75rem", fontSize: "0.875rem" }}
                        >
                          Detail
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-4">
              <Button as={Link} to="/lostitems" variant="outline">
                Lihat Semua...
              </Button>
            </div>
          </Container>
        </section>
        {/* End Lost Items Section */}


      </main>
    </div>
  );
}

export default Home;
