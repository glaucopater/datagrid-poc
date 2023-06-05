export type Row = {
  [x: string]: string | number | boolean | null | undefined;
};

export type Column = {
  id: string;
  title: string;
};

export type TableProps = {
  columns: Column[];
  rows: Row[];
  types: TableTypes;
  initialSortColumn?: string;
  initialSortDirection?: SortDirection;
};

export type TableTypes = {
  [x: string]: string;
};

export interface CellProps {
  readonly $type: string;
}

export enum SortDirection {
  "ASC" = "ascending",
  "DESC" = "descending",
}

export type FilterColumn = {
  column: Column;
  value: string;
};
