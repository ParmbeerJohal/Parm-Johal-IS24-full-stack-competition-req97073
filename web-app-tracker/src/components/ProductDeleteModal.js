/**
 * @file ProductDeleteModal.js
 * @author Parm Johal
 * @description This is the component that displays the delete modal for a product.
 */

import axios from "axios";
import { useState } from "react";
import { Spinner } from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function ProductDeleteModal(props) {
    const { modal, setModalDelete, selectedProduct, setRowDelete } = props;

    // State to store the loading spinner
    const [loading, setLoading] = useState(false);

    // Toggle the delete modal
    const toggle = () => setModalDelete(!modal);

    // Handle the delete button click
    const handleDelete = async () => {
        console.log("Delete product");
        setLoading(true);

        // Delete the product
        await axios.delete(`http://localhost:8000/api/webapps/${selectedProduct.productId}/deletewebapp`)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    console.log("Product deleted");
                    setLoading(false);
                    setRowDelete(true);
                    toggle();
                } else {
                    console.log("Product not deleted");
                }
            })
            .catch(error => {
                console.log(error);
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
