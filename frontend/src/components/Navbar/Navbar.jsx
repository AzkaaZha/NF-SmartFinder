import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  HeaderContainer,
  HeaderWrapper,
  LogoLink,
  LogoImg,
  NavMenu,
  NavList,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  LogoutButton,
} from "./Navbar.styled";

function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userName, setUserName] = useState(null);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("userInfo");
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");
    window.location.reload(); 
  };

  return (
    <HeaderWrapper>
      <HeaderContainer isScrolled={isScrolled}>
        <LogoLink to="/">
          <LogoImg src="/assets/img/logo.png" alt="logo" />
        </LogoLink>
        <button
        className="mobile-nav-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
        <i className="bi bi-list"></i>
      </button>

        <NavMenu>
          <NavList $isOpen={isMobileMenuOpen}>
            <NavItem>
              <NavLink $active={isActive("/")} to="/">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink as="a" href="#about">
                About
              </NavLink>
            </NavItem>
            <Dropdown>
              <DropdownToggle href="#" onClick={(e) => e.preventDefault()}>
                Features <i className="bi bi-chevron-down toggle-dropdown" />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <NavLink to="/form">Lapor Barang Temuan</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink $active={isActive("/lostitems")} to="/lostitems">
                    Daftar Barang Hilang
                  </NavLink>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <NavItem>
              <NavLink $active={isActive("/contact")} to="/contact">
                Contact
              </NavLink>
            </NavItem>

            {!userName ? (
              <NavItem>
                <NavLink to="/login">
                  Login/Daftar
                </NavLink>
              </NavItem>
            ) : (
              <Dropdown style={{ position: "relative" }}>
                <DropdownToggle href="#" onClick={(e) => e.preventDefault()} $user>
                  <i className="bi bi-person-circle" />
                  {userName}
                  <i className="bi bi-chevron-down" />
                </DropdownToggle>
                <DropdownMenu $user>
                  <DropdownItem>
                    <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          </NavList>
        </NavMenu>
      </HeaderContainer>
    </HeaderWrapper>
  );
}

export default Navbar;
