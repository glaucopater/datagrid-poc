import classNames from "classnames";
import { ChangeEventHandler } from "react";
import styles from "./FilterInputCell.module.css";

type FilterInputCellProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  id: string;
  value?: string;
  name: string;
  type: string;
};

export const FilterInputCell = ({
  onChange,
  id,
  name,
  value,
  type,
}: FilterInputCellProps) => {
  return (
    <td
      className={classNames(styles["filter-input-cell"], {
        [styles["cell-type-money"]]: type === "money",
      })}
    >
      <input
        className={styles["input"]}
        data-testid={`filter-input-${id}`}
        id={id}
        name={name}
        type="text"
        value={value}
        placeholder={name}
        onChange={onChange}
      />
    </td>
  );
};

export default FilterInputCell;
