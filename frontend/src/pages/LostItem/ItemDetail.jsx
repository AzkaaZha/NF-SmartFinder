import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ModalImage, ModalWrapper, StatusBadge } from "./LostItem.styled";
import { getStatusBadgeStyle } from "../../../_services/verifications";

const ItemDetail = ({ showModal, handleCloseModal, item }) => {
  const statusStyle = getStatusBadgeStyle(item.status);

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{item.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalImage
          src={item.img_url || "/assets/img/placeholder.jpg"}
          alt={item.name}
        />
        <ModalWrapper>
          <p>
            <strong>Status: </strong>
            <StatusBadge statusColor={statusStyle.backgroundColor}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </StatusBadge>
          </p>
          <p>
            <strong>Kategori:</strong> {item.categoryName}
          </p>
          <p>
            <strong>Deskripsi:</strong> {item.description}
          </p>
          <p>
            <strong>Lokasi Ditemukan:</strong> {item.locationName}
          </p>
        </ModalWrapper>
      </Modal.Body>
      <Modal.Footer>
        <Link
          to={`/klaim/${item.id}`}
          className="btn"
          style={{ backgroundColor: "#f59e0b", color: "#27227d" }}
        >
          Klaim Barang
        </Link>
        <Button variant="secondary" onClick={handleCloseModal}>
          Tutup
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ItemDetail;