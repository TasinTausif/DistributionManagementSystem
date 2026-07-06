import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Products, AddProduct, ProductDetails, Inventory } from './pages';
import Layout from './components/Layout';
import './index.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
