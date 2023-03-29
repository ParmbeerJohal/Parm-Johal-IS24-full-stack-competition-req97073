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
 * @param {*} props 
 * @return {JSX.Element}
 */
function ProductEditModal(props) {
  const { modal, setModalEdit, selectedProduct, setListUpdated, setSelectedProduct } = props;
  const [loading, setLoading] = useState(false);

  const toggle = () => setModalEdit(!modal);

  // Handle the form submission
  const handleSubmit = async (event) => {
    // Prevent the default form submission
    event.preventDefault();

    // Start the loading spinner
    setLoading(true);

    // Get the form data
    const data = new FormData(event.target);
    const developers = data.get("developers").split(",");
    const product = {
      productName: data.get("productName"),
      productId: data.get("productNumber"),
      productOwnerName: data.get("productOwner"),
      scrumMasterName: data.get("scrumMaster"),
      startDate: data.get("startDate"),
      methodology: data.get("methodology"),
      Developers: developers,
    };

    // Update the product
    await axios.put(`http://localhost:8000/api/webapps/${selectedProduct.productId}/update`, product)
      .then((response) => {
        if (response.status === 200) {
          // Update the list of products and close the modal
          setListUpdated(true);

          // Update the selected product
          setSelectedProduct(product);

          // Close the modal
          toggle();
        } else {
          console.log("Product not edited");
        }
        // Stop the loading spinner
        setLoading(false);
      })
      // Catch any errors
      .catch((error) => {
        console.log(error);
        setLoading(false);
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
          <FormGroup>
            <Label for="productName">Product Name</Label>
            <Input
              type="text"
              name="productName"
              id="productName"
              placeholder="Enter product name"
              defaultValue={selectedProduct.productName}
            />
          </FormGroup>
          <FormGroup>
            <Label for="productNumber">Product Number</Label>
            <Input
              type="text"
              name="productNumber"
              id="productNumber"
              placeholder="Enter product number"
              defaultValue={selectedProduct.productId}
            />
          </FormGroup>
          <FormGroup>
            <Label for="productOwner">Product Owner</Label>
            <Input
              type="text"
              name="productOwner"
              id="productOwner"
              placeholder="Enter product owner"
              defaultValue={selectedProduct.productOwnerName}
            />
          </FormGroup>
          <FormGroup>
            <Label for="scrumMaster">Scrum Master</Label>
            <Input
              type="text"
              name="scrumMaster"
              id="scrumMaster"
              placeholder="Enter scrum master"
              defaultValue={selectedProduct.scrumMasterName}
            />
          </FormGroup>
          <FormGroup>
            <Label for="startDate">Start Date</Label>
            <Input
              type="date"
              name="startDate"
              id="startDate"
              placeholder="Enter start date"
              defaultValue={moment(selectedProduct.startDate).format("YYYY-MM-DD")}
            />
          </FormGroup>
          <FormGroup>
            <Label for="methodology">Methodology</Label>
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
            <Label for="developers">Developers</Label>
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
            {selectedProduct.Developers?.map((developer) => (
              <div>{developer}</div>
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
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
