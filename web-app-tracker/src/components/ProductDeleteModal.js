import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function ProductDeleteModal(props) {
    const { modal, toggle, selectedProduct } = props;
  return (
    <Modal isOpen={modal} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>
        {selectedProduct.productName}
      </ModalHeader>
      <ModalBody>
        <p><strong>Product Owner Name: </strong>{selectedProduct.productOwnerName}</p>
        <p>
          <strong>Methodology: </strong>{selectedProduct.methodology}
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

export default ProductDeleteModal;
