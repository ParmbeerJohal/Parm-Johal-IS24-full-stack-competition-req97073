/**
 * @file ProductDeleteModal.js
 * @author Parm Johal
 * @description This is the component that displays the delete modal for a product.
 */

import axios from "axios";
import { useState } from "react";
import { Spinner } from "reactstrap";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap";

/**
 * @function ProductDeleteModal
 * @description This is the component that displays the delete modal for a product.
 * @param { modal, setModalDelete, selectedProduct, setRowDelete } props
 * @return {JSX.Element}
 */
function ProductDeleteModal(props) {
    const {
        modal,
        setModalDelete,
        selectedProduct,
        setRowDelete
    } = props;

    // State to store the loading spinner
    const [loading, setLoading] = useState(false);

    // State to store the error message
    const [errorMessage, setErrorMessage] = useState("");

    // Toggle the delete modal
    const toggle = () => {
        setModalDelete(!modal);
        setErrorMessage("");
    };

    // Handle the delete button click
    const handleDelete = async () => {
        setLoading(true);

        // Delete the product
        await axios.delete(`http://localhost:8000/api/products/${selectedProduct.productId}/delete`)
            .then(response => {
                if (response.status === 200) {
                    setLoading(false);
                    setRowDelete(true);
                    setErrorMessage("");
                    toggle();
                } else {
                    // Error handling
                    setLoading(false);
                    setErrorMessage("Product not deleted. Error: " + response.status + " " + response.statusText);
                }
            })
            .catch(error => {
                // Error handling
                setLoading(false);
                setErrorMessage("Product not deleted. Error: " + error);
            });
    }

    // If the loading spinner is active, return the spinner
    if (loading) return (<Spinner className="spinner">Loading...</Spinner>);

    return (
        <Modal isOpen={modal} toggle={toggle} size="lg">
            <ModalHeader toggle={toggle}>
                <strong>Confirm Delete</strong>
            </ModalHeader>
            <ModalBody>
                <p>Are you sure you want to delete the product "{selectedProduct.productName}"?</p>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>
                    Close
                </Button>
                <Button color="danger" onClick={handleDelete}>
                    Delete
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default ProductDeleteModal;
