/**
 * @file ProductEditModal.js
 * @author Parm Johal
 * @description This is the component that displays the edit modal for a product.
 */

import { useState } from "react";
import axios from "axios";
import moment from "moment";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  Spinner,
} from "reactstrap";

/**
 * @function ProductEditModal
 * @description This is the component that displays the edit modal for a product.
 * @param { modal, setModalEdit, selectedProduct, setListUpdated, setSelectedProduct } props
 * @return {JSX.Element}
 */
function ProductEditModal(props) {
  const {
    modal,
    setModalEdit,
    selectedProduct,
    setListUpdated,
    setSelectedProduct
  } = props;

  // State to store the loading spinner
  const [loading, setLoading] = useState(false);

  // Toggle the edit modal and reset the error message
  const toggle = () => {
    setModalEdit(!modal);
    setErrorMessage("");
  };

  // State to store the error message
  const [errorMessage, setErrorMessage] = useState("");

  // Handle the form submission
  const handleSubmit = async (event) => {
    // Prevent the default form submission
    event.preventDefault();

    // Start the loading spinner
    setLoading(true);

    // Get the form data
    const data = new FormData(event.target);
    const developers = data.get("developers").split(",");

    // If the developers array is greater than 5, return a validation error
    if (developers.length > 5) {
      setErrorMessage("You can only have a maximum of 5 developers.");
      setLoading(false);
      return;
    }

    // Create the product object
    const product = {
      productName: data.get("productName"),
      productId: selectedProduct.productId,
      productOwnerName: data.get("productOwner"),
      scrumMasterName: data.get("scrumMaster"),
      startDate: selectedProduct.startDate,
      methodology: data.get("methodology"),
      Developers: developers,
    };

    // Update the product
    await axios.put(`http://localhost:8000/api/products/${selectedProduct.productId}/update`, product)
      .then((response) => {
        if (response.status === 200) {
          // Update the list of products and close the modal
          setListUpdated(true);

          // Update the selected product
          setSelectedProduct(product);

          setErrorMessage("");

          // Close the modal
          toggle();
        } else {
          // Error handling
          setErrorMessage("Product not edited. Error: " + response.status + " " + response.statusText);
        }
        // Stop the loading spinner
        setLoading(false);
      })
      // Catch any errors
      .catch((error) => {
        // Error handling
        setLoading(false);
        setErrorMessage("Product not edited. Error: " + error);
      });
  };

  // If the form is loading, display the spinner
  if (loading) return <Spinner className="spinner">Loading...</Spinner>;

  return (
    <Modal isOpen={modal} toggle={toggle} size="lg">
      <Form onSubmit={handleSubmit}>
        <ModalHeader toggle={toggle}>
          Edit Product Details
        </ModalHeader>
        <ModalBody>
          <p><strong>Product Number:</strong></p>
          <p>{selectedProduct.productId}</p>
          <FormGroup>
            <Label for="productName"><strong>Product Name</strong></Label>
            <Input
              type="text"
              name="productName"
              id="productName"
              placeholder="Enter product name"
              defaultValue={selectedProduct.productName}
            />
          </FormGroup>
          <FormGroup>
            <Label for="productOwner"><strong>Product Owner</strong></Label>
            <Input
              type="text"
              name="productOwner"
              id="productOwner"
              placeholder="Enter product owner"
              defaultValue={selectedProduct.productOwnerName}
            />
          </FormGroup>
          <FormGroup>
            <Label for="scrumMaster"><strong>Scrum Master</strong></Label>
            <Input
              type="text"
              name="scrumMaster"
              id="scrumMaster"
              placeholder="Enter scrum master"
              defaultValue={selectedProduct.scrumMasterName}
            />
          </FormGroup>
          <Label><strong>Start Date</strong></Label>
          <p>{moment(selectedProduct.startDate, "YYYY-MM-DD").format("YYYY-MM-DD")}</p>
          <FormGroup>
            <Label for="methodology"><strong>Methodology</strong></Label>
            <Input
              type="select"
              name="methodology"
              id="methodology"
              defaultValue={selectedProduct.methodology}
            >
              <option value="Agile">Agile</option>
              <option value="Waterfall">Waterfall</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="developers"><strong>Developers</strong></Label>
            <InputGroup>
              <Input
                type="text"
                name="developers"
                id="developers"
                placeholder="Enter developers"
                defaultValue={selectedProduct.Developers}
              />
            </InputGroup>
          </FormGroup>
          <hr />
          <h4>Current Developers</h4>
          <div>
            {selectedProduct.Developers?.map((developer, index) => (
              <div>{developer}</div>
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
          <Button color="primary" type="submit">
            Confirm
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}

export default ProductEditModal;
