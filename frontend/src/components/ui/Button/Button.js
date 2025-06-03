// src/ui/Button/Button.js
import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 16px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background-color: #ff3c3c;
  }
`;

export default Button;
