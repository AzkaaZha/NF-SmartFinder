import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Home from './pages/Public/Home/Home';
import Login from './pages/Auth/Login';  
import Contact from './pages/Public/Contact/Contact';
import { Routes, Route } from 'react-router-dom';
// import PrivateRoute from './components/privateRoute';
// import FormKlaimBarang from './pages/FormKlaimBarang';
// import LostItemForm from './pages/LostItemForm';
import LostItems from './pages/LostItem';
import { ThemeProvider } from 'styled-components';
import theme from './utils/theme';
import GlobalStyle from './components/GlobalStyles/GlobalStyle';

import PublicLayout from './layout/PublicLayout';
// import AdminLayout from './layouts/AdminLayout';

function App() {
  // const currentUser = JSON.parse(localStorage.getItem('user'));

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<Login />} />

          {/* Layout Public */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/lostitems" element={<LostItems />} />
          </Route>

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

        </Routes>
      </>
    </ThemeProvider>
  );
}

export default App;
