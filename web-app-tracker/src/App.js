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
import {
  Container,
  Spinner,
  Button
} from "reactstrap";

function App() {
  // State to store the list of products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // State to update the list of products
  const [listUpdated, setListUpdated] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);

  // Get the list of products
  useEffect(() => {
    async function getProducts() {
      await axios.get("http://localhost:8000/api/products")
        .then(response => {
          if (response.status === 200) {
            setErrorMessage("");
            setProducts(response.data);
            setLoading(false);
          } else {
            // If the response status is not 200, log the response
            setErrorMessage("Error: " + response.status + " " + response.statusText);
            setLoading(false);
          }
        })
        .catch(error => {
          // Error handling
          setErrorMessage("Error: " + error)
          setLoading(false);
        });
    }
    getProducts();
  }, []);

  // Update the list of products if the listUpdated state is true
  useEffect(() => {
    if (listUpdated) {
      async function getProducts() {
        await axios.get("http://localhost:8000/api/products")
          .then(response => {
            if (response.status === 200) {
              setErrorMessage("");
              setProducts(response.data);
            } else {
              // Error handling
              setErrorMessage("Error: " + response.status + " " + response.statusText);
            }
            setLoading(false);
          })
          .catch(error => {
            // Error handling
            setErrorMessage("Error: " + error);
            setLoading(false);
          });
      }
      getProducts();
      setListUpdated(false);
    }
  }, [listUpdated]);

  if (loading) return (<Spinner className="spinner">Loading...</Spinner>);

  return (
    <Container fluid>
      <h1 className="text-center p-2">Catalog of Current Modern Web Applications</h1>
      <Container fluid>
        <h2 className="text-center p-2">List of Products</h2>
        {errorMessage ? (
          <h3 className="text-center p-2">{errorMessage}</h3>
        ) : (
          <>
            <Button color="primary" className="mb-2" onClick={() => setModalAdd(!modalAdd)}>Add New Product</Button>
            <ProductList products={products} setProducts={setProducts} error={errorMessage} />
          </>
        )}
      </Container>
      <ProductAddModal modal={modalAdd} setModalAdd={setModalAdd} setListUpdated={setListUpdated} />
    </Container>
  );
}

export default App;
