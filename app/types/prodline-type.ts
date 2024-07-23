interface ProdLineI {
  line_code: string;
  line_name: string;
}

export type ProdLineListType = {
  plant: string;
  plant_name: string;
  prodline: ProdLineI[];
};