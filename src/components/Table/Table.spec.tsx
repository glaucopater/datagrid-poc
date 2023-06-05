import { cleanup, fireEvent, render } from "@testing-library/react";
import { Table } from ".";
import {
  mockColumns,
  mockRows,
  mockIdMapping,
  mockTypes,
  mockInputPerColumn,
  mockUnsortedRows,
} from "../../__fixtures__";
import { Column, Row, SortDirection } from "./Table.types";

describe("Table", () => {
  afterEach(() => {
    cleanup();
  });

  describe("rendering", () => {
    const mockColumns: Column[] = [];
    const mockRows: Row[] = [];

    it("should render an empty table", () => {
      const { getByRole, queryAllByRole, getByTestId } = render(
        <Table
          columns={mockColumns}
          rows={mockRows}
          types={mockTypes}
          initialSortColumn="numberColumn"
          initialSortDirection={SortDirection.ASC}
        />
      );

      expect(getByRole("table")).toBeInTheDocument();
      // there should be not button visible
      expect(queryAllByRole("button")).toHaveLength(0);
      expect(getByTestId("no-record-found")).toBeInTheDocument();
    });

    it("should render an empty table", () => {
      const mockColumns: Column[] = [{ id: "a", title: "titleA" }];
      const mockRows: Row[] = [{ titleA: "1000" }];

      const { getByRole, queryAllByRole } = render(
        <Table
          columns={mockColumns}
          rows={mockRows}
          types={mockTypes}
          initialSortColumn="number"
          initialSortDirection={SortDirection.ASC}
        />
      );

      expect(getByRole("table")).toBeInTheDocument();
      expect(queryAllByRole("button")).toHaveLength(1);
    });
  });

  const columnTable = mockColumns.map(({ id, title }) => [id, title]);

  describe("sorting", () => {
    describe.each(columnTable)('"%s" column', (id, title) => {
      it("should be possible to sort a column.", () => {
        const { getByTestId } = render(
          <Table
            columns={mockColumns}
            rows={mockUnsortedRows}
            types={mockTypes}
            initialSortColumn="numberColumn"
            initialSortDirection={SortDirection.ASC}
          />
        );

        if (id === "numberColumn")
          expect(getByTestId(`row-0-${id}`).innerHTML).toBe("1");

        if (id === "textColumn")
          expect(getByTestId(`row-0-${id}`).innerHTML).toBe("Iron Man");

        if (id === "dateColumn")
          expect(getByTestId(`row-0-${id}`).innerHTML).toBe("02-05-2008");

        if (id === "moneyColumn")
          expect(getByTestId(`row-0-${id}`).innerHTML).toBe("585171547");

        fireEvent.click(getByTestId("column-" + id));

        if (id === "numberColumn")
          expect(getByTestId(`row-0-${id}`).innerHTML).toBe("20");

        if (id === "textColumn")
          expect(getByTestId(`row-0-${id}`).innerHTML).toBe("Iron Man");

        if (id === "dateColumn")
          expect(getByTestId(`row-0-${id}`).innerHTML).toBe("01-12-1975");

        if (id === "moneyColumn")
          expect(getByTestId(`row-0-${id}`).innerHTML).toBe("0");
      });

      it("should be possible to toggle the sorting direction of a column.", () => {
        const { getByTestId } = render(
          <Table
            columns={mockColumns}
            rows={mockUnsortedRows}
            types={mockTypes}
          />
        );

        if (id === "numberColumn")
          expect(getByTestId(`row-0-${id}`).innerHTML).toBe(
            mockUnsortedRows[0].numberColumn
          );

        if (id === "textColumn")
          expect(getByTestId(`row-0-${id}`).innerHTML).toBe(
            mockUnsortedRows[0].textColumn
          );

        if (id === "dateColumn")
          expect(getByTestId(`row-0-${id}`).innerHTML).toBe(
            mockUnsortedRows[0].dateColumn
          );

        if (id === "moneyColumn")
          expect(getByTestId(`row-0-${id}`).innerHTML).toBe(
            mockUnsortedRows[0].moneyColumn
          );

        fireEvent.click(getByTestId("column-" + id));

        if (id === "numberColumn")
          expect(getByTestId(`row-2-${id}`).innerHTML).toBe("10");

        if (id === "textColumn")
          expect(getByTestId(`row-2-${id}`).innerHTML).toBe("Matrix 7");

        if (id === "dateColumn")
          expect(getByTestId(`row-2-${id}`).innerHTML).toBe("27-05-2010");

        if (id === "moneyColumn")
          expect(getByTestId(`row-2-${id}`).innerHTML).toBe("449326618");

        fireEvent.click(getByTestId("column-" + id));

        if (id === "numberColumn")
          expect(getByTestId(`row-1-${id}`).innerHTML).toBe("11");

        if (id === "textColumn")
          expect(getByTestId(`row-1-${id}`).innerHTML).toBe("Rambo");

        if (id === "dateColumn")
          expect(getByTestId(`row-1-${id}`).innerHTML).toBe("26-05-2011");

        if (id === "moneyColumn")
          expect(getByTestId(`row-1-${id}`).innerHTML).toBe("585171547");
      });
    });
  });

  describe("filtering", () => {
    describe.each(columnTable)(
      'should offer a means to filter the "%s" column',
      (id, title) => {
        it("should be possible to filter a column.", () => {
          const { queryAllByRole, getByTestId, getByText, queryByTestId } =
            render(
              <Table columns={mockColumns} rows={mockRows} types={mockTypes} />
            );

          expect(getByText(title)).toBeInTheDocument();
          expect(getByTestId("filter-by-" + id)).toBeInTheDocument();
          expect(queryAllByRole("button")).toHaveLength(4);

          expect(queryAllByRole("input")).toHaveLength(0);
          expect(getByTestId(`row-0-${id}`)).toBeInTheDocument();
          expect(getByTestId(`row-1-${id}`)).toBeInTheDocument();
          expect(getByTestId(`row-2-${id}`)).toBeInTheDocument();

          // step 2: filtering
          // click on the filter icon, check that is empty
          fireEvent.click(getByTestId("filter-by-" + id));
          expect(
            (getByTestId("filter-input-" + id) as HTMLInputElement).value
          ).toBe("");

          const inputValue = mockInputPerColumn.find(
            (column) => column.column === id
          )?.inputValue;

          // trigger a change on the input field
          fireEvent.change(getByTestId(`filter-input-${id}`), {
            target: {
              value: inputValue,
            },
          });

          // check that the change persist
          expect(
            (getByTestId("filter-input-" + id) as HTMLInputElement).value
          ).toBe(String(inputValue));

          // according to the filter there should be only one row
          expect(getByTestId(`row-0-${id}`)).toBeInTheDocument();
          expect(queryByTestId(`row-1-${id}`)).not.toBeInTheDocument();
          expect(queryByTestId(`row-2-${id}`)).not.toBeInTheDocument();
        });
      }
    );

    it("should be possible to combine filters.", () => {
      const { getByTestId, queryByTestId } = render(
        <Table columns={mockColumns} rows={mockRows} types={mockTypes} />
      );

      fireEvent.click(getByTestId("filter-by-numberColumn"));
      expect(
        (getByTestId("filter-input-numberColumn") as HTMLInputElement).value
      ).toBe("");

      fireEvent.change(getByTestId("filter-input-textColumn"), {
        target: {
          value: "Man",
        },
      });

      fireEvent.change(getByTestId("filter-input-moneyColumn"), {
        target: {
          value: "585171547",
        },
      });

      expect(getByTestId("row-0-numberColumn")).toBeInTheDocument();
      expect(queryByTestId("row-1-numberColumn")).not.toBeInTheDocument();
      expect(queryByTestId("row-2-numberColumn")).not.toBeInTheDocument();

      expect(getByTestId("row-0-dateColumn").title).toBe("02-05-2011");
    });
  });
});
