import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />  
      <Footer />
    </>
  );  
}

export default PublicLayout 