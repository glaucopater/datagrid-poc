import { Table } from "./components/Table";
import { SortDirection, TableProps } from "./components/Table/Table.types";
import tableData from "./data/data500.json";
import styles from "./App.module.css";

export const types = {
  number: "number",
  title: "text",
  releaseDate: "date",
  productionBudget: "money",
  worldwideBoxOffice: "money",
};

const { columns, rows }: TableProps = { ...tableData, types };

export const App = () => {
  return (
    <div className={styles.app}>
      <Table
        columns={columns}
        rows={rows}
        types={types}
        initialSortColumn="number"
        initialSortDirection={SortDirection.ASC}
      />
    </div>
  );
};

export default App;
