import { makeVar } from "@apollo/client";

export const errorAlertVar = makeVar<string>('');

export const successAlertVar = makeVar<string>('');

export const userIdVar = makeVar<string>('');