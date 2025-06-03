import styled from 'styled-components';

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: bold;
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

export const SubTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.muted};
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;
