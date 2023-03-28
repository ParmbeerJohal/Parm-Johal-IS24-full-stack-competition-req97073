import { useState } from "react";
import { Table, Button, ButtonGroup } from "reactstrap";
import { MdViewList, MdEdit, MdDelete } from "react-icons/md";
import ProductDetailModal from "./ProductDetailModal";
import ProductEditModal from "./ProductEditModal";
import ProductDeleteModal from "./ProductDeleteModal";

function ProductList(props) {
  const { products, error } = props;

  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const toggleModal = (product) => {
    setSelectedProduct(product);
    setModal(!modal);
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
              <tr>
                <td>
                  <ButtonGroup>
                    <Button color="primary" size="sm" title="Details" onClick={() => {toggleModal(product);}}>
                      <MdViewList />
                    </Button>
                    <Button color="warning" size="sm" className="Edit">
                      <MdEdit />
                    </Button>
                    <Button color="danger" size="sm" className="Delete">
                      <MdDelete />
                    </Button>
                  </ButtonGroup>
                  
                </td>
                <td>{product.productName}</td>
                <td>{product.scrumMasterName}</td>
                <td>{product.productOwnerName}</td>
                <td>{product.Developers.map((developer) =>(
                  <div>{developer}</div>
                ))}</td>
                <td>{new Date(product.startDate).toDateString()}</td>
                <td>{product.methodology}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ProductDetailModal modal={modal} toggle={toggleModal} selectedProduct={selectedProduct} />
        <ProductEditModal modal={modal} toggle={toggleModal} selectedProduct={selectedProduct} />
        <ProductDeleteModal modal={modal} toggle={toggleModal} selectedProduct={selectedProduct} />
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