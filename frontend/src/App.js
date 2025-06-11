import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Login from "./pages/LoginSignup/Login";
import Contact from "./pages/Contact";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/privateRoute";
import FormKlaimBarang from "./pages/FormKlaimBarang";
import LostItemForm from "./pages/LostItemForm";
import LostItems from "./pages/LostItem";
import AdminDashboard from "./pages/dashboard/admin/adminDashboard";
import UserManagement from "./pages/dashboard/admin/user/userManagemen";
import ItemCategorie from "./pages/dashboard/admin/categorie/ItemCategorie";
import LocationList from "./pages/dashboard/admin/location/locationList";
import MissingItem from "./pages/dashboard/admin/item/missingItem";
import ItemVerification from "./pages/dashboard/admin/verification/itemVerification";
import AdminDashboardLayout from "./layout/dashboard/admin";
import CreateLocation from "./pages/dashboard/admin/location/create";
import UpdateLocation from "./pages/dashboard/admin/location/update";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/klaim"
          element={
            <PrivateRoute>
              <FormKlaimBarang />
            </PrivateRoute>
          }
        />
        <Route
          path="/form"
          element={
            <PrivateRoute>
              <LostItemForm />
            </PrivateRoute>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/lostitems" element={<LostItems />} />

        {/* admin dashboard route */}
        <Route path="/dashboard" element={<AdminDashboardLayout />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="user" element={<UserManagement />} />
          <Route path="categorie" element={<ItemCategorie />}/>
          <Route path="location" element={<LocationList />}/>
          <Route path="item" element={<MissingItem />}/>
          <Route path="verification" element={<ItemVerification />}/>

          {/* location */}
          <Route path="create" element={<CreateLocation />} />
          <Route path="update" element={<UpdateLocation />} />

          
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
