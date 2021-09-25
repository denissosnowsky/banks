export const calculateTheResult = (
  initLoan: number,
  downPay: number,
  interest: number,
  term: number
) => {
  const int = interest / 100;
  const monPay = term * 12;
  const result: number =
    ((initLoan - downPay) * (int / 12) * (1 + int / 12) ** monPay) /
    ((1 + int / 12) ** monPay - 1);
  return result;
};
