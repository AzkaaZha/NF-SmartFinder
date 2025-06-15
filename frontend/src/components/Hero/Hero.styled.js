import styled from "styled-components";

export const HeroSection = styled.section`
  position: relative;
  padding-top: 100px;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, ${({ theme }) => theme.colors.accent}, transparent 95%) 50%,
    color-mix(in srgb, ${({ theme }) => theme.colors.accent}, transparent 98%) 25%,
    transparent 50%
  );

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at 90% 10%,
      color-mix(in srgb, ${({ theme }) => theme.colors.accent}, transparent 92%),
      transparent 40%
    );
    pointer-events: none;
  }
`;

export const HeroContainer = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 992px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const HeroContent = styled.div`
  flex: 1;
  z-index: 1;

  h1 {
    font-size: 3rem;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;

    @media (max-width: 992px) {
      font-size: 2rem;
    }

    @media (max-width: 575px) {
      font-size: 2rem;
    }
  }

  p {
    margin-bottom: 2rem;
  }

  .hero-buttons {
    display: flex;
    gap: 1rem;

    @media (max-width: 992px) {
      justify-content: center;
    }
  }
`;

export const HeroImage = styled.div`
  flex: 1;
  text-align: center;
  z-index: 1;

  img {
    max-width: 100%;
    height: auto;
  }
`;
