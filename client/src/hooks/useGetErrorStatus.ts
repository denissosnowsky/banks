import { useReactiveVar } from "@apollo/client";
import { errorAlertVar } from "../store/variables";

export const useGetErrorStatus = () => {
  return useReactiveVar(errorAlertVar);
};
