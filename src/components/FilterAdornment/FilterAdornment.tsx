import { MouseEventHandler, useState } from "react";
import { ReactComponent as FilterIcon } from "../../assets/svg/filter.svg";
import styles from "./FilterAdornment.module.css";
import classNames from "classnames";

type FilterAdornmentProps = {
  isActive: boolean;
  onClick?: MouseEventHandler;
  columnName: string;
  children: React.ReactNode;
};

const FilterAdornment = ({
  isActive,
  onClick,
  columnName,
  children,
}: FilterAdornmentProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const handleOnFilterClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsVisible(() => !isVisible);
    onClick?.(e);
  };

  return (
    <p className={styles["filter-adornment"]}>
      <button
        className={classNames(styles["filter-adornment-button"], {
          [styles["active"]]: isActive,
        })}
        onClick={handleOnFilterClick}
        // $isFilterVisible={isFilterVisible}
        data-testid={`filter-by-${columnName}`}
        title={`Filter by ${children}`}
      >
        <FilterIcon
          className={classNames(styles.icon, {
            [styles["active"]]: isActive,
          })}
        />
      </button>
    </p>
  );
};

export default FilterAdornment;
