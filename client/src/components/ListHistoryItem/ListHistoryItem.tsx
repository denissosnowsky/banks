import { Col, ListGroup, Row } from "react-bootstrap";
import s from "./ListHistoryItem.module.css";
import moment from "moment";

interface ListHistoryItemPropsType {
  initialLoan: number;
  downPayment: number;
  monthlyPayment: number;
  date: string;
}

const ListHistoryItem: React.FC<ListHistoryItemPropsType> = ({
  initialLoan,
  downPayment,
  monthlyPayment,
  date,
}) => {
  return (
    <>
      <ListGroup.Item>
        <Row className={s.history}>
          <Col md={10}>
            <div>
              <span>Initial loan:</span> {initialLoan} {"dollars"}
            </div>
            <div>
              <span>Down payment:</span> {downPayment} {"dollars"}
            </div>
            <div>
              <span>Monthly payment:</span> {monthlyPayment.toFixed(2)}{" "}
              {"dollars"}
            </div>
          </Col>
          <Col md={2} className={s.col}>
            {moment(date).calendar()}
          </Col>
        </Row>
      </ListGroup.Item>
    </>
  );
};

export default ListHistoryItem;
