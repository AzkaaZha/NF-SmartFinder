import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ItemList from './pages/LandingPage/ItemList';

function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<ItemList></ItemList>}/>
      </Routes>
    </Router>
  );
}

export default App;
