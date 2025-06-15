import React from "react";
import {
  Section,
  InfoBox,
  InfoItem,
  ContactForm,
} from "./Contact.styled";
import Button from "../../../components/ui/Button/Button";

function Contact() {
  return (
    <div>
      <main className="main">
        <Section id="contact" className="contact section">
          <div className="container">
            <div className="row g-4 g-lg-5">
              <div className="col-lg-5">
                <InfoBox>
                  <h3>Informasi Kontak</h3>
                  <p>Kami siap membantu proses pelaporan dan pencarian barang hilang.</p>

                  <InfoItem>
                    <div className="icon-box">
                      <i className="bi bi-geo-alt"></i>
                    </div>
                    <div className="content">
                      <h4>Alamat</h4>
                      <p>Jl. Raya Lenteng Agung No.20, Jakarta Selatan</p>
                    </div>
                  </InfoItem>

                  <InfoItem>
                    <div className="icon-box">
                      <i className="bi bi-telephone"></i>
                    </div>
                    <div className="content">
                      <h4>Nomor Telepon</h4>
                      <p>+62 812 3456 7890</p>
                    </div>
                  </InfoItem>

                  <InfoItem>
                    <div className="icon-box">
                      <i className="bi bi-envelope"></i>
                    </div>
                    <div className="content">
                      <h4>Email</h4>
                      <p>smartfinder@nf.or.id</p>
                    </div>
                  </InfoItem>
                </InfoBox>
              </div>

              <div className="col-lg-7">
                <ContactForm>
                  <h3>Kirim Pesan</h3>
                  <p>Masukkan pesan kamu di bawah ini. Kami akan merespons secepatnya.</p>

                  <form action="#" method="post" className="php-email-form">
                    <div className="row gy-4">
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Nama Anda"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="Email Anda"
                          required
                        />
                      </div>
                      <div className="col-12">
                        <input
                          type="text"
                          className="form-control"
                          name="subject"
                          placeholder="Subjek"
                          required
                        />
                      </div>
                      <div className="col-12">
                        <textarea
                          className="form-control"
                          name="message"
                          rows="6"
                          placeholder="Pesan"
                          required
                        ></textarea>
                      </div>
                      <div className="col-12 text-center">
                        <Button variant="primary" type="submit">Kirim Pesan</Button>
                      </div>
                    </div>
                  </form>
                </ContactForm>
              </div>
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
}

export default Contact;