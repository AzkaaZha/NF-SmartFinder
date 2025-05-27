import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LostItems from './pages/LandingPage/LostItem';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LostItems />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
