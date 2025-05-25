function footer() {
  return (
    <footer id="footer" className="footer bg-light text-dark pt-5 pb-4">
      <div className="container footer-top">
        <div className="row gy-4">
           <div className="col-lg-4">
            <img src="/assets/img/logo.png" alt="NF SmartFinder Logo" style={{ maxWidth: "180px", height: "auto", marginBottom: "15px" }} />
            <p>
              NF SmartFinder adalah aplikasi yang membantu pengguna menemukan kembali barang yang hilang dengan mudah dan cepat. Kami berkomitmen untuk menyediakan layanan yang aman, efisien, dan mudah digunakan.
            </p>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Menu</h4>
            <ul>
              <li><a href="#">Beranda</a></li>
              <li><a href="#">Tentang Kami</a></li>
              <li><a href="#">Fitur</a></li>
              <li><a href="#">Kontak</a></li>
            </ul>
          </div>

          {/* Fitur Aplikasi */}
          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Fitur</h4>
            <ul>
              <li><a href="#">Laporkan Barang</a></li>
              <li><a href="#">Cari Barang Hilang</a></li>
              <li><a href="#">Notifikasi Temuan</a></li>
            </ul>
          </div>

          {/* Bantuan */}
          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Bantuan</h4>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Syarat & Ketentuan</a></li>
              <li><a href="#">Kebijakan Privasi</a></li>
              <li><a href="#">Dukungan</a></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Hak Cipta */}
      <div className="container text-center mt-4">
        <p>© <span>2025</span> <strong className="px-1 sitename">NF SmartFinder</strong> | All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default footer;
