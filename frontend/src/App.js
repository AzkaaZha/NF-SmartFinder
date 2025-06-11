import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Login from "./pages/LoginSignup/Login";
import Contact from "./pages/Contact";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/privateRoute";
import KlaimItem from './pages/KlaimItem';
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
  // Ambil data user login dari localStorage
  const currentUser  = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/klaim"
          element={
            <PrivateRoute>
              <KlaimItem userId={currentUser  ? currentUser.id : null} token={currentUser  ? currentUser.token : null} />
            </PrivateRoute>
          }
        />
        <Route
          path="/form"
          element={
            <PrivateRoute>
              {currentUser  ? (
                <LostItemForm userId={currentUser.id} userName={currentUser.name} />
              ) : (
                <p>Loading user data...</p>
              )}
            </PrivateRoute>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/lostitems" element={<LostItems />} />
        <Route path="/klaim/:id" element={<KlaimItem />} /> {/* Add this line for dynamic route */}

        {/* admin dashboard route */}
        <Route path="/dashboard" element={<AdminDashboardLayout />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="user" element={<UserManagement />} />
          <Route path="categorie" element={<ItemCategorie />}/>
          <Route path="location" element={<LocationList />}/>
          <Route path="item" element={<MissingItem />}/>
          <Route path="verification" element={<ItemVerification />}/>

          {/* location */}
          <Route path="createloc" element={<CreateLocation />} />
          <Route path="updateloc" element={<UpdateLocation />} />

          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
