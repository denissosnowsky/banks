import { useReactiveVar } from "@apollo/client";
import { successAlertVar } from "../store/variables";

export const useGetSuccessStatus = () => {
  return useReactiveVar(successAlertVar);
};
