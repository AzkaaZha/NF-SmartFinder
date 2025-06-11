import styled, { css } from "styled-components";

const variants = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primaryText};
    border: none;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryText};
      color: ${({ theme }) => theme.colors.primary};
      border: 2px solid ${({ theme }) => theme.colors.primary};
    }
  `,
  outline: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.primaryText};
    }
  `,
};

export const StyledButton = styled.button`
  font-family: ${({ theme }) => theme.fonts.default};
  padding: 0.5rem 1.25rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  ${({ variant }) => variants[variant] || variants.primary}
`;
