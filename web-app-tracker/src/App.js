/**
 * @file App.js
 * @author Parm Johal
 * @description This is the main entry point for the web app tracker frontend.
 */

import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import ProductAddModal from "./components/ProductAddModal";
import { Container, Spinner, Button } from "reactstrap";

function App() {
  // State to store the list of products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State to update the list of products
  const [listUpdated, setListUpdated] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);

  // Get the list of products
  useEffect(() => {
    async function getProducts() {
      await axios.get("http://localhost:8000/api/products")
        .then(response => {
          if (response.status === 200) {
            setError(false);
            setProducts(response.data);
            setLoading(false);
          } else {
            console.log(response);
            setError(true);
            setLoading(false);
          }
        })
        .catch(error => {
          console.log(error);
          setError(true);
        });
    }
    getProducts();
  }, []);

  // Update the list of products if the listUpdated state is true
  useEffect(() => {
    if(listUpdated) {
      async function getProducts() {
        await axios.get("http://localhost:8000/api/products")
          .then(response => {
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
      setListUpdated(false);
    }
  }, [listUpdated]);

  if (loading) return (<Spinner className="spinner">Loading...</Spinner>);

  if (error) return (<h1 className="text-center p-2">Error loading products</h1>);

  return (
    <Container fluid>
      <h1 className="text-center p-2">Catalog of Current Modern Web Applications</h1>
      <Container fluid>
        <h2 className="text-center p-2">List of Products</h2>
        <Button color="primary" className="mb-2" onClick={() => setModalAdd(!modalAdd)}>Add New Product</Button>
        <ProductList products={products} setProducts={setProducts} error={error} />
      </Container>
      <ProductAddModal modal={modalAdd} setModalAdd={setModalAdd} setListUpdated={setListUpdated} />
    </Container>
  );
}

export default App;
