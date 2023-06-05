import { useMemo, useState } from "react";
import { FilterColumn, Row, SortDirection, TableProps } from "./Table.types";
import { HeaderCell } from "../HeaderCell";
import { FilterInputCell } from "../FilterInputCell";
import {
  applySequentialFilters,
  findFilterValueById,
  getInitialFiltersState,
  sortTableRowsByColumnName,
} from "../../utils";
import styles from "./Table.module.css";

const Table = ({
  columns,
  rows,
  types,
  initialSortColumn,
  initialSortDirection,
}: TableProps) => {
  const [isFilterBarActive, setIsFilterBarActive] = useState(false);
  const [sortColumn, setSortColumn] = useState(initialSortColumn);
  const [sortDirection, setSortDirection] = useState(initialSortDirection);

  const [currentFilters, setCurrentFilters] = useState<FilterColumn[]>(
    getInitialFiltersState(columns)
  );

  const handleOnFilterClick = (e: React.MouseEvent<HTMLElement>) => {
    setIsFilterBarActive(() => !isFilterBarActive);
  };

  const handleOnSortClick = (
    _e: React.MouseEvent<HTMLElement>,
    columnName: string
  ) => {
    if (columnName !== sortColumn) {
      setSortDirection(() => SortDirection.ASC);
    } else
      setSortDirection(() =>
        sortDirection === SortDirection.ASC
          ? SortDirection.DESC
          : SortDirection.ASC
      );
    setSortColumn(columnName);
  };

  const handleOnChangeFilter = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const { value } = e.target;
    const otherColumns = currentFilters.filter(
      ({ column }) => column.id !== id
    );
    const selectedColumn = currentFilters.find(
      ({ column }) => column.id === id
    );
    if (selectedColumn) {
      const updatedColumn = { ...selectedColumn, value };
      setCurrentFilters([...otherColumns, updatedColumn]);
    }
  };

  // find active filters and apply them

  const activeFilters = currentFilters.filter((filter) => filter.value !== "");

  // filter rows with memoization

  const { filteredRows } = useMemo(() => {
    if (activeFilters.length > 0) {
      return applySequentialFilters({
        columns,
        rows,
        filterColumns: activeFilters,
      });
    } else return { filteredRows: rows };
  }, [activeFilters, columns, rows]);

  // sort rows with memoization

  const filteredAndSortedRows = useMemo(() => {
    if (sortColumn) {
      return sortTableRowsByColumnName({
        rows: filteredRows,
        columnName: sortColumn,
        sortDirection,
        types,
      });
    } else return filteredRows;
  }, [filteredRows, sortColumn, sortDirection, types]);

  return (
    <table title="Movies" className={styles.table}>
      <thead>
        <tr>
          {columns.map(({ id, title }) => (
            <HeaderCell
              key={id}
              columnName={id}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              type={types[id]}
              onFilterClick={handleOnFilterClick}
              onSortClick={handleOnSortClick}
              isFilterActive={!!findFilterValueById(id, currentFilters)}
            >
              {title}
            </HeaderCell>
          ))}
        </tr>
        {isFilterBarActive && (
          <tr>
            {columns.map(({ id, title }) => (
              <FilterInputCell
                key={id}
                id={id}
                name={title}
                type={types[id]}
                value={findFilterValueById(id, currentFilters)}
                onChange={(e) => handleOnChangeFilter(e, id)}
              />
            ))}
          </tr>
        )}
      </thead>
      <tbody>
        {filteredAndSortedRows.length === 0 && (
          <tr>
            <td
              colSpan={columns.length}
              data-testid={`no-record-found`}
              title={"No Records Found"}
            >
              No Records Found
            </td>
          </tr>
        )}
        {filteredAndSortedRows.map((row: Row, index: number) => (
          <tr key={index}>
            {columns.map(({ id }) => (
              <td
                data-testid={`row-${index}-${id}`}
                key={id}
                className={
                  styles[`cell-type-${types[id]}` as keyof typeof styles]
                }
                title={String(row[id])}
              >
                {row[id]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
