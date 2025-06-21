import styled from "styled-components";

export const DashboardSection = styled.section`
  padding: 120px 0;
  background-color: #f9f9f9;
`;

export const SectionTitle = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h2 {
    font-size: 2rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.default};
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary || "#666"};
    margin-top: 0.5rem;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th, td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f1f5f9;
    font-weight: 600;
    color: #333;
  }

  tr:nth-child(even) {
    background-color: #f9fafb;
  }
`;

export const StatusPill = styled.span`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: capitalize;
`;
