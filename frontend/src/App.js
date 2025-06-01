import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Login from './pages/LoginSignup/Login';  
import Contact from './pages/Contact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/privateRoute';
import FormKlaimBarang from './pages/FormKlaimBarang';
import LostItemForm from './pages/LostItemForm';
import LostItems from './pages/LostItem';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login /> } />
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
      </Routes>
    </Router>
  );
}
export default App;
