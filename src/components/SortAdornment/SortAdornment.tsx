import { ReactComponent as SortAscendingIcon } from "../../assets/svg/order-ascending.svg";
import { ReactComponent as SortDescendingIcon } from "../../assets/svg/order-descending.svg";
import { SortDirection } from "../Table/Table.types";
import styles from "./SortAdornment.module.css";

type SortAdornmentProps = {
  sortDirection?: SortDirection;
  children: React.ReactNode;
};

const SortAdornment = ({ sortDirection, children }: SortAdornmentProps) => {
  return (
    <p
      className={styles["sort-adornment"]}
      title={`Sorted by ${children} (${sortDirection})`}
    >
      {sortDirection === SortDirection.ASC ? (
        <SortAscendingIcon className={styles.icon} />
      ) : (
        <SortDescendingIcon className={styles.icon} />
      )}
    </p>
  );
};

export default SortAdornment;
