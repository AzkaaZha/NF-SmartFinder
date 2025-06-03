import { Link, useLocation } from "react-router-dom";
import {
  Header,
  HeaderContainer,
  Logo,
  NavMenu,
  GetStartedButton,
  MobileNavToggle
} from "./Navbar.styled";

function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <Header>
      <HeaderContainer>
        <Logo href="index.html">
          <img src="/assets/img/logo.png" alt="logo" />
        </Logo>

        <NavMenu>
          <ul>
            <li>
              <Link to="/" className={isActive("/") ? "active" : ""}>
                Home
              </Link>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li className="dropdown">
              <a href="#">
                <span>Features</span>{" "}
                <i className="bi bi-chevron-down toggle-dropdown"></i>
              </a>
              <ul>
                <li>
                  <Link to="">Lapor Barang Temuan</Link>
                </li>
                <li>
                  <Link to="">Lapor Barang Hilang</Link>
                </li>
                <li>
                  <Link to="">Cari Barang Hilang</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/contact" className={isActive("/contact") ? "active" : ""}>
                Contact
              </Link>
            </li>
            <li>
              <GetStartedButton as={Link} to="/login">
                Login/Daftar
              </GetStartedButton>
            </li>
          </ul>
          <MobileNavToggle className="bi bi-list" />
        </NavMenu>
      </HeaderContainer>
    </Header>
  );
}

export default Navbar;
