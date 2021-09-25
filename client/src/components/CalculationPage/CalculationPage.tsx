import { Row } from "react-bootstrap";
import { useHistory } from "react-router";
import {
  useAddHistoryMutation,
  useAllBanksQuery,
} from "../../store/generated/graphql";
import Header from "../Header/Header";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import s from "./CalculationPage.module.css";
import ErrorPage from "../ErrorPage/ErrorPage";
import Loading from "../Loading/Loading";
import { useMemo, useState } from "react";
import { Maybe } from "graphql/jsutils/Maybe";
import { showError } from "../../utils/showError";
import { calculateTheResult } from "../../utils/calculateTheResult";
import { useGetUserId } from "../../hooks/useGetUserId";

interface CalculationPagePropsType {}

const CalculationPage: React.FC<CalculationPagePropsType> = () => {
  const history = useHistory();
  const user = useGetUserId();

  const [initLoan, setInitLoan] = useState<number | undefined>(undefined);
  const [downPayment, setDownPayment] = useState<number | undefined>(undefined);
  const [bank, setBank] = useState<string>("");
  const [result, setResult] = useState<number | undefined>(undefined);

  type BankType = {
    id: string;
    name: string;
    image?: Maybe<string> | undefined;
    interest_rate: number;
    max_loan: number;
    min_down_pay: number;
    loan_term: number;
  };

  const {
    data: dataBanks,
    loading: loadingBanks,
    error: errorBanks,
  } = useAllBanksQuery();

  const [addHis, { data: dataHis, loading: loadingHis, error: errorHis }] =
    useAddHistoryMutation({
        refetchQueries: ["Bank"],
        fetchPolicy: "network-only",
    });

  const chosenBank: BankType | undefined = useMemo(() => {
    return dataBanks && dataBanks?.banks?.filter((obj) => obj?.id === bank)[0]!;
  }, [dataBanks, bank]);

  const hadleCalc = () => {
    if (!initLoan) return showError("Fill in the initial loan");
    if (!downPayment) return showError("Fill in the down payment");
    if (!bank) return showError("Choose the bank");
    if (initLoan > chosenBank!.max_loan)
      return showError(
        "Initial loan is bigger than maximum loan of the Bank. Please, lower the initial loan"
      );
    if (downPayment < chosenBank!.min_down_pay)
      return showError(
        "Down payment is lower than the minimum down payment of the Bank. Please, make increase the down payment"
      );
    if (downPayment > initLoan)
      return showError("Enter the right down payment");

    const res = calculateTheResult(
      initLoan,
      downPayment,
      chosenBank!.interest_rate,
      chosenBank!.loan_term
    );
    setResult(res);
    addHis({
      variables: {
        user,
        initLoan,
        downPay: downPayment,
        monthPay: res,
        id: chosenBank?.id!,
      },
    });
  };

  if (errorBanks) {
    return <ErrorPage />;
  }

  if (loadingBanks) {
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
      <Row className={s.formWrapper}>
        <Row className={s.formRowHeader}>
          <span>{"Calculate Mortgage:"}</span>
          {chosenBank && (
            <div className={s.desc}>
              <div>{`Interest rate: ${chosenBank.interest_rate} %`}</div>
              <div>{`Maximum loan: ${chosenBank.max_loan} $`}</div>
              <div>{`Minimum down payment: ${chosenBank.min_down_pay} $`}</div>
              <div>{`Term: ${chosenBank.min_down_pay} years`}</div>
            </div>
          )}
        </Row>
        <Form className={s.form}>
          <FloatingLabel
            controlId="initLoan"
            label="Enter initial Loan, $:"
            className="mb-3"
            style={{ width: "100%" }}
          >
            <Form.Control
              type="number"
              placeholder="Enter initial loan"
              name="initLoan"
              min={0}
              value={initLoan ? initLoan : ""}
              onChange={(e) => setInitLoan(+e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="downPayment"
            label="Enter down payment, $:"
            className="mb-3"
            style={{ width: "100%" }}
          >
            <Form.Control
              type="number"
              placeholder="Enter down payment"
              name="downPayment"
              min={0}
              value={downPayment ? downPayment : ""}
              onChange={(e) => setDownPayment(+e.target.value)}
            />
          </FloatingLabel>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formBanks"
            style={{ width: "100%" }}
          >
            <Form.Control
              as="select"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              style={{ cursor: "pointer" }}
            >
              <option>Choose the bank...</option>
              {dataBanks?.banks &&
                dataBanks?.banks.map((obj) => (
                  <option value={obj?.id!} className={s.option}>
                    {obj?.name}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
          <Button
            variant="success"
            size="lg"
            onClick={hadleCalc}
            className="mt-3 md-3"
          >
            Calculate
          </Button>
        </Form>
        {result && (
          <div className={s.result}>
            Monthly payment: {result.toFixed(2)} {"dollars"}
          </div>
        )}
      </Row>
    </>
  );
};

export default CalculationPage;
