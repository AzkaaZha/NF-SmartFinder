// src/pages/Home/home.styled.js
import styled from "styled-components";

export const AboutSection = styled.section`
  .about-meta {
    color: #27227d;
    font-weight: 600;
    margin-bottom: 1rem;
    display: inline-block;
  }

  .about-title {
    font-size: 1.75rem;
    margin-bottom: 1rem;
    line-height: 1.2;
    font-weight: 700;

    @media (max-width: 992px) {
      font-size: 2rem;
    }
  }

  .about-description {
    margin-bottom: 2rem;
    color: color-mix(in srgb, var(--default-color), transparent 20%);
  }

  .image-wrapper {
    position: relative;

    @media (max-width: 992px) {
      padding-left: 0;
      margin-top: 3rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .images {
      @media (max-width: 992px) {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
    }
  }
`;

export const FeaturesSection = styled.section`
  background-color: #f7f9fc;

  .nav-tabs {
    border: 0;
    background-color: color-mix(in srgb, var(--default-color), transparent 96%);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    padding: 6px;
    width: auto;
  }

  .nav-item {
    margin: 0;
    padding: 0 5px 0 0;

    &:last-child {
      padding-right: 0;
    }
  }

  .nav-link {
    background-color: none;
    color: var(--heading-color);
    padding: 10px 30px;
    transition: 0.3s;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    height: 100%;
    border: 0;
    margin: 0;

    @media (max-width: 468px) {
      padding: 8px 20px;
    }

    i {
      padding-right: 15px;
      font-size: 48px;
    }

    h4 {
      font-size: 14px;
      font-weight: 500;
      margin: 0;
    }

    &:hover {
      border-color: color-mix(in srgb, var(--default-color), transparent 80%);
      h4 {
        color: var(--accent-color);
      }
    }

    &.active {
      background-color: var(--accent-color);
      border-color: var(--accent-color);

      h4 {
        color: var(--contrast-color);
      }
    }
  }

  .tab-content {
    margin-top: 30px;
  }

  .tab-pane {
    h3 {
      color: var(--heading-color);
      font-weight: 700;
      font-size: 32px;
      position: relative;
      margin-bottom: 20px;
      padding-bottom: 20px;

      &::after {
        content: "";
        position: absolute;
        display: block;
        width: 60px;
        height: 3px;
        background: var(--accent-color);
        left: 0;
        bottom: 0;
      }
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        padding-top: 10px;

        i {
          font-size: 20px;
          padding-right: 4px;
          color: var(--accent-color);
        }
      }
    }

    p:last-child {
      margin-bottom: 0;
    }
  }
`;
