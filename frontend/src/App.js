import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Login from './pages/LoginSignup/Login';  
import Contact from './pages/Contact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/privateRoute';
import KlaimItem from './pages/KlaimItem'; // Importing KlaimItem
import LostItemForm from './pages/LostItemForm';
import LostItems from './pages/LostItem';

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
      </Routes>
    </Router>
  );
}

export default App;
