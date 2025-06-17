import styled from "styled-components";

// About Section
export const AboutSection = styled.section`
  padding: auto;

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
`;

export const SectionTitle = styled.div`
  text-align: center;
  font-weight: 500;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding-top: 2rem;
`;

// Features Section
export const FeaturesSection = styled.section`
  padding: auto;
  background-color: #f7f9fc;

  .row {
    margin-bottom: 20px;
  }

  h3 {
    margin-bottom: 20px;
    font-size: 1.75rem;
  }

  ul {
    margin-bottom: 20px;
    padding-left: 20px;
    list-style-type: none;

    li {
      margin-bottom: 10px;
      font-size: 16px;
      color: ${({ theme }) => theme.colors.default};

      i {
        margin-right: 8px;
        color: ${({ theme }) => theme.colors.accent};
      }
    }
  }

  .tab-content {
    padding-top: 40px;
    padding-bottom: 40px;
  }

  .row {
    margin-bottom: 40px;
  }

  .col-lg-6 {
    margin-bottom: 30px;
  }

  img {
    max-width: 100%;
    height: auto;
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
  padding: auto;
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
