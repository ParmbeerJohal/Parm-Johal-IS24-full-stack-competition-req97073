/**
 * @file App.js
 * @author Parm Johal
 * @description This is the main entry point for the web app tracker frontend.
 */

import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import { Container, Spinner } from "reactstrap";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getProducts() {
      await axios.get("http://localhost:8000/api/webapps")
        .then(response => {
          //console.log(response);
          if (response.status === 200) {
            setError(false);
            setProducts(response.data);
            setLoading(false);
          } else {
            console.log(response);
            setError(true);
          }
        })
        .catch(error => {
          console.log(error);
          setError(true);
        });
    }
    getProducts();
  }, []);

  if (loading) return (<Spinner className="spinner">Loading...</Spinner>);

  return (
    <Container fluid>
      <h1 className="text-center p-2">Catalog of Current Modern Web Applications</h1>
      <Container fluid>
        <ProductList products={products} setProducts={setProducts} error={error} />
      </Container>
    </Container>
  );
}

export default App;
