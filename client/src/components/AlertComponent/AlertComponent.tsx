import s from "./AlertComponent.module.css";
import Alert from "react-bootstrap/Alert";
import { useGetErrorStatus } from "../../hooks/useGetErrorStatus";
import { useGetSuccessStatus } from "../../hooks/useGetSuccessStatus";

interface AlertComponentPropsType {}

const AlertComponent: React.FC<AlertComponentPropsType> = () => {
  const error = useGetErrorStatus();
  const success = useGetSuccessStatus();

  return (
    <>
      {error && (
        <Alert variant="danger" className={s.alertError}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" className={s.alertSuccess}>
          {success}
        </Alert>
      )}
    </>
  );
};

export default AlertComponent;
