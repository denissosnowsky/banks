import Header from "../Header/Header";
import s from "./BankPage.module.css";
import { useHistory, useParams } from "react-router-dom";
import { useBankQuery } from "../../store/generated/graphql";
import ErrorPage from "../ErrorPage/ErrorPage";
import Loading from "../Loading/Loading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container, ListGroup } from "react-bootstrap";
import { googleUrl } from "../../config";
import { useState } from "react";
import { useGetUserId } from "../../hooks/useGetUserId";
import defaultImg from "../../assets/bank.png";
import ListHistoryItem from "../ListHistoryItem/ListHistoryItem";

interface BankPagePropsType {}

const BankPage: React.FC<BankPagePropsType> = () => {
  const history = useHistory();
  const params: { id: string } = useParams();
  const user = useGetUserId();

  const { data, loading, error } = useBankQuery({
    variables: { id: params.id, user },
    fetchPolicy: "network-only",
  });

  if (error) {
    return <ErrorPage />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header
        text={"Back to the List"}
        btnOnClick={() => history.push("/banks")}
        color={"primary"}
        position={"start"}
        icon={"bi bi-arrow-left-circle"}
      />
      <Container data-testid="container">
        <Row className={s.infoRow}>
          <Col md={4}>
            <div className={s.imgWrapper}>
              <img
                alt="bankImg"
                src={
                  data!.bank?.image
                    ? `${googleUrl}${data!.bank?.image}`
                    : defaultImg
                }
              />
            </div>
          </Col>
          <Col md={8}>
            <Row className={s.listRow}>
              <Col md={5} className={s.title}>
                {"Bank name: "}
              </Col>
              <Col md={7} className={s.desc}>
                {data?.bank?.name}
              </Col>
            </Row>
            <Row className={s.listRow}>
              <Col md={5} className={s.title}>
                {"Interest rate: "}
              </Col>
              <Col md={7} className={s.desc}>
                {data?.bank?.interest_rate} {"%"}
              </Col>
            </Row>
            <Row className={s.listRow}>
              <Col md={5} className={s.title}>
                {"Maximum loan: "}
              </Col>
              <Col md={7} className={s.desc}>
                {data?.bank?.max_loan} {"dollars"}
              </Col>
            </Row>
            <Row className={s.listRow}>
              <Col md={5} className={s.title}>
                {"Minimum down payment: "}
              </Col>
              <Col md={7} className={s.desc}>
                {data?.bank?.min_down_pay} {"dollars"}
              </Col>
            </Row>
            <Row>
              <Col md={5} className={s.title}>
                {"Loan term: "}
              </Col>
              <Col md={7} className={s.desc}>
                {data?.bank?.loan_term} {"years"}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className={s.formRow}>
          <Row className={s.formRowHeader}>
            <span>{"History of your calculation"}</span>
          </Row>
          <Row className={s.formRowMain}>
            <ListGroup>
              {data!.bank!.history!.length > 0 ? (
                data!.bank!.history!.map((obj) => (
                  <ListHistoryItem
                    key={obj?.id}
                    initialLoan={obj?.init_loan!}
                    downPayment={obj?.down_pay!}
                    date={obj?.createdAt!}
                    monthlyPayment={obj?.month_pay!}
                  />
                ))
              ) : (
                <div className={s.emptyHis}>The history is empty</div>
              )}
            </ListGroup>
          </Row>
        </Row>
      </Container>
    </>
  );
};

export default BankPage;
