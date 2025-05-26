import { Link, useLocation } from "react-router-dom";

function Header() {
    const location = useLocation(); 
    const isActive = (path) => location.pathname === path;

    return(
        <header id="header" className="header d-flex align-items-center fixed-top">
            <div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">

            <a href="index.html" className="logo d-flex align-items-center me-auto me-xl-0">
                <img src="/assets/img/logo.png" alt="logo" />
            </a>

            <nav id="navmenu" className="navmenu">
                <ul>
                    <li>
                        <Link to="/" className={isActive("/") ? "active" : ""}>
                            Home
                        </Link>
                    </li>
                    <li><a href="#about">About</a></li>
                    <li className="dropdown"><a href="#"><span>Features</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                        <ul>
                            <li><Link to={""}>Lapor Barang Temuan</Link></li>
                            <li><Link to={""}>Lapor Barang Hilang</Link></li>
                            <li><Link to={""}>Cari Barang Hilang</Link></li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/contact" className={isActive("/contact") ? "active" : ""}>
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link to={"/login"} className="btn-getstarted" href="index.html#about" >Login/Daftar</Link>
                    </li>
                </ul>
                <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
            </nav>
            </div>
        </header>
    )
}

export default Header