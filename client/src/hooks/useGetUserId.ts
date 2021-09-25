import { userIdVar } from "../store/variables";

export const useGetUserId = () => {
  const id = userIdVar();
  return id;
};
