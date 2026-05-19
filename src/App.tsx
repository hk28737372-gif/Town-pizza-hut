import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Deals from './pages/Deals';
import GalleryPage from './pages/Gallery';
import Branches from './pages/Branches';
import About from './pages/About';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}
