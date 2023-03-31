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
 * @param {*} props
 * @return {JSX.Element}
 */
function ProductAddModal(props) {
    const { modal, setModalAdd, setListUpdated } = props;
    const [loading, setLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

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

        const product = {
            productName: data.get("productName"),
            productOwnerName: data.get("productOwner"),
            scrumMasterName: data.get("scrumMaster"),
            startDate: data.get("startDate"),
            methodology: data.get("methodology"),
            Developers: developers,
        };

        // Add the product
        await axios.post("http://localhost:8000/api/products/add", product)
            .then((response) => {
                if (response.status === 200) {
                    // Update the list of products and close the modal
                    setListUpdated(true);
                    setLoading(false);
                    toggle();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add Product</ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="productName">Product Name</Label>
                        <Input type="text" name="productName" id="productName" placeholder="Enter the product name" required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="productOwner">Product Owner</Label>
                        <Input type="text" name="productOwner" id="productOwner" placeholder="Enter the product owner" required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="scrumMaster">Scrum Master</Label>
                        <Input type="text" name="scrumMaster" id="scrumMaster" placeholder="Enter the scrum master" required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="startDate">Start Date</Label>
                        <Input type="date" name="startDate" id="startDate" placeholder="Enter the start date" required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="methodology">Methodology</Label>
                        <Input type="select" name="methodology" id="methodology" required>
                            <option value="Agile">Agile</option>
                            <option value="Waterfall">Waterfall</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="developers">Developers (up to 5)</Label>
                        <Input type="text" name="developers" id="developers" placeholder="Enter the developers (comma separated)" required />
                        <p className="text-danger">{errorMessage}</p>
                    </FormGroup>
                    <ModalFooter>
                        <Button color="primary" type="submit" disabled={loading}>
                            {loading ? <Spinner size="sm" color="light" /> : "Submit"}
                        </Button>
                        <Button color="secondary" onClick={toggle} disabled={loading}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Form>
            </ModalBody>
        </Modal>
    );
}

export default ProductAddModal;
