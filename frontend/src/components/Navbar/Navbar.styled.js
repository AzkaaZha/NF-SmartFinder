import styled from "styled-components";


export const Header = styled.header`
  background-color: rgba(255, 255, 255, 0);
  transition: all 0.5s;
  z-index: 997;
  padding: 20px 0;
  align-items: center;
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  color:rgba(0, 0, 0, 0);

  @media (max-width: 1200px) {
    padding: 10px 0;
  }
`;

// Container di dalam header
export const HeaderContainer = styled.div`
  background: #ffffff;
  width: 100%;
  padding: 5 25px;
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 50px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);
  height: 80px;

  @media (max-width: 1200px) {
    margin-left: 10px;
    margin-right: 10px;
    padding: 10px 5px 10px 15px;
  }
`;

// Logo (dulu class="logo d-flex align-items-center me-auto me-xl-0")
export const Logo = styled.a`
  display: flex;
  align-items: center;
  padding-left: 5px;
  line-height: 1;
  img {
    max-height: 70px;
    margin-right: 8px;
  }

  @media (max-width: 1200px) {
    order: 1;
  }
`;

// Menu navigasi
export const NavMenu = styled.nav`
  ul {
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      position: relative;
      white-space: nowrap;
      padding: 10px 0 10px 28px;

      a {
        display: flex;
        align-items: center;
        color: #212529;;
        transition: 0.3s;
        font-size: 15px;
        font-weight: 500;
        position: relative;
        text-decoration: none;

        &.active,
        &:hover {
          color: #ffc107;
        }
      }

      &.dropdown {
        ul {
          display: none;
          position: absolute;
          top: 100%;
          left: 28px;
          background: #fff;
          padding: 10px 0;
          border-radius: 4px;
          box-shadow: 0px 0px 30px rgba(127, 137, 161, 0.25);
          z-index: 99;
          min-width: 200px;

          li {
            padding: 10px 20px;

            a {
              color: #212529;

              &:hover {
                color: #ffc107;
              }
            }
          }
        }

        &:hover ul {
          display: block;
        }
      }
    }
  }
`;

// Tombol login/daftar
export const GetStartedButton = styled.a`
  background: #27227d ;
  padding: 10px 10px;
  margin-left: 30px;
  border-radius: 50px;
  color: #;
  font-weight: 500;
  transition: 0.3s;
  text-decoration: none;

  &:hover {
    background: #e0a800;
    color: #212529;
  }
`;

// Toggle menu mobile
export const MobileNavToggle = styled.i`
  font-size: 24px;
  cursor: pointer;
  color: #fff;
  display: none;

  @media (max-width: 1200px) {
    display: block;
  }
`;
