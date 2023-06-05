export interface Data {
  columns: Column[];
  rows: Row[];
}

export interface Column {
  id: string;
  title: string;
}

export interface Row {
  number: number;
  releaseDate: string;
  title: string;
  productionBudget?: number;
  worldwideBoxOffice?: number;
}
