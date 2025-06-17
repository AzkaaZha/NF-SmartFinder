import styled from "styled-components";

export const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.lightBackground};
  color: ${({ theme }) => theme.colors.default};
  font-size: 14px;
  padding-top: 50px;
  padding-bottom: 10px;
  position: relative;
`;

export const FooterTop = styled.div`
  padding-bottom: 20px;
`;

export const FooterRow = styled.div``;

export const FooterCol = styled.div`
  p {
    font-size: 14px;
    margin-top: 10px;
  }
`;

export const Logo = styled.img`
  max-width: 180px;
  height: auto;
  margin-bottom: 15px;
`;

export const Description = styled.p`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.default};
`;

export const SectionTitle = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
`;

export const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin: 8px 0;
    a {
      color: ${({ theme }) => theme.colors.nav};
      text-decoration: none;
      transition: color 0.3s;

      &:hover {
        color: ${({ theme }) => theme.colors.navHover};
      }
    }
  }
`;

export const Copyright = styled.div`
  padding-top: 10px;
  border-top: 1px solid ${({ theme }) => theme.colors.navDropdownHover};
  font-size: 13px;
`;
