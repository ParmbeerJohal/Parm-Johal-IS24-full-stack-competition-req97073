/**
 * @file ProductDetailModal.js
 * @author Parm Johal
 * @description This is the component that displays the details of a product.
 */

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap";

/**
 * @function ProductDetailModal
 * @description This is the component that displays the details of a product.
 * @param {*} props
 * @return {JSX.Element}
 */
function ProductDetailModal(props) {
    const { modal, setModalDetail, selectedProduct } = props;

    // Toggle the modal
    const toggle = () => setModalDetail(!modal);

    return (
        <Modal isOpen={modal} toggle={toggle} size="lg">
            <ModalHeader toggle={toggle}>
                Product Details
            </ModalHeader>
            <ModalBody>
                <p>
                    <strong>Product Number: </strong>{selectedProduct.productId}
                </p>
                <p>
                    <strong>Product Name: </strong>{selectedProduct.productName}
                </p>
                <p>
                    <strong>Product Owner: </strong>{selectedProduct.productOwnerName}
                </p>
                <p>
                    <strong>Scrum Master: </strong>{selectedProduct.scrumMasterName}
                </p>
                <p>
                    <strong>Start Date: </strong>{new Date(selectedProduct.startDate).toDateString()}
                </p>
                <p>
                    <strong>Methodology: </strong>{selectedProduct.methodology}
                </p>
                <p>
                    <strong>Developers: </strong>{selectedProduct.Developers?.map((developer, index) => (
                        <div>{developer}</div>
                    ))}
                </p>
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" onClick={toggle}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default ProductDetailModal;
