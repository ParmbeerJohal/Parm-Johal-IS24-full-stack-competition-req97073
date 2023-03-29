/**
 * @file ProductList.js
 * @author Parm Johal
 * @description This is the component that displays the list of products.
 */

import { useEffect, useState } from "react";
import { Table, Button, ButtonGroup } from "reactstrap";
import Moment from 'react-moment';
import { MdViewList, MdEdit, MdDelete } from "react-icons/md";
import ProductDetailModal from "./ProductDetailModal";
import ProductEditModal from "./ProductEditModal";
import ProductDeleteModal from "./ProductDeleteModal";

function ProductList(props) {
  const { products, setProducts, error } = props;

  // State to store the selected product
  const [selectedProduct, setSelectedProduct] = useState({});

  // Modal states
  const [modalDetail, setModalDetail] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  
  // State to update the list of products
  const [listUpdated, setListUpdated] = useState(false);
  const [rowDelete, setRowDelete] = useState(false);

  useEffect(() => {
    // Update the selected product in the list of products
    if(listUpdated) {
      console.log("ProductList useEffect edit");
      setProducts(() => {
        return products.map((product) => {
          if (product.productId === selectedProduct.productId) {
            return selectedProduct;
          }
          return product;
        });
      });
      setListUpdated(false);
    }

    // Delete the selected product from the list of products
    if(rowDelete) {
      console.log("ProductList useEffect delete");
      setProducts(() => {
        return products.filter((product) => product.productId !== selectedProduct.productId);
      }
      );
      setRowDelete(false);
    }
  }, [listUpdated, rowDelete, products, setProducts, selectedProduct]);

  // Toggle the detail modal
  const toggleModalDetail = (product) => {
    modalDetail ? setSelectedProduct(null) : setSelectedProduct(product);
    setModalDetail(!modalDetail);
  };

  // Toggle the edit modal
  const toggleModalEdit = (product) => {
    setSelectedProduct(product);
    setModalEdit(!modalEdit);
  };

  // Toggle the delete modal
  const toggleModalDelete = (product) => {
    setSelectedProduct(product);
    setModalDelete(!modalDelete);
  };

  if (error) return (<div>Error getting data!</div>);

  if (products) {
    return (
      <>
        <Table responsive hover>
          <thead>
            <tr>
              <th>
                Actions
              </th>
              <th>
                Product Name
              </th>
              <th>
                Scrum Master
              </th>
              <th>
                Product Owner
              </th>
              <th>
                Developer Names
              </th>
              <th>
                Start Date
              </th>
              <th>
                Methodology
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.productId}>
                <td>
                  <ButtonGroup>
                    <Button color="primary" size="sm" title="Details" onClick={() => { toggleModalDetail(product); }}>
                      <MdViewList />
                    </Button>
                    <Button color="warning" size="sm" className="Edit" onClick={() => { toggleModalEdit(product); }}>
                      <MdEdit />
                    </Button>
                    <Button color="danger" size="sm" className="Delete" onClick={() => { toggleModalDelete(product); }}>
                      <MdDelete />
                    </Button>
                  </ButtonGroup>

                </td>
                <td>{product.productName}</td>
                <td>{product.scrumMasterName}</td>
                <td>{product.productOwnerName}</td>
                <td>{product.Developers.map((developer) => (
                  <div>{developer}</div>
                ))}</td>
                <td><Moment date={product.startDate} format={"YYYY-MM-DD"} /></td>
                <td>{product.methodology}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ProductDetailModal modal={modalDetail} setModalDetail={setModalDetail} selectedProduct={selectedProduct} />
        <ProductEditModal modal={modalEdit} setModalEdit={setModalEdit} selectedProduct={selectedProduct} setListUpdated={setListUpdated} setSelectedProduct={setSelectedProduct}  />
        <ProductDeleteModal modal={modalDelete} setModalDelete={setModalDelete} selectedProduct={selectedProduct} setRowDelete={setRowDelete} />
      </>
    );
  } else {
    return (
      <div>
        <h1>Unable to load product list!</h1>
      </div>
    );
  }
}

export default ProductList;