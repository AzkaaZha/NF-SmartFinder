import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";  

function Header() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload(); // atau navigate("/") kalau pakai useNavigate
  };
  
  return (
    <header id="header" className="header d-flex align-items-center fixed-top">
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
                <li><Link to="/form">Lapor Barang Temuan</Link></li>
                <li><Link to="/lostitems" className={isActive("/lostitems") ? "active" : ""}>Daftar Barang Hilang</Link></li>
              </ul>
            </li>
            <li>
              <Link to="/contact" className={isActive("/contact") ? "active" : ""}>
                Contact
              </Link>
            </li>
            {!userName ? (
            <li>
              <Link to="/login" className="btn-getstarted">Login/Daftar</Link>
            </li>
            ) : (
            <li className="dropdown" style={{ position: "relative", listStyle: "none" }}>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#333",
                  textDecoration: "none",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                <i className="bi bi-person-circle" style={{ fontSize: "1.2rem" }}></i>
                {userName}
                <i className="bi bi-chevron-down" style={{ fontSize: "0.9rem" }}></i>
              </a>

              <ul
                style={{
                  position: "absolute",
                  top: "120%",
                  right: 0,
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  borderRadius: "6px",
                  padding: "8px 0",
                  minWidth: "140px",
                  zIndex: 1000,
                }}
              >
                <li style={{ padding: "0 16px" }}>
                  <button
                    onClick={handleLogout}
                    style={{
                      width: "100%",
                      padding: "8px",
                      backgroundColor: "transparent",
                      border: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      color: "#333",
                      fontSize: "14px",
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;