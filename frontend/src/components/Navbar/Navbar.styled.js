import styled from "styled-components";
import {Link} from "react-router-dom";

export const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 997;
  padding: 20px 0;
  color: ${({ theme }) => theme.colors.default};

  @media (max-width: 1200px) {
    padding-top: 10px;
  }
`;

export const HeaderContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 5px 25px;
  background-color: ${({ isScrolled, theme }) =>
    isScrolled ? "rgba(255, 255, 255, 0.7)" : theme.colors.surface}; 
  border-radius: 50px;
  box-shadow: ${({ isScrolled }) => (isScrolled ? "none" : "0 2px 15px rgba(0, 0, 0, 0.1)")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  .mobile-nav-toggle {
    display: none;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 999;  
    
    @media (max-width: 1199px) {
      display: block;
      position: absolute;
      right: 20px;
      top: 15px;
      font-size: 30px;  
      color: ${({ theme }) => theme.colors.default};
      transition: all 0.3s ease;
    }

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }

    &.active i {
      transform: rotate(90deg);  
    }
  }
`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  padding-left: 5px;
  flex-shrink: 0;

  @media (max-width: 1200px) {
    order: 1;
  }
`;

export const LogoImg = styled.img`
  max-height: 70px;
  margin-right: 8px;
`;


export const NavMenu = styled.nav`
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 1200px) {
    order: 3;
  }
`;

export const NavList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;

  @media (max-width: 1199px) {
    flex-direction: column;
    align-items: flex-start;
    background: ${({ theme }) => theme.colors.surface};
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 100;
    width: 100%;
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
    padding: 15px 25px;
    transition: transform 0.3s ease;  
  }
`;


export const NavItem = styled.li`
  position: relative;
  list-style: none;

  &:last-child a {
    padding-right: 0;
  }

  @media (max-width: 1199px) {
  }
`;

export const NavLink = styled(Link)`
  color: ${({ theme, $active }) =>
    $active ? "#f59e0b" : theme.colors.default};
  font-size: 16px;
  font-weight: 400;
  font-family: ${({ theme }) => theme.fonts.nav};
  padding: 18px 15px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  transition: color 0.3s;
  text-decoration: none;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const Dropdown = styled.li`
  position: relative;
  list-style: none;

  &:hover > ul {
    opacity: 1;
    top: 100%;
    visibility: visible;
  }

  @media (max-width: 1199px) {
    width: 100%;

  }
`;

export const DropdownToggle = styled.a`
  color: ${({ theme }) => theme.colors.default};
  font-size: 16px;
  font-weight: 400;
  font-family: ${({ theme }) => theme.fonts.nav};
  padding: 18px 15px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  text-decoration: none;

  i {
    font-size: ${({ $user }) => ($user ? "0.9rem" : "12px")};
    line-height: 0;
    transition: 0.3s;
    margin-left: ${({ $user }) => ($user ? "4px" : "5px")};
  }

  ${({ $user }) =>
    $user &&
    `
    font-weight: bold;
    color: #333;
    gap: 8px;

    i.bi-person-circle {
      font-size: 1.2rem;
    }
  `}

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.accent};
  }

`;

export const DropdownMenu = styled.ul`
  position: absolute;
  left: 14px;
  top: 130%;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 4px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  margin: 0;
  min-width: 200px;
  opacity: 0;
  visibility: hidden;

  ${({ $isOpen }) =>
    $isOpen &&
    `
      opacity: 1;
      visibility: visible;
      display: block;
    `}

  @media (max-width: 1199px) {
    position: static;
    display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
    opacity: 1;
    visibility: visible;
  }
`;

export const DropdownItem = styled.li`
  min-width: 200px;

  padding: 0;

  & > a {
    padding: 10px 20px;
    font-size: 15px;
    color: ${({ theme }) => theme.colors.default};
    text-transform: none;
    display: block;

    &:hover {
      color: #f59e0b;
    }
  }

  @media (max-width: 1199px) {
    min-width: auto;
  }
`;

export const LogoutButton = styled.button`
  width: 100%;
  padding: 8px 20px;
  background-color: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  color: #333;
  font-size: 14px;

  &:hover {
    color: #f59e0b;
  }
`;
