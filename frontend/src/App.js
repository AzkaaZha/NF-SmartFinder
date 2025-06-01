import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Contact from './pages/Contact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LostItems from './pages/LandingPage/LostItem';
import FormKlaimBarang from './pages/FormKlaimBarang';
import LostItemForm from './pages/LostItemForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<LostItems />} />
        <Route path="/klaim" element={<FormKlaimBarang />} />
        <Route path="/form" element={<LostItemForm/>} />
      </Routes>
    </Router>
  );
}

export default App;