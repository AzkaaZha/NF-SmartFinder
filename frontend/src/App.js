import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Contact from './pages/Contact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormKlaimBarang from './pages/FormKlaimBarang';
import LostItemForm from './pages/LostItemForm';
import LostItems from './pages/LostItem';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/klaim" element={<FormKlaimBarang />} />
        <Route path="/form" element={<LostItemForm/>} />
        <Route path="/lostitems" element={<LostItems />} />
      </Routes>
    </Router>
  );
}

export default App;