import { useEffect, useState } from "react";
import { getUserReports, getUserClaims } from "../../../_services/user";
import Container from "../../../components/ui/Container";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  DashboardSection,
  SectionTitle,
  StyledTable,
  StatusPill,
} from "./UserDashboard.styled";
import { getStatusBadgeStyle } from "../../../_services/verifications";

function UserDashboard() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [reports, setReports] = useState([]);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = localStorage.getItem("accessToken");

    if (!token || !userInfo) {
      console.error("Token atau userInfo tidak ditemukan. Redirecting to login.");
      navigate("/login");
      return;
    }

    if (userInfo?.role !== "user") {
      navigate("/not-authorized");
      return;
    }

    setUserId(userInfo?.id);
  }, [navigate]);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const [reportData, claimData] = await Promise.all([
          getUserReports(),
          getUserClaims(),
        ]);
        setReports(reportData);
        setClaims(claimData);
      } catch (error) {
        console.error("Gagal mengambil data dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <DashboardSection>
      <Container>
        <SectionTitle>
          <h2>Dashboard Pengguna</h2>
          <p>Riwayat laporan dan klaim barang Anda</p>
        </SectionTitle>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <>
            <h4 className="mt-4">Laporan Anda</h4>
            <StyledTable>
              <thead>
                <tr>
                  <th>Nama Barang</th>
                  <th>Tanggal</th>
                  <th>Deskripsi</th>
                </tr>
              </thead>
              <tbody>
                {reports.length > 0 ? (
                  reports.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.date}</td>
                      <td>{item.description}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      Belum ada laporan.
                    </td>
                  </tr>
                )}
              </tbody>
            </StyledTable>

            <h4 className="mt-5">Riwayat Klaim</h4>
            <StyledTable className="mt-4">
              <thead>
                <tr>
                  <th>Nama Barang</th>
                  <th>Pesan Klaim</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {claims.length > 0 ? (
                  claims.map((claim) => (
                    <tr key={claim.id}>
                      <td>{claim.item?.name || "Tidak ditemukan"}</td>
                      <td>{claim.message}</td>
                      <td>
                        <StatusPill style={getStatusBadgeStyle(claim.status)}>
                          {claim.status}
                        </StatusPill>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      Belum ada klaim.
                    </td>
                  </tr>
                )}
              </tbody>
            </StyledTable>
          </>
        )}
      </Container>
    </DashboardSection>
  );
}

export default UserDashboard;
