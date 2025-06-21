import { useState, useEffect } from "react";
import {
  SearchFilterWrapper,
  LoadingWrapper,
  CardWrapperContainer,
  ResetButton,
  FilterSidebar,
  SectionTitle,
  CardWrapper,
  DetailButton,
} from "./LostItem.styled";
import { Form, Spinner } from "react-bootstrap";
import ItemDetail from "./ItemDetail";
import Container from "../../../components/ui/Container";
import { getItems } from "../../../_services/Items";
import { getCategories } from "../../../_services/categories";
import { getLocations } from "../../../_services/locations";

function LostItems() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("Semua");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterDateRange, setFilterDateRange] = useState({
    start: "",
    end: "",
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsData, categoriesData, locationsData] = await Promise.all([
          getItems(),
          getCategories(),
          getLocations(),
        ]);

        const itemsWithLocation = itemsData.map((item) => {
          const category = categoriesData.find(
            (cat) => cat.id === item.categories_id
          );
          const location = locationsData.find(
            (loc) => loc.id === item.locations_id
          );
          return {
            ...item,
            categoryName: category ? category.name : "Tidak diketahui",
            locationName: location ? location.name : "Tidak diketahui",
          };
        });
        setItems(itemsWithLocation);
        setCategories(categoriesData);
        setLocations(locationsData);
        setFilteredItems(itemsWithLocation);
        setLoading(false);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = items.filter(
      (item) =>
        (filterCategory === "Semua" || item.categoryName === filterCategory) &&
        (filterLocation === "" || item.locationName === filterLocation) &&
        (filterDateRange.start === "" ||
          new Date(item.date) >= new Date(filterDateRange.start)) &&
        (filterDateRange.end === "" ||
          new Date(item.date) <= new Date(filterDateRange.end)) &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchQuery, filterCategory, filterLocation, filterDateRange, items]);

  const handleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setFilterCategory("Semua");
    setFilterLocation("");
    setFilterDateRange({ start: "", end: "" });
    setFilteredItems(items);
  };

  return (
    <div className="py-5 mt-5">
      <SectionTitle>
        <h2>Informasi Barang</h2>
        <p>Mencari barang dengan mudah untuk ditemukan.</p>
      </SectionTitle>
      <Container>
        <div className="d-flex flex-column flex-md-row">
          {/* Filter Sidebar */}
          <FilterSidebar>
            <SearchFilterWrapper>
              <Form.Control
                className="flex-grow-1"
                type="text"
                placeholder="Cari barang hilang..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Form.Select
                style={{ maxWidth: 200, minWidth: 150 }}
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="Semua">Semua Kategori</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Select
                style={{ maxWidth: 200, minWidth: 150 }}
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
              >
                <option value="">Semua Lokasi</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.name}>
                    {loc.name}
                  </option>
                ))}
              </Form.Select>
              <div>
                <Form.Label>Tanggal Mulai:</Form.Label>
                <Form.Control
                  type="date"
                  value={filterDateRange.start}
                  onChange={(e) =>
                    setFilterDateRange((prev) => ({
                      ...prev,
                      start: e.target.value,
                    }))
                  }
                />
                <Form.Label>Tanggal Selesai:</Form.Label>
                <Form.Control
                  type="date"
                  value={filterDateRange.end}
                  onChange={(e) =>
                    setFilterDateRange((prev) => ({
                      ...prev,
                      end: e.target.value,
                    }))
                  }
                />
              </div>
              <ResetButton onClick={handleResetFilters}>Reset</ResetButton>
            </SearchFilterWrapper>
          </FilterSidebar>

          {/* Filtered Items Display */}
          <div style={{ flex: 1 }}>
            <CardWrapperContainer>
              {loading ? (
                <LoadingWrapper>
                  <Spinner animation="border" variant="primary" />
                  <p className="mt-2">Memuat data barang hilang...</p>
                </LoadingWrapper>
              ) : (
                <>
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <CardWrapper key={item.id}>
                        <div className="card h-100 shadow-sm">
                          <div className="image-container">
                            <img src={item.img_url} alt={item.name} />
                          </div>
                          <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p>
                              <strong>Lokasi:</strong>{" "}
                              {item.locationName || "Tidak diketahui"}
                            </p>
                            <p>
                              <strong>Tanggal: </strong>
                              {item.date
                                ? new Date(item.date).toLocaleDateString(
                                    "id-ID",
                                    {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                    }
                                  )
                                : "-"}
                            </p>
                            <DetailButton onClick={() => handleShowModal(item)}>
                              Detail
                            </DetailButton>
                          </div>
                        </div>
                      </CardWrapper>
                    ))
                  ) : (
                    <div className="text-center mt-5">
                      <p>
                        Tidak ada barang ditemukan sesuai pencarian atau filter.
                      </p>
                    </div>
                  )}
                </>
              )}
            </CardWrapperContainer>
          </div>
        </div>

        {/* Modal Detail */}
        {selectedItem && (
          <ItemDetail
            showModal={showModal}
            handleCloseModal={handleCloseModal}
            item={selectedItem}
          />
        )}
      </Container>
    </div>
  );
}

export default LostItems;
