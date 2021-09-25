import s from "./ListItem.module.css";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import defaultImg from "../../assets/bank.png";
import { googleUrl } from "../../config";

interface ListItemPropsType {
  img: string;
  name: string;
  id: string;
  deleteClb: () => void;
  changeClb: () => void;
}

const ListItem: React.FC<ListItemPropsType> = ({
  img,
  name,
  id,
  deleteClb,
  changeClb,
}) => {
  const history = useHistory();

  return (
    <>
      <ListGroup.Item>
        <Row className={s.row}>
          <Col md={2} className={s.imgCol}>
            <img alt="bank" src={img ? `${googleUrl}${img}` : defaultImg} className={s.image} />
          </Col>

          <Col md={3} className={s.nameCol}>
            <div>{name}</div>
          </Col>
          <Col md={4} className={s.nameCol}>
            <Button
              className={s.btn}
              onClick={() => history.push(`/banks/${id}`)}
              variant="success"
              size='lg'
            >
              Details...
            </Button>
          </Col>
          <Col md={3} className={s.bntsCol}>
            <Button className={s.btn} onClick={() => changeClb()}>
              Change
            </Button>
            <Button
              className={s.btn}
              variant="danger"
              onClick={() => deleteClb()}
            >
              Delete
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
    </>
  );
};

export default ListItem;
