import styled from "styled-components";

export const Section = styled.section`
  padding: 5rem 0;
  background-color: ${({ theme }) => theme.colors.surface};  
  margin-top: 5rem;
`;

export const InfoBox = styled.div`
  background-color: ${({ theme }) => theme.colors.primary}; 
  color: ${({ theme }) => theme.colors.contrast}; 
  padding: 3rem;
  border-radius: 1rem;
  height: 100%;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.contrast};  
  }

  p {
    opacity: 0.8;
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.colors.contrast};  
  }

  a {
    color: ${({ theme }) => theme.colors.accent};  
  }

  @media (max-width: 992px) {
    padding: 2rem;
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
    background-color: ${({ theme }) => theme.colors.accent};  
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: 0.3s;

    i {
      font-size: 1.5rem;
      color: ${({ theme }) => theme.colors.contrast};  
    }
  }

  &:hover .icon-box {
    background-color: ${({ theme }) => theme.colors.accentDark};  
  }

  .content h4 {
    color: ${({ theme }) => theme.colors.contrast}; 
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
  background-color: ${({ theme }) => theme.colors.surface};  
  padding: 3.5rem;
  border-radius: 1rem;
  height: 100%;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.05);

  h3 {
    font-size: 2.2rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.primaryText};  
  }
  
  p {
    color: ${({ theme }) => theme.colors.darkText};  
    margin-bottom: 2rem;
  }

  .form-control,
  .form-select {
    padding: 1rem 1.5rem;
    border-color: ${({ theme }) => theme.colors.primary};  
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.colors.surfaceLight}; 
    color: ${({ theme }) => theme.colors.default};

    &:focus {
      box-shadow: none;
      border-color: ${({ theme }) => theme.colors.accent};
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.placeholder};  
    }
  }

  .btn {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.contrast};
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
      background-color: ${({ theme }) => theme.colors.accentDark};
    }
  }

  @media (max-width: 992px) {
    padding: 2rem;
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 1.75rem;
    }
  }
`;
