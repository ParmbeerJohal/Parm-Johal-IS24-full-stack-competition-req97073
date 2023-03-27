import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductList from './components/ProductList';
import { Container } from 'reactstrap';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    
  useEffect(() => {
      async function getProducts() {
        const response = await axios.get('http://localhost:8000/api/webapps');
        if(response.status === 200) {
          setError(false);
          setProducts(response.data);
          setLoading(false);
        } else {
          setError(true);
        }
      }
      getProducts();
  }, []);

  return (
    <Container>
      <ProductList products={products} loading={loading} error={error} />
    </Container>
  );
}

export default App;
