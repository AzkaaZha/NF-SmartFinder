import styled from "styled-components";

const FooterWrapper = styled.footer`
  background-color: var(--background-color);
  color: var(--default-color);
  font-size: 14px;
  position: relative;
  padding-top: 50px;

  img {
    object-fit: contain;
  }

  .footer-top {
    padding-top: 50px;
  }

  .footer-links {
    margin-bottom: 30px;

    h4 {
      font-size: 16px;
      font-weight: bold;
      position: relative;
      padding-bottom: 12px;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        padding: 10px 0;
        display: flex;
        align-items: center;

        &:first-child {
          padding-top: 0;
        }

        a {
          color: color-mix(in srgb, var(--default-color), transparent 30%);
          display: inline-block;
          line-height: 1;
          text-decoration: none;

          &:hover {
            color: var(--accent-color);
          }
        }
      }
    }
  }

  .copyright {
    padding: 25px 0;
    border-top: 1px solid color-mix(in srgb, var(--default-color), transparent 90%);

    p {
      margin-bottom: 0;
    }
  }
`;

export default FooterWrapper;