/**
 * @file ProductAddModal.js
 * @author Parm Johal
 * @description This is the modal component that displays the list of products.
 */

import { useState } from "react";
import axios from "axios";
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
    Spinner,
} from "reactstrap";

/**
 * @function ProductAddModal
 * @description This is the modal component that displays the list of products.
 * @param { modal, setModalAdd, setListUpdated } props
 * @return {JSX.Element}
 */
function ProductAddModal(props) {
    const {
        modal,
        setModalAdd,
        setListUpdated
    } = props;

    // State to store the product object
    const [productObject, setProductObject] = useState({
        productName: "",
        productOwnerName: "",
        scrumMasterName: "",
        startDate: "",
        methodology: "Agile",
        developers: ""
    });

    // State to store the loading spinner
    const [loading, setLoading] = useState(false);

    // State to store the error message
    const [errorMessage, setErrorMessage] = useState("");

    // Toggle the add modal and reset the error message
    const toggle = () => {
        setModalAdd(!modal);
        setErrorMessage("");
    };

    // Handle the form submission
    const handleSubmit = async (event) => {
        // Prevent the default form submission
        event.preventDefault();

        // Start the loading spinner
        setLoading(true);

        // Get the form data
        const data = new FormData(event.target);

        // Split the developers into an array
        const developers = data.get("developers").split(",");

        // If the developers array is greater than 5, return a validation error
        if (developers.length > 5) {
            setErrorMessage("You can only have a maximum of 5 developers.");
            setLoading(false);
            return;
        }

        // // Create the product object
        // const product = {
        //     productName: data.get("productName"),
        //     productOwnerName: data.get("productOwner"),
        //     scrumMasterName: data.get("scrumMaster"),
        //     startDate: data.get("startDate"),
        //     methodology: data.get("methodology"),
        //     Developers: developers,
        // };

        // Create the product object
        const product = {
            productName: productObject.productName,
            productOwnerName: productObject.productOwnerName,
            scrumMasterName: productObject.scrumMasterName,
            startDate: productObject.startDate,
            methodology: productObject.methodology,
            Developers: developers,
        };

        // Add the product
        await axios.post("http://localhost:3000/api/products/add", product)
            .then((response) => {
                if (response.status === 200) {
                    // Update the list of products and close the modal
                    setListUpdated(true);
                    setLoading(false);
                    toggle();
                    setErrorMessage("");

                    // Reset the product object
                    setProductObject({
                        productName: "",
                        productOwnerName: "",
                        scrumMasterName: "",
                        startDate: "",
                        methodology: "Agile",
                        developers: ""
                    });
                } else {
                    // Error handling
                    setErrorMessage("Product not added. Error: " + response.status + " " + response.statusText);
                    setLoading(false);
                }
            })
            .catch((error) => {
                // Error handling
                setErrorMessage("Product not added. Error: " + error);
                setLoading(false);
            });
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add Product</ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="productName"><strong>Product Name</strong></Label>
                        <Input
                            type="text"
                            name="productName"
                            id="productName"
                            placeholder="Enter the product name"
                            defaultValue={productObject.productName}
                            onChange={(event) => setProductObject({ ...productObject, productName: event.target.value })}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="productOwner"><strong>Product Owner</strong></Label>
                        <Input
                            type="text"
                            name="productOwner"
                            id="productOwner"
                            placeholder="Enter the product owner"
                            defaultValue={productObject.productOwnerName}
                            onChange={(event) => setProductObject({ ...productObject, productOwnerName: event.target.value })}
                            required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="scrumMaster"><strong>Scrum Master</strong></Label>
                        <Input
                            type="text"
                            name="scrumMaster"
                            id="scrumMaster"
                            placeholder="Enter the scrum master"
                            defaultValue={productObject.scrumMasterName}
                            onChange={(event) => setProductObject({ ...productObject, scrumMasterName: event.target.value })}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="startDate"><strong>Start Date</strong></Label>
                        <Input
                            type="date"
                            name="startDate"
                            id="startDate"
                            placeholder="Enter the start date"
                            defaultValue={productObject.startDate}
                            onChange={(event) => setProductObject({ ...productObject, startDate: event.target.value })}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="methodology"><strong>Methodology</strong></Label>
                        <Input
                            type="select"
                            name="methodology"
                            id="methodology"
                            defaultValue={productObject.methodology}
                            onChange={(event) => setProductObject({ ...productObject, methodology: event.target.value })}
                            required
                        >
                            <option value="Agile" default>Agile</option>
                            <option value="Waterfall">Waterfall</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="developers"><strong>Developers (up to 5)</strong></Label>
                        <Input
                            type="text"
                            name="developers"
                            id="developers"
                            placeholder="Enter the developers (comma separated)"
                            defaultValue={productObject.developers}
                            onChange={(event) => setProductObject({ ...productObject, developers: event.target.value })}
                            required
                        />
                    </FormGroup>
                    <ModalFooter>
                        {errorMessage && <p className="text-danger">{errorMessage}</p>}
                        <div>
                            <Button color="primary" type="submit" disabled={loading}>
                                {loading ? <Spinner size="sm" color="light" /> : "Submit"}
                            </Button>
                            <Button color="secondary" onClick={toggle} disabled={loading}>
                                Cancel
                            </Button>
                        </div>
                    </ModalFooter>
                </Form>
            </ModalBody>
        </Modal>
    );
}

export default ProductAddModal;
