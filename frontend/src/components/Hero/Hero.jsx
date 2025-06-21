import { useNavigate } from "react-router-dom";
import Button from "../ui/Button/Button";
import { HeroSection, HeroContainer, HeroContent, HeroImage} from "./Hero.styled";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <HeroSection>
      <HeroContainer>
        <HeroContent>
          <h1>
            SELAMAT DATANG DI <span style={{ color: "#27227d" }}>NF - </span>
            <span style={{ color: "#f59e0b" }}>SMARTFINDER</span>
          </h1>

          <p>
            Kami menyediakan platform untuk membantu anda melaporkan barang temuan atau
            mencari barang yang hilang!
          </p>

          <Button variant="primary"
            onClick={() => navigate("/form")}
          >Buat Laporan</Button>
        </HeroContent>

        <HeroImage>
          <img src="/assets/img/hero.svg" alt="Hero" />
        </HeroImage>
      </HeroContainer>
    </HeroSection>
  );
}