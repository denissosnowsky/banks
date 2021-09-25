import { successAlertVar } from "../store/variables";

export const showSuccess = (message: string) => {
  successAlertVar(message);
  setTimeout(() => successAlertVar(""), 3000);
};
