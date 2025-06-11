import React from "react";
import {
  FooterWrapper,  
  FooterRow,
  FooterCol,
  Logo,
  Description,
  SectionTitle,
  LinkList,
  Copyright,
} from "./Footer.styled";
import { Link } from "react-router-dom";
import Container from "../ui/Container";

function Footer() {
  return (
    <FooterWrapper>
      <Container >
        <FooterRow className="row gy-4">
          <FooterCol className="col-lg-6">
            <Logo src="/assets/img/logo.png" alt="NF SmartFinder Logo" />
            <Description>
              NF SmartFinder adalah aplikasi yang membantu pengguna menemukan
              kembali barang yang hilang dengan mudah dan cepat. Kami berkomitmen
              untuk menyediakan layanan yang aman, efisien, dan mudah digunakan. <br />

              Contact Us : +628123456789 <br />
              Jl. Raya Lenteng Agung No.20, Jakarta Selatan
            </Description>
          </FooterCol>

          <FooterCol className="col-lg-2 col-md-4">
            <SectionTitle>Menu</SectionTitle>
            <LinkList>
              <li><Link to="#">Beranda</Link></li>
              <li><Link to="#">Tentang Kami</Link></li>
              <li><Link to="#">Fitur</Link></li>
              <li><Link to="#">Kontak</Link></li>
            </LinkList>
          </FooterCol>

          <FooterCol className="col-lg-2 col-md-3">
            <SectionTitle>Fitur</SectionTitle>
            <LinkList>
              <li><Link to="#">Laporkan Barang</Link></li>
              <li><Link to="#">Cari Barang Hilang</Link></li>
              <li><Link to="#">Notifikasi Temuan</Link></li>
            </LinkList>
          </FooterCol>

          <FooterCol className="col-lg-2 col-md-3">
            <SectionTitle>Bantuan</SectionTitle>
            <LinkList>
              <li><Link to="#">FAQ</Link></li>
              <li><Link to="#">Syarat & Ketentuan</Link></li>
              <li><Link to="#">Kebijakan Privasi</Link></li>
              <li><Link to="#">Dukungan</Link></li>
            </LinkList>
          </FooterCol>
        </FooterRow>
      </Container>

      <Copyright className="container text-center mt-4">
        <p>
          © <span>2025</span> <strong className="px-1 sitename">NF SmartFinder</strong> |
          All Rights Reserved
        </p>
      </Copyright>
    </FooterWrapper>
  );
}

export default Footer;
