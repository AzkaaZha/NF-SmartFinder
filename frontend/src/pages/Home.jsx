import header from "../layout/header";
import hero from "../layout/hero";
import footer from "../layout/footer";
function Home() {
  return (
    <div>
      <header>{header()}</header>

      <main className="main">
        {hero()}

        {/* About Section */}
        <section id="about" className="about section">
          <div className="container">
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
          </div> 
        </section>
        {/* End About Section */}

        {/* Features Section */}
        <section id="features" className="features section">
          <div className="container section-title">
            <h2>Fitur Unggulan</h2>
            <p>Beragam fitur yang mempermudah civitas akademika dalam melaporkan dan menemukan barang yang hilang di lingkungan kampus.</p>
          </div>

          <div className="container">
            <div className="d-flex justify-content-center">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#features-tab-1" type="button">
                    Lapor Barang Hilang
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link" data-bs-toggle="tab" data-bs-target="#features-tab-2" type="button">
                    Lapor Barang Temuan
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link" data-bs-toggle="tab" data-bs-target="#features-tab-3" type="button">
                    Cari Barang Hilang
                  </button>
                </li>
              </ul>
            </div>

            <div className="tab-content">
              <div className="tab-pane fade active show" id="features-tab-1">
                <div className="row">
                  <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                    <h3>Lapor Barang Hilang</h3>
                    <p className="fst-italic">
                      Mahasiswa, dosen, atau staf dapat melaporkan barang yang hilang secara cepat dan mudah.
                    </p>
                    <ul>
                      <li><i className="bi bi-check2-all"></i> <span>Isi data barang secara lengkap dan detail.</span></li>
                      <li><i className="bi bi-check2-all"></i> <span>Upload gambar untuk mempermudah pencarian.</span></li>
                      <li><i className="bi bi-check2-all"></i> <span>Laporan akan ditinjau oleh admin sebelum ditampilkan.</span></li><br />

                      <div className="hero-buttons">
                          <a href="#lapor" className="btn btn-primary me-0 me-sm-2 mx-1">Buat Laporan</a>
                      </div>
                    </ul>
                  </div>
                  <div className="col-lg-6 order-1 order-lg-2 text-center">
                    <img src="assets/img/features-illustration-1.webp" alt="Laporan Hilang" className="img-fluid"/>
                  </div>
                </div>
              </div>

              <div className="tab-pane fade" id="features-tab-2">
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
                          <a href="#lapor" className="btn btn-primary me-0 me-sm-2 mx-1">Buat Laporan</a>
                      </div>
                    </ul>
                  </div>
                  <div className="col-lg-6 order-1 order-lg-2 text-center">
                    <img src="assets/img/features-illustration-2.webp" alt="Barang Ditemukan" className="img-fluid"/>
                  </div>
                </div>
              </div>

              <div className="tab-pane fade" id="features-tab-3">
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
                          <a href="#lapor" className="btn btn-primary me-0 me-sm-2 mx-1">Cari Barang</a>
                      </div>
                  </div>
                  <div className="col-lg-6 order-1 order-lg-2 text-center">
                    <img src="assets/img/features-illustration-3.webp" alt="Cari Barang" className="img-fluid"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Features Section */}

      </main>

      <footer>{footer()}</footer>
    </div>
  );
}

export default Home;
