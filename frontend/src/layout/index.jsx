import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Container from "../components/index";

function Layout ({ children }) {
    return (
        <>
            <Navbar />
                <Container>{children}</Container>
            <Footer />
        </>
    );
}

export default Layout;