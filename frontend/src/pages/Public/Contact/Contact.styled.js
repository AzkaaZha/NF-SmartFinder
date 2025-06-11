import styled from "styled-components";

export const Section = styled.section`
  padding: 4rem 0;
  background-color: var(--surface-color);
  margin-top: 5rem;
`;

export const InfoBox = styled.div`
  background-color: #27227d;
  color: var(--contrast-color);
  padding: 3rem;
  border-radius: 1rem;
  height: 100%;

  h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: var(--contrast-color);
  }

  p {
    opacity: 0.8;
    margin-bottom: 2rem;
  }

  a {
    color: var(--contrast-color);
  }

  @media (max-width: 992px) {
    padding: 1.5rem;
  }

  @media (max-width: 767.98px) {
    h3 {
      font-size: 1.75rem;
    }
  }
`;

export const InfoItem = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }

  .icon-box {
    width: 3.5rem;
    height: 3.5rem;
    background-color: color-mix(in srgb, var(--contrast-color), transparent 85%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: 0.3s;

    i {
      font-size: 1.5rem;
      color: var(--contrast-color);
    }
  }

  &:hover .icon-box {
    background-color: color-mix(in srgb, var(--contrast-color), transparent 70%);
  }

  .content h4 {
    color: var(--contrast-color);
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  .content p {
    margin-bottom: 0.25rem;
    font-size: 0.95rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const ContactForm = styled.div`
  background-color: var(--surface-color);
  padding: 3rem;
  border-radius: 1rem;
  height: 100%;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.05);

  h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    color: color-mix(in srgb, var(--default-color), transparent 25%);
    margin-bottom: 2rem;
  }

  .form-control,
  .form-select {
    padding: 0.875rem 1.25rem;
    border-color: color-mix(in srgb, var(--default-color), transparent 90%);
    border-radius: 0.5rem;
    background-color: color-mix(in srgb, var(--surface-color) 90%, white 5%);
    color: var(--default-color);

    &:focus {
      box-shadow: none;
      border-color: var(--accent-color);
    }

    &::placeholder {
      color: color-mix(in srgb, var(--default-color), transparent 50%);
    }
  }

  .btn {
    background-color: var(--accent-color);
    color: var(--contrast-color);
    padding: 1rem 2rem;
    border-radius: 2rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: 0.3s;

    i {
      font-size: 1.25rem;
    }

    &:hover {
      background-color: color-mix(in srgb, var(--accent-color), var(--contrast-color) 20%);
    }
  }

  @media (max-width: 992px) {
    padding: 1.5rem;
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 1.75rem;
    }
  }
`;
