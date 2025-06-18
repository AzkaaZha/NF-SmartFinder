import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// Public pages
import Login from './pages/Auth/login/Login';
import Home from './pages/Public/Home/Home';
import Contact from './pages/Public/Contact/Contact';
import LostItemForm from './pages/Public/ItemForm/LostItemForm';
import LostItems from './pages/Public/LostItems/LostItem';
import KlaimItem from './pages/KlaimItem';

// Layout
import PublicLayout from './layout/PublicLayout';
import AdminDashboardLayout from './layout/dashboard/admin';

// Admin Pages
import AdminDashboard from './pages/dashboard/admin/adminDashboard';
import UserManagement from './pages/dashboard/admin/user/userManagement';
import ItemCategorie from './pages/dashboard/admin/categorie/ItemCategorie';
import LocationList from './pages/dashboard/admin/location/locationList';
import MissingItem from './pages/dashboard/admin/item/missingItem';
import ItemVerification from './pages/dashboard/admin/verification/itemVerification';
import CreateLocation from './pages/dashboard/admin/location/create';
import UpdateLocation from './pages/dashboard/admin/location/update';

// Theme and Global Style
import theme from './utils/theme';
import GlobalStyle from './components/GlobalStyles/GlobalStyle';
import SplashScreen from './components/SplashScreen/SplashScreen';

// ✅ Protected Route Component
const ProtectedRoute = ({ element, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userInfo = JSON.parse(localStorage.getItem("user"));

  if (!token || !userInfo) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userInfo.role)) {
    return <Navigate to="/" replace />;
  }

  return element;
};

function App() {
  const [isSplashFinished, setIsSplashFinished] = useState(false);

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

            {/* Public Layout */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/lostitems" element={<LostItems />} />

              {/* ✅ User, Satpam, Admin can access */}
              <Route
                path="/form"
                element={
                  <ProtectedRoute
                    allowedRoles={["user", "satpam", "admin"]}
                    element={<LostItemForm />}
                  />
                }
              />
              <Route
                path="/klaim/:id"
                element={
                  <ProtectedRoute
                    allowedRoles={["user", "satpam", "admin"]}
                    element={<KlaimItem />}
                  />
                }
              />
            </Route>

            {/* ✅ Satpam & Admin Dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute
                  allowedRoles={["satpam", "admin"]}
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
