// Footer.styled.js
import styled from "styled-components";

export const FooterWrapper = styled.footer`
  background-color: #f7f9fc;
  color: var(--default-color);
  font-size: 14px;
  padding-top: 50px;
  padding-bottom: 25px;
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
  font-family: var(--heading-font);
  color: color-mix(in srgb, var(--default-color), transparent 20%);
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
      color: color-mix(in srgb, var(--default-color), transparent 30%);
      text-decoration: none;
      transition: color 0.3s;

      &:hover {
        color: var(--accent-color);
      }
    }
  }
`;

export const Copyright = styled.div`
  padding-top: 25px;
  border-top: 1px solid color-mix(in srgb, var(--default-color), transparent 90%);
  font-size: 13px;
`;
