import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ProtectedRoute } from "./_services/ProtectedRoute";
import useSplashScreen from "./_services/splashScreen";

// Import Public
import theme from "./utils/theme";
import GlobalStyle from "./components/GlobalStyles/GlobalStyle";
import PublicLayout from "./layout/PublicLayout";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Public/Home/Home";
import Contact from "./pages/Public/Contact/Contact";
import LostItems from "./pages/Public/LostItems/LostItem";
import KlaimItem from "./pages/Public/KlaimForm/KlaimItem";
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
// import CreateItem from "./pages/dashboard/admin/item/create";
import UpdateItem from "./pages/dashboard/admin/item/update";
import CreateStorage from "./pages/dashboard/admin/storage/create";
import UpdateStorage from "./pages/dashboard/admin/storage/update";
import CreateUser from "./pages/dashboard/admin/user/create";
// import CreateVerification from "./pages/dashboard/admin/verification/create";
// import UpdateVerification from "./pages/dashboard/admin/verification/update";
import SatpamDashboard from "./pages/dashboard/satpam/satpamDashboard";
import SatpamDashboardLayout from "./layout/dashboard/satpam";
import MissingItemPam from "./pages/dashboard/satpam/item/missingItemPam";
import VerificationListPam from "./pages/dashboard/satpam/verification/itemVerificationPam";
import StorageListPam from "./pages/dashboard/satpam/storage/storagePam";
import UpdateItemPam from "./pages/dashboard/satpam/item/updatePam";
import CreateStoragePam from "./pages/dashboard/satpam/storage/createPam";
import UpdateStoragePam from "./pages/dashboard/satpam/storage/updatePam";
import UpdateVerificationPam from "./pages/dashboard/satpam/verification/updatePam";
import UserDashboard from "./pages/dashboard/user/userDashboard";

function App() {
  const isSplashFinished = useSplashScreen();

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        {!isSplashFinished ? (
          <SplashScreen />
        ) : (
          <Routes>
            {/* Auth */}
            <Route path="/login" element={<Auth />} />

            {/* Layout Public */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/lostitems" element={<LostItems />} />
              <Route path="/user/dashboard" element={<UserDashboard />} />
            </Route>

            {/* Public must Login */}
            <Route
              element={
                <ProtectedRoute
                  role={["user", "admin", "satpam"]}
                  element={<PublicLayout />}
                />
              }
            >
              <Route path="/form" element={<LostItemForm />} />
              <Route path="/klaim/:id" element={<KlaimItem />} />
            </Route>

            {/* Admin Dashboard route */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute
                  role="admin"
                  element={<AdminDashboardLayout />}
                />
              }
            >
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
              <Route path="updateitem/:id" element={<UpdateItem />} />

              {/* storage route */}
              <Route path="createsto" element={<CreateStorage />} />
              <Route path="updatesto/:id" element={<UpdateStorage />} />

              {/* user route */}
              <Route path="createus" element={<CreateUser />} />
            </Route>

            {/* Satpam Dashboard route */}
            <Route
              path="/dashboardpam"
              element={
                <ProtectedRoute
                  role="satpam"
                  element={<SatpamDashboardLayout />}
                />
              }
            >
              <Route path="satpam" element={<SatpamDashboard />} />
              <Route path="item" element={<MissingItemPam />} />
              <Route path="verification" element={<VerificationListPam />} />
              <Route path="storage" element={<StorageListPam />} />

              {/* item routes */}
              <Route path="updateitem/:id" element={<UpdateItemPam />} />

              {/* storage route */}
              <Route path="createsto" element={<CreateStoragePam />} />
              <Route path="updatesto/:id" element={<UpdateStoragePam />} />

              {/* verification route */}
              <Route path="updatever/:id" element={<UpdateVerificationPam />} />
            </Route>
          </Routes>
        )}
      </>
    </ThemeProvider>
  );
}

export default App;
