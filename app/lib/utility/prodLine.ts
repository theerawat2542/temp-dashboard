import { ProdLineListType } from "@/app/types/prodline-type";

export const productionLineList: ProdLineListType[] = [
  {
    plant: "9771",
    plant_name: "RF",
    prodline: [
      { line_code: "RA", line_name: "RF Line A" },
      { line_code: "RB", line_name: "RF Line B" },
    ],
  },
  {
    plant: "9773",
    plant_name: "WAC",
    prodline: [
      { line_code: "W1", line_name: "WAC Line 1" },
      { line_code: "W2", line_name: "WAC Line 2" },
      { line_code: "WC", line_name: "WC Line" },
    ],
  },
  {
    plant: "9774",
    "plant_name": 'SAC',
    prodline: [
      { line_code: "W1", line_name: "SAC Line 1" },
      { line_code: "W2", line_name: "SAC Line 2" },
      { line_code: "IN", line_name: "Indoor 1" },
      { line_code: "N2", line_name: "Indoor 2" },
      { line_code: "N3", line_name: "Indoor 3" },
      { line_code: "OU", line_name: "Outdoor 1" },
      { line_code: "U2", line_name: "Outdoor 2" },
      { line_code: "U3", line_name: "Outdoor 3" },
    ],
  },
];