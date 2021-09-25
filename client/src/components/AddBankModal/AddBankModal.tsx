import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import s from "./AddBankModal.module.css";
import { ChangeEvent, useState } from "react";
import { AddBankMutationVariables } from "../../store/generated/graphql";
import { showError } from "../../utils/showError";

interface AddBankModalPropsType {
  isShow: boolean;
  setShow: (value: boolean) => void;
  addMutation: (args: AddBankMutationVariables) => void;
}

const AddBankModal: React.FC<AddBankModalPropsType> = ({
  isShow,
  setShow,
  addMutation,
}) => {
  const [name, setName] = useState<string>("");
  const [interestRate, setInterestRate] = useState<number | undefined>(
    undefined
  );
  const [maxLoan, setMaxLoan] = useState<number | undefined>(undefined);
  const [minDownPay, setMinDownPay] = useState<number | undefined>(undefined);
  const [loanTerm, setLoanTerm] = useState<number | undefined>(undefined);
  const [photo, setPhoto] = useState<File | undefined>(undefined);
  const [preload, setPreload] = useState<string | ArrayBuffer | null>(null);

  const handlePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.currentTarget?.files && event?.currentTarget?.files.length > 0) {
      setPhoto(event?.currentTarget?.files[0]);

      var oFReader = new FileReader();
      oFReader.readAsDataURL(event?.currentTarget?.files[0]);
      oFReader.onload = function (oFREvent) {
        setPreload(oFREvent?.target?.result!);
      };
    }
  };

  const handleCancel = () => {
    setShow(false);
  };

  const handleAdd = () => {
    if (!name) return showError("Fill in the name");
    if (!interestRate) return showError("Fill in the rate");
    if (!maxLoan) return showError("Fill in the maximum loan sum");
    if (!minDownPay) return showError("Fill in the minimum down pay");
    if (!loanTerm) return showError("Fill in the loan term");
    if (minDownPay > maxLoan) return showError("Down payment should be lower");
    const args: AddBankMutationVariables = {
      name: name!,
      interestRate: interestRate!,
      maxLoan: maxLoan!,
      minDownPay: minDownPay!,
      loanTerm: loanTerm!,
      image: photo,
    };
    addMutation(args);
    setShow(false);
  };

  return (
    <Modal size="lg" show={isShow} onHide={() => {}} className={s.wrapper}>
      <Modal.Header>
        <Modal.Title id="example-modal-sizes-title-lg">
          Add a new Bank
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} className="m-3" controlId="name">
            <Col md={5} className={s.firstCol}>
              <Form.Label column sm="2">
                Name:
              </Form.Label>
            </Col>
            <Col md={7}>
              <Form.Control
                type="text"
                placeholder="Fill in the name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="m-3" controlId="interestRate">
            <Col md={5} className={s.firstCol}>
              <Form.Label column sm="2">
                Interest rate, %:
              </Form.Label>
            </Col>
            <Col md={7}>
              <Form.Control
                type="number"
                placeholder="Fill in the interest rate"
                value={interestRate ? interestRate : ''}
                onChange={(e) => setInterestRate(+e.target.value)}
                min={0}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="m-3" controlId="maxLoan">
            <Col md={5} className={s.firstCol}>
              <Form.Label column sm="2">
                Maximum loan, $:
              </Form.Label>
            </Col>
            <Col md={7}>
              <Form.Control
                type="number"
                placeholder="Fill in the maximum loan"
                value={maxLoan ? maxLoan : ''}
                onChange={(e) => setMaxLoan(+e.target.value)}
                min={0}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="m-3" controlId="minDownPay">
            <Col md={5} className={s.firstCol}>
              <Form.Label column sm="2">
                Minimum down payment, $:
              </Form.Label>
            </Col>
            <Col md={7}>
              <Form.Control
                type="number"
                placeholder="Fill in the minimum down payment"
                value={minDownPay ? minDownPay : ''}
                onChange={(e) => setMinDownPay(+e.target.value)}
                min={0}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="m-3" controlId="loanTerm">
            <Col md={5} className={s.firstCol}>
              <Form.Label column sm="2">
                Loan term, years:
              </Form.Label>
            </Col>
            <Col md={7}>
              <Form.Control
                type="number"
                placeholder="Fill in loan term"
                value={loanTerm ? loanTerm : ''}
                onChange={(e) => setLoanTerm(+e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Col className={s.imageCol}>
              <div className={s.imgHeader}>
                <input
                  type={"file"}
                  onChange={handlePhoto}
                  name="img"
                  id="img"
                  multiple
                />
                <label htmlFor="img" className={s.imgLabel}></label>
                <Button variant="white" className={s.imageBtn}>
                  Add photo...
                </Button>
              </div>
            </Col>
          </Form.Group>
        </Form>
        <Row className={s.preloadRow}>
          <>
            {preload ? (
              <div className="d-flex flex-column align-items-center w-100 mb-3">
                <div className={s.preload}>
                  <img src={preload as string}></img>
                </div>
              </div>
            ) : null}
          </>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <Button
              variant="danger"
              className="my-2 w-75"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Col>
          <Col className="d-flex justify-content-center">
            <Button variant="success" className="my-2 w-75" onClick={handleAdd}>
              Add
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default AddBankModal;
