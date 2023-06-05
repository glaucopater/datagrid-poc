import {
  FilterColumn,
  Row,
  SortDirection,
  TableProps,
  TableTypes,
} from "../components/Table/Table.types";
import { Column } from "../data.types";

export type SortRowsProps = {
  rows: Row[];
  columnName: keyof Row;
  types: TableTypes;
  sortDirection?: SortDirection;
};

export const findFilterValueById = (id: string, filters: FilterColumn[]) => {
  const selectedFilter = filters.filter(
    (filterColumn) => filterColumn.column.id === id
  )[0];

  return selectedFilter?.value ?? "";
};

export const getInitialFiltersState = (columns: Column[]) =>
  columns.map((column) => ({ column: column, value: "" }));

export const sortTableRowsByColumnName = ({
  rows,
  columnName,
  types,
  sortDirection,
}: SortRowsProps): Row[] => {
  const DATE_MAX_SAFE_VALUE = 8640000000000000;

  if (!sortDirection) sortDirection = SortDirection.ASC;

  const unsortedRows = [...rows];
  return unsortedRows.sort((a, b) => {
    let comparison = 0;

    switch (types[columnName]) {
      case "number":
      case "money":
        comparison = (a[columnName] as number) - (b[columnName] as number);
        break;

      case "text":
        comparison = (a[columnName] as string).localeCompare(
          b[columnName] as string
        );
        break;

      case "date":
        let dateA: Date;
        let dateB: Date;

        if (a[columnName] === "Unknown") {
          dateA = new Date(DATE_MAX_SAFE_VALUE);
        } else if ((a[columnName] as string).length === 10) {
          const [dayA, monthA, yearA] = (a[columnName] as string).split("-");
          dateA = new Date(
            parseInt(yearA),
            parseInt(monthA) - 1,
            parseInt(dayA)
          );
        } else if ((a[columnName] as string).length === 4) {
          dateA = new Date(parseInt(a[columnName] as string), 0, 1);
        } else {
          dateA = new Date(a[columnName] as string);
        }

        if (b[columnName] === "Unknown") {
          dateB = new Date(DATE_MAX_SAFE_VALUE);
        } else if ((b[columnName] as string).length === 10) {
          const [dayB, monthB, yearB] = (b[columnName] as string).split("-");
          dateB = new Date(
            parseInt(yearB),
            parseInt(monthB) - 1,
            parseInt(dayB)
          );
        } else if ((b[columnName] as string).length === 4) {
          dateB = new Date(parseInt(b[columnName] as string), 0, 1);
        } else {
          dateB = new Date(b[columnName] as string);
        }

        comparison = dateA.getTime() - dateB.getTime();
        break;
    }

    return sortDirection === SortDirection.ASC ? comparison : -comparison;
  });
};

type FilterTableByPropertyAndValueProps = {
  rows: TableProps["rows"];
  filterColumn: FilterColumn;
};

export const filterTableByPropertyAndValue = ({
  rows,
  filterColumn,
}: FilterTableByPropertyAndValueProps): Row[] => {
  const filteredRows: Row[] = rows.filter((row) => {
    const property = filterColumn.column.id;
    if (
      property &&
      String(row[property])
        .toLowerCase()
        .includes(filterColumn.value.toLowerCase())
    ) {
      return row;
    }
    return undefined;
  });

  return filteredRows;
};

export const applySequentialFilters = ({
  columns,
  rows,
  filterColumns,
}: {
  columns: TableProps["columns"];
  rows: TableProps["rows"];
  filterColumns: FilterColumn[];
}): { columns: TableProps["columns"]; filteredRows: Row[] } => {
  const filteredRows: Row[] = filterColumns.reduce(
    (accRows: Row[], filterColumn: FilterColumn) => {
      return filterTableByPropertyAndValue({
        rows: accRows,
        filterColumn,
      });
    },
    rows
  );

  return { columns, filteredRows };
};

export const applySequentialFiltersOptimized = ({
  columns,
  rows,
  filterColumns,
}: {
  columns: TableProps["columns"];
  rows: TableProps["rows"];
  filterColumns: FilterColumn[];
}): { columns: TableProps["columns"]; filteredRows: Row[] } => {
  const filteredRows: Row[] = rows.filter((row) => {
    return filterColumns.every((filterColumn: FilterColumn) => {
      const property = filterColumn.column.id;
      return (
        property &&
        String(row[property])
          .toLowerCase()
          .includes(filterColumn.value.toLowerCase())
      );
    });
  });

  return { columns, filteredRows };
};
