export function calc_percent_rate(
  act: string | undefined,
  total: string | undefined
) {
  let res: number;
  if (act && total) {
    res = (parseInt(act) / parseInt(total)) * 100;
    return res.toFixed(2);
  }
  return 0;
}
