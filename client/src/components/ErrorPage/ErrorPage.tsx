import Header from "../Header/Header";
import s from "./ErrorPage.module.css";
import { useHistory } from "react-router-dom";
import Row from "react-bootstrap/Row";

const ErrorPage: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <Header
        text={"Back to the List"}
        btnOnClick={() => history.push("/banks")}
        color={"primary"}
        position={"start"}
        icon={"bi bi-arrow-left-circle"}
      />
      <Row>
        <div className={s.text}>{"Some Error"}</div>
      </Row>
    </>
  );
};

export default ErrorPage;
