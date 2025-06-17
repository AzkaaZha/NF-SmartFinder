import styled from "styled-components";
import { Button } from "react-bootstrap";

export const SectionTitle = styled.div`
  text-align: center;
  font-weight: 500;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding-top: 2rem;
`;

export const SearchFilterWrapper = styled.div`
  display: flex;
  flex-direction: column; 
  gap: 10px;
  margin-bottom: 30px;
`;

export const LoadingWrapper = styled.div`
  text-align: center;
  margin-top: 50px;
`;

export const ItemCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 320px;
  margin: 0 auto;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const ModalImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  max-height: 300px;
  margin-bottom: 20px;
`;

export const ModalWrapper = styled.div`
  padding: 20px;
  font-size: 16px;
  color: #333;
  p {
    margin-bottom: 15px;
  }
`;

export const StatusBadge = styled.span`
  background-color: ${(props) => props.statusColor};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 600;
`;

export const CardWrapperContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }

  .card-body {
    display: flex;
    flex-direction: column;
    padding: 5px;
    font-size: 14px;
  }

  .card-title {
    font-size: 16px;
    color: #27227d;
    margin-bottom: 10px;
  }

  .status-badge {
    font-weight: 600;
    padding: 5px;
    border-radius: 4px;
    margin-bottom: 10px;
    color: white;
    &.found {
      background-color: #22c55e;
    }
    &.lost {
      background-color: #ef4444;
    }
  }

  .image-container {
    width: 100%;
    height: 200px;
    overflow: hidden;
    border-radius: 8px;
    margin-bottom: 15px;
    background-color: #f8f9fa;
    transition: transform 0.3s ease-in-out;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .text-end {
    text-align: center;
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

export const FilterSidebar = styled.div`
  flex-basis: 25%;
  padding: 20px;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: stretch;
  height: fit-content;
`;

// Styled Button
export const DetailButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-color: #f59e0b;
  width: 100%;
  font-size: 16px;
  border-radius: 10px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryText};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ResetButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primaryText};
  color: white;
  font-weight: bold;
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;


