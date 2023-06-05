import classNames from "classnames";
import React from "react";
import { MouseEventHandler, useState } from "react";
import { FilterAdornment } from "../FilterAdornment";
import { SortAdornment } from "../SortAdornment";
import { SortDirection } from "../Table/Table.types";
import styles from "./HeaderCell.module.css";

type HeaderCellProps = {
  onFilterClick?: MouseEventHandler;
  onSortClick: (e: React.MouseEvent<HTMLElement>, sortColumn: string) => void;
  children: React.ReactNode;
  isFilterActive: boolean;
  columnName: string;
  sortColumn?: string;
  sortDirection?: SortDirection;
  type: string;
};

export const HeaderCell = ({
  onFilterClick,
  children,
  isFilterActive,
  columnName,
  onSortClick,
  sortColumn,
  sortDirection,
  type,
}: HeaderCellProps) => {
  const [currentDirection, setCurrentDirection] = useState(sortDirection);
  const [, setCurrentSortColumn] = useState(sortColumn);

  const handleOnSortClick = (e: React.MouseEvent<HTMLElement>) => {
    const nextDirection =
      !currentDirection || currentDirection === SortDirection.DESC
        ? SortDirection.ASC
        : SortDirection.DESC;

    setCurrentDirection(() => nextDirection);
    setCurrentSortColumn(() => columnName);
    onSortClick(e, columnName);
  };

  return (
    <th onClick={handleOnSortClick} data-testid={`column-${columnName}`}>
      <div
        className={classNames(styles["header-cell-content"], {
          [styles["cell-type-money"]]: type === "money",
        })}
      >
        <p className={styles["column-name"]}>{children}</p>
        {columnName === sortColumn && (
          <SortAdornment sortDirection={currentDirection} children={children} />
        )}
        <FilterAdornment
          onClick={onFilterClick}
          isActive={isFilterActive}
          columnName={columnName}
          children={children}
        />
      </div>
    </th>
  );
};

export default HeaderCell;
