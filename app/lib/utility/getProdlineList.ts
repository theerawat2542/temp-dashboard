const RF_Lines: string = "('RA', 'RB')";
const WAC_Lines: string = "('W1', 'W2', 'WC')";
const SAC_Lines: string = "('W1', 'W2', 'IN', 'N2', 'N3', 'OU', 'U2', 'U3')";
let lines: string = "";

export function getProdLineList(plant: string) {
  switch (plant) {
    case "9771":
      lines = RF_Lines;
      break;
    case "9773":
      lines = WAC_Lines;
      break;
    case "9774":
      lines = SAC_Lines;
      break;
    default:
      lines = "";
      break;
  }

  return lines;
}
