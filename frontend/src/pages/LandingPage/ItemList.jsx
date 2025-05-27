import React from "react";
import styled from "styled-components";

// Data dummy sementara sebelum konsum API dari backend
const dummyItems = [
  {
    id: 1,
    name: "Kunci Motor",
    date: "2025-05-20",
    description: "Kunci motor dengan gantungan berbentuk bola.",
    image: "https://via.placeholder.com/150",
    status: "pending",
  },
  {
    id: 2,
    name: "Dompet Hitam",
    date: "2025-05-18",
    description: "Dompet kulit warna hitam berisi kartu mahasiswa.",
    image: "https://via.placeholder.com/150",
    status: "approved",
  },
  {
    id: 3,
    name: "Handphone Samsung",
    date: "2025-05-17",
    description: "Handphone Samsung dengan casing warna biru.",
    image: "https://via.placeholder.com/150",
    status: "rejected",
  },
];

// Styled Components untuk tampilan yang lebih rapi dan profesional
const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
`;

const ItemCard = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin: 10px 0;
  background: #f9f9f9;
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  margin-right: 15px;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const StatusBadge = styled.span`
  padding: 5px 10px;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
  background: ${(props) =>
    props.status === "pending"
      ? "#f0ad4e"
      : props.status === "approved"
      ? "#5cb85c"
      : "#d9534f"};
`;

const ItemList = () => {
  return (
    <Container>
      <h2>Daftar Barang Hilang</h2>
      {dummyItems.map((item) => (
        <ItemCard key={item.id}>
          <ItemImage src={item.image} alt={item.name} />
          <ItemDetails>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <small>{item.date}</small>
            <StatusBadge status={item.status}>{item.status}</StatusBadge>
          </ItemDetails>
        </ItemCard>
      ))}
    </Container>
  );
};

export default ItemList;