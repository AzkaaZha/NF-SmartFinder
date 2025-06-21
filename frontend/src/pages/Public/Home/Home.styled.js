import styled from "styled-components";

// About Section
export const AboutSection = styled.section`
  padding: 40px 0;

  .about-meta {
    color: #27227d;
    font-weight: 600;
    margin-bottom: 1rem;
    display: inline-block;
  }

  .about-title {
    font-size: 2.25rem;
    margin-bottom: 1rem;
    line-height: 1.2;
    font-weight: 700;

    @media (max-width: 992px) {
      font-size: 2rem;
    }
  }

  .about-description {
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.colors.textSecondary || "#555"};
  }
`;

export const SectionTitle = styled.div`
  text-align: center;
  font-weight: 500;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-top: 1rem;

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.default};
  }

  p {
    max-width: 600px;
    margin: 0 auto;
    color: ${({ theme }) => theme.colors.textSecondary || "#666"};
  }
`;

// Features Section
export const FeaturesSection = styled.section`
  padding: 40px 0;
  background-color: #f7f9fc;

  .nav-tabs {
    margin-top: 30px;
    border: none;
    gap: 10px;
    flex-wrap: wrap;

    .nav-link {
      border-radius: 50px;
      background-color: ${({ theme }) => theme.colors.surface};
      border: 1px solid ${({ theme }) => theme.colors.border || "#ddd"};
      color: ${({ theme }) => theme.colors.default};
      padding: 10px 25px;
      font-weight: 500;
      transition: all 0.3s ease;

      &.active,
      &:hover {
        background-color: ${({ theme }) => theme.colors.accent};
        color: #fff;
        border-color: ${({ theme }) => theme.colors.accent};
      }
    }
  }

  .tab-content {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .row {
    margin-bottom: 20px;
  }

  .col-lg-6 {
    margin-bottom: 20px;
  }

  h3 {
    margin-bottom: 20px;
    font-size: 1.75rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.default};
  }

  p,
  ul li span {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.default};
  }

  ul {
    padding-left: 0;
    list-style: none;
    margin-bottom: 20px;

    li {
      margin-bottom: 10px;
      display: flex;
      align-items: center;

      i {
        margin-right: 10px;
        color: ${({ theme }) => theme.colors.accent};
      }
    }
  }

  .img-fluid {
    max-width: 100%;
    height: auto;
    border-radius: 12px;
  }

  @media (max-width: 768px) {
    .nav-tabs {
      justify-content: center;
    }

    .row {
      flex-direction: column;
    }
  }
`;

export const ButtonWrapper = styled.div`
  margin-top: 15px;
  text-align: left;

  @media (max-width: 1199px) {
    text-align: center;
  }
`;

// Lost Items Section
export const LostItemsSection = styled.section`
  padding: 40px 0;
`;

// Card Wrapper
export const CardWrapper = styled.div`
  .card {
    height: 100%;
    display: flex;
    flex-direction: row;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: translateY(-5px);
    }

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
  }

  .image-container {
    width: 200px;
    height: 200px;
    overflow: hidden;
    border-radius: 8px;
    margin-right: 20px;
    background-color: #f8f9fa;
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media (max-width: 768px) {
      width: 100%;
      height: auto;
      margin-right: 0;
    }
  }

  .text-end {
    text-align: right;

    button {
      padding: 12px 30px;
      font-size: 16px;
      border-radius: 50px;
      background-color: ${({ theme }) => theme.colors.accent};
      color: #fff;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.3s ease;

      &:hover {
        background-color: ${({ theme }) => theme.colors.warningDark};
        transform: translateY(-3px);
      }
    }
  }
`;
