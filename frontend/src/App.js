import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Login from './pages/Auth/login/Login';  
import Home from './pages/Public/Home/Home';
import Contact from './pages/Public/Contact/Contact';
import KlaimItem from './pages/KlaimItem';
import LostItemForm from './pages/Public/ItemForm/LostItemForm';
import AdminDashboard from "./pages/dashboard/admin/adminDashboard";
import UserManagement from "./pages/dashboard/admin/user/userManagement";
import ItemCategorie from "./pages/dashboard/admin/categorie/ItemCategorie";
import LocationList from "./pages/dashboard/admin/location/locationList";
import MissingItem from "./pages/dashboard/admin/item/missingItem";
import ItemVerification from "./pages/dashboard/admin/verification/itemVerification";
import AdminDashboardLayout from "./layout/dashboard/admin";
import CreateLocation from "./pages/dashboard/admin/location/create";
import UpdateLocation from "./pages/dashboard/admin/location/update";
import LostItems from './pages/LostItem';
import theme from './utils/theme';
import GlobalStyle from './components/GlobalStyles/GlobalStyle';
import PublicLayout from './layout/PublicLayout';
import FormKlaimBarang from './pages/Public/KlaimForm/FormKlaimBarang';
import SplashScreen from './components/SplashScreen/SplashScreen'; 
import StorageList from './pages/dashboard/admin/storage/storage';
import CreateCategorie from './pages/dashboard/admin/categorie/create';
import UpdateCategorie from './pages/dashboard/admin/categorie/update';
import CreateItem from './pages/dashboard/admin/item/create';
import UpdateItem from './pages/dashboard/admin/item/update';
import CreateStorage from './pages/dashboard/admin/storage/create';
import UpdateStorage from './pages/dashboard/admin/storage/update';
import CreateUser from './pages/dashboard/admin/user/create';
import CreateVerification from './pages/dashboard/admin/verification/create';
import UpdateVerification from './pages/dashboard/admin/verification/update';
// import AdminLayout from './layouts/AdminLayout';

function App() {
  const [isSplashFinished, setIsSplashFinished] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('user'));

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
              <Route path="categorie" element={<ItemCategorie />}/>
              <Route path="location" element={<LocationList />}/>
              <Route path="item" element={<MissingItem />}/>
              <Route path="verification" element={<ItemVerification />}/>
              <Route path="storage" element={<StorageList />}/>

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
          </Routes>
        )}
      </>
    </ThemeProvider>
  );
}

export default App;
