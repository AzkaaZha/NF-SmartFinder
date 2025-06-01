import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation(); 
  const isActive = (path) => location.pathname === path;
  
  return (
    <header id="header" className="header d-flex align-items-center fixed-top" style={{backgroundColor: "#fff"}}>
      <div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
        {/* Ganti href index.html ke "/" agar react-router gak reload page */}
        <Link to="/" className="logo d-flex align-items-center me-auto me-xl-0">
          {/* Ganti src ke placeholder supaya image pasti muncul */}
          <img src="/assets/img/logo.png" alt="logo" />
        </Link>

        <nav id="navmenu" className="navmenu">
          <ul>
            <li>
              <Link to="/" className={isActive("/") ? "active" : ""}>
                Home
              </Link>
            </li>
            <li><a href="#about">About</a></li>
            <li className="dropdown">
              {/* Buat anchor dengan href="#" dan onClick preventDefault supaya gak reload */}
              <a href="#" onClick={e => e.preventDefault()}>
                <span>Features</span> <i className="bi bi-chevron-down toggle-dropdown"></i>
              </a>
              <ul>
                {/* Ganti Link to="" yang kosong ke "#" dulu */}
                <li><Link to="#">Lapor Barang Temuan</Link></li>
                <li><Link to="#">Lapor Barang Hilang</Link></li>
                <li><Link to="/lostitems" className={isActive("/lostitems") ? "active" : ""}>Cari Barang Hilang</Link></li>
              </ul>
            </li>
            <li>
              <Link to="/contact" className={isActive("/contact") ? "active" : ""}>
                Contact
              </Link>
            </li>
            <li>
              <Link to="/login" className="btn-getstarted">
                Login/Daftar
              </Link>
            </li>
          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>
      </div>
    </header>
  );
}

export default Header;