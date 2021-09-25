import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import s from "./DeleteBankModal.module.css";

interface DeleteBankModalPropsType {
  isShow: number;
  setShow: (value: number) => void;
  addMutation: () => void;
  name: string;
}

const DeleteBankModal: React.FC<DeleteBankModalPropsType> = ({
  isShow,
  setShow,
  addMutation,
  name,
}) => {
  const handleCancel = () => {
    setShow(0);
  };

  const handleConfirm = () => {
    addMutation();
    setShow(0);
  };

  return (
    <Modal
      size="lg"
      show={Boolean(isShow)}
      onHide={() => {}}
      className={s.wrapper}
    >
      <Modal.Header>
        <Modal.Title id="example-modal-sizes-title-lg">
          {`Do You really want to delete ${name} bank?`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col className="d-flex justify-content-center">
            <Button
              variant="danger"
              className="my-2 w-75"
              onClick={handleCancel}
            >
              No
            </Button>
          </Col>
          <Col className="d-flex justify-content-center">
            <Button
              variant="success"
              className="my-2 w-75"
              onClick={handleConfirm}
            >
              Yes
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteBankModal;
