import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

// Import Public
import Login from "./pages/Auth/login/Login";
import Home from "./pages/Public/Home/Home";
import Contact from "./pages/Public/Contact/Contact";
import KlaimItem from "./pages/KlaimItem";
import LostItemForm from "./pages/Public/ItemForm/LostItemForm";

// Import Dashboard
import AdminDashboard from "./pages/dashboard/admin/adminDashboard";
import UserManagement from "./pages/dashboard/admin/user/userManagement";
import ItemCategorie from "./pages/dashboard/admin/categorie/ItemCategorie";
import LocationList from "./pages/dashboard/admin/location/locationList";
import MissingItem from "./pages/dashboard/admin/item/missingItem";
import ItemVerification from "./pages/dashboard/admin/verification/itemVerification";
import AdminDashboardLayout from "./layout/dashboard/admin";
import CreateLocation from "./pages/dashboard/admin/location/create";
import UpdateLocation from "./pages/dashboard/admin/location/update";
import StorageList from "./pages/dashboard/admin/storage/storage";
import CreateCategorie from "./pages/dashboard/admin/categorie/create";
import UpdateCategorie from "./pages/dashboard/admin/categorie/update";
import CreateItem from "./pages/dashboard/admin/item/create";
import UpdateItem from "./pages/dashboard/admin/item/update";
import CreateStorage from "./pages/dashboard/admin/storage/create";
import UpdateStorage from "./pages/dashboard/admin/storage/update";
import CreateUser from "./pages/dashboard/admin/user/create";
import CreateVerification from "./pages/dashboard/admin/verification/create";
import UpdateVerification from "./pages/dashboard/admin/verification/update";
import SatpamDashboard from "./pages/dashboard/satpam/satpamDashboard";
import SatpamDashboardLayout from "./layout/dashboard/satpam";
import MissingItemPam from "./pages/dashboard/satpam/item/missingItemPam";
import VerificationListPam from "./pages/dashboard/satpam/verification/itemVerificationPam";
import StorageListPam from "./pages/dashboard/satpam/storage/storagePam";
import CreateItemPam from "./pages/dashboard/satpam/item/createPam";
import UpdateItemPam from "./pages/dashboard/satpam/item/updatePam";
import CreateStoragePam from "./pages/dashboard/satpam/storage/createPam";
import UpdateStoragePam from "./pages/dashboard/satpam/storage/updatePam";
import CreateVerificationPam from "./pages/dashboard/satpam/verification/createPam";
import UpdateVerificationPam from "./pages/dashboard/satpam/verification/updatePam";
import UserDashboardLayout from "./layout/dashboard/user";
import MissingItemUser from "./pages/dashboard/user/item/missingItem";
import CreateItemUser from "./pages/dashboard/user/item/create";
import ItemDetail from "./pages/dashboard/user/item/itemDetail";

import LostItems from './pages/Public/LostItems/LostItem';
import theme from './utils/theme';
import GlobalStyle from './components/GlobalStyles/GlobalStyle';
import PublicLayout from './layout/PublicLayout';
import FormKlaimBarang from './pages/Public/KlaimForm/FormKlaimBarang';
import SplashScreen from './components/SplashScreen/SplashScreen'; 
// import AdminLayout from './layouts/AdminLayout';

function App() {
  const [isSplashFinished, setIsSplashFinished] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const handleSplashFinish = () => {
    setIsSplashFinished(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        {!isSplashFinished && <SplashScreen onFinish={handleSplashFinish} />}
        {isSplashFinished && (
          <Routes>
            {/* Auth */}
            <Route path="/login" element={<Login />} />

            {/* Layout Public */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/lostitems" element={<LostItems />} />
              <Route path="/klaim/:id" element={<KlaimItem />} />
              <Route path="/form" element={<LostItemForm />} />
            </Route>

            {/* Admin Dashboard route */}
            <Route path="/dashboard" element={<AdminDashboardLayout />}>
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="user" element={<UserManagement />} />
              <Route path="categorie" element={<ItemCategorie />} />
              <Route path="location" element={<LocationList />} />
              <Route path="item" element={<MissingItem />} />
              <Route path="verification" element={<ItemVerification />} />
              <Route path="storage" element={<StorageList />} />

              {/* Location routes */}
              <Route path="createloc" element={<CreateLocation />} />
              <Route path="updateloc/:id" element={<UpdateLocation />} />

              {/* categorie routes */}
              <Route path="createcat" element={<CreateCategorie />} />
              <Route path="updatecat/:id" element={<UpdateCategorie />} />

              {/* item routes */}
              <Route path="createitem" element={<CreateItem />} />
              <Route path="updateitem/:id" element={<UpdateItem />} />

              {/* storage route */}
              <Route path="createsto" element={<CreateStorage />} />
              <Route path="updatesto/:id" element={<UpdateStorage />} />

              {/* user route */}
              <Route path="createus" element={<CreateUser />} />

              {/* verification route */}
              <Route path="createver" element={<CreateVerification />} />
              <Route path="updatever/:id" element={<UpdateVerification />} />
            </Route>

            {/* Satpam Dashboard route */}
            <Route path="/dashboardpam" element={<SatpamDashboardLayout />}>
              <Route path="satpam" element={<SatpamDashboard />} />
              <Route path="item" element={<MissingItemPam />} />
              <Route path="verification" element={<VerificationListPam />} />
              <Route path="storage" element={<StorageListPam />} />

              {/* item routes */}
              <Route path="createitem" element={<CreateItemPam />} />
              <Route path="updateitem/:id" element={<UpdateItemPam />} />

              {/* storage route */}
              <Route path="createsto" element={<CreateStoragePam />} />
              <Route path="updatesto/:id" element={<UpdateStoragePam />} />

              {/* verification route */}
              <Route path="createver" element={<CreateVerificationPam />} />
              <Route path="updatever/:id" element={<UpdateVerificationPam />} />
            </Route>

            {/* USer Dashboard route */}
            <Route path="/dashboarduser" element={<UserDashboardLayout />}>
              <Route path="item" element={<MissingItemUser />} />

              {/* item routes */}
              <Route path="createitem" element={<CreateItemUser />} />
              <Route path="itemdetail/:id" element={<ItemDetail />} />

            </Route>
          </Routes>
        )}
      </>
    </ThemeProvider>
  );
}

export default App;
