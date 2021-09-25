import { errorAlertVar } from "../store/variables";

export const showError = (newError: string) => {
  errorAlertVar(newError);
  setTimeout(() => errorAlertVar(""), 3000);
};
