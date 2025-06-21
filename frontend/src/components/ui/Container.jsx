// src/components/ui/Container.jsx
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 1140px; 
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;

  @media (max-width: 768px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

export default Container;
