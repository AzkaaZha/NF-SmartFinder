import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Login from './pages/Auth/login/Login';  
import Home from './pages/Public/Home/Home';
import Contact from './pages/Public/Contact/Contact';
import KlaimItem from './pages/KlaimItem';
import LostItemForm from './pages/Public/ItemForm/LostItemForm';
import AdminDashboard from "./pages/dashboard/admin/adminDashboard";
import UserManagement from "./pages/dashboard/admin/user/userManagemen";
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

<<<<<<< HEAD
          {/* location */}
          <Route path="createloc" element={<CreateLocation />} />
          <Route path="updateloc" element={<UpdateLocation />} />
          
          {/* Layout Admin / Private */}
          {/* <Route element={<AdminLayout />}>
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
                  {currentUser ? (
                    <LostItemForm userId={currentUser.id} userName={currentUser.name} />
                  ) : (
                    <p>Loading user data...</p>
                  )}
                </PrivateRoute>
              }
            />
          </Route> */}
=======
            {/* Admin Dashboard route */}
            <Route path="/dashboard" element={<AdminDashboardLayout />}>
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="user" element={<UserManagement />} />
              <Route path="categorie" element={<ItemCategorie />}/>
              <Route path="location" element={<LocationList />}/>
              <Route path="item" element={<MissingItem />}/>
              <Route path="verification" element={<ItemVerification />}/>
>>>>>>> ee6f0029ef73c74ccdd53c2219defcaa7a16ac99

              {/* Location routes */}
              <Route path="create" element={<CreateLocation />} />
              <Route path="update" element={<UpdateLocation />} />
            </Route>
          </Routes>
        )}
      </>
    </ThemeProvider>
  );
}

export default App;
