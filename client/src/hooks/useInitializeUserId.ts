import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { userIdVar } from "../store/variables";
import { deleteUser } from "../utils/deleteUser";
import { initializeUser } from "../utils/initializeUser";

export const useInitializedUserId = () => {
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const id = uuidv4();
    initializeUser(id);
    setUserId(userIdVar());

    return () => {
      deleteUser();
      setUserId(userIdVar());
    };
  }, []);

  return userId;
};
