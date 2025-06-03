
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Contact from './pages/Contact';
import { Routes, Route } from 'react-router-dom';
import GlobalStyle from './components/GlobalStyles/GlobalStyle';
import Layout from './layout';

function App() {
  return (
    <>
      <GlobalStyle />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
        </>
  );
}

export default App;
