import {
  applySequentialFilters,
  applySequentialFiltersOptimized,
  filterTableByPropertyAndValue,
  findFilterValueById,
  SortRowsProps,
  sortTableRowsByColumnName,
} from ".";
import { mockTypes, mockUnsortedRows } from "../__fixtures__";
import {
  Column,
  FilterColumn,
  Row,
  SortDirection,
} from "../components/Table/Table.types";

describe("Utils", () => {
  describe("findFilterValueById", () => {
    const filters: FilterColumn[] = [
      {
        column: { id: "1", title: "Title 1" },
        value: "value1",
      },
      {
        column: { id: "2", title: "Title 2" },
        value: "value2",
      },
    ];

    it("should return the correct filter value by id", () => {
      const result = findFilterValueById("1", filters);
      expect(result).toBe("value1");
    });

    it("should return an empty string if the filter is not found", () => {
      const result = findFilterValueById("3", filters);
      expect(result).toBe("");
    });

    it("should return an empty string if no filters are provided", () => {
      const result = findFilterValueById("1", []);
      expect(result).toBe("");
    });
  });

  describe("sortRows", () => {
    const rows: Row[] = [
      { id: "1", date: "02-01-2022" },
      { id: "2", date: "31-12-2021" },
      { id: "3", date: "Unknown" },
      { id: "4", date: "15-05-2023" },
      { id: "5", date: "2022" },
    ];
    const types = {
      date: "date",
    };

    it("should sort by numberColumn", () => {
      const result = sortTableRowsByColumnName({
        rows: mockUnsortedRows,
        columnName: "numberColumn",
        sortDirection: SortDirection.ASC,
        types: mockTypes,
      });
      expect(result.map((row) => row.numberColumn)).toMatchObject([
        "1",
        "2",
        "10",
        "11",
        "20",
      ]);
    });

    it("should sort by textColumn desc", () => {
      const result = sortTableRowsByColumnName({
        rows: mockUnsortedRows,
        columnName: "textColumn",
        sortDirection: SortDirection.DESC,
        types: mockTypes,
      });
      expect(result.map((row) => row.textColumn)).toMatchObject([
        "Thor",
        "Rambo",
        "Matrix 7",
        "Iron Man 2",
        "Iron Man",
      ]);
    });

    it("should sort by moneyColumn desc", () => {
      const result = sortTableRowsByColumnName({
        rows: mockUnsortedRows,
        columnName: "moneyColumn",
        sortDirection: SortDirection.DESC,
        types: mockTypes,
      });
      expect(result.map((row) => row.moneyColumn)).toMatchObject([
        "621156389",
        "585171547",
        "449326618",
        "449326618",
        "0",
      ]);
    });

    it("should sort the rows by date in ascending order", () => {
      const sortProps: SortRowsProps = {
        rows,
        columnName: "date",
        types,
        sortDirection: SortDirection.ASC,
      };

      const sortedRows = sortTableRowsByColumnName(sortProps);
      expect(sortedRows).toEqual([
        { id: "2", date: "31-12-2021" },
        { id: "5", date: "2022" },
        { id: "1", date: "02-01-2022" },
        { id: "4", date: "15-05-2023" },
        { id: "3", date: "Unknown" },
      ]);
    });

    it("should sort by dateColumn asc", () => {
      const result = sortTableRowsByColumnName({
        rows: mockUnsortedRows,
        columnName: "dateColumn",
        sortDirection: SortDirection.ASC,
        types: mockTypes,
      });
      expect(result.map((row) => row.dateColumn)).toMatchObject([
        "01-12-1975",
        "02-05-2008",
        "27-05-2010",
        "26-05-2011",
        "Unknown",
      ]);
    });

    it("should sort the rows by date in descending order", () => {
      const sortProps: SortRowsProps = {
        rows,
        columnName: "date",
        types,
        sortDirection: SortDirection.DESC,
      };

      const sortedRows = sortTableRowsByColumnName(sortProps);
      expect(sortedRows).toEqual([
        { id: "3", date: "Unknown" },
        { id: "4", date: "15-05-2023" },
        { id: "1", date: "02-01-2022" },
        { id: "5", date: "2022" },
        { id: "2", date: "31-12-2021" },
      ]);
    });

    it("should sort the rows by date in descending order", () => {
      const sortProps: SortRowsProps = {
        rows,
        columnName: "date",
        types,
        sortDirection: SortDirection.DESC,
      };

      const sortedRows = sortTableRowsByColumnName(sortProps);
      expect(sortedRows).toEqual([
        { id: "3", date: "Unknown" },
        { id: "4", date: "15-05-2023" },
        { id: "1", date: "02-01-2022" },
        { id: "5", date: "2022" },
        { id: "2", date: "31-12-2021" },
      ]);
    });

    it("should sort the rows by year in ascending order", () => {
      const yearRows: Row[] = [
        { id: "1", date: "1990" },
        { id: "2", date: "2000" },
        { id: "3", date: "1985" },
        { id: "4", date: "2015" },
      ];

      const sortProps: SortRowsProps = {
        rows: yearRows,
        columnName: "date",
        types,
        sortDirection: SortDirection.ASC,
      };

      const sortedRows = sortTableRowsByColumnName(sortProps);
      expect(sortedRows).toEqual([
        { id: "3", date: "1985" },
        { id: "1", date: "1990" },
        { id: "2", date: "2000" },
        { id: "4", date: "2015" },
      ]);
    });

    it("should sort the rows with different date formats in ascending order", () => {
      const mixedDateRows: Row[] = [
        { id: "1", date: "02-01-2022" },
        { id: "2", date: "2021" },
        { id: "3", date: "15-05-2023" },
        { id: "4", date: "Unknown" },
      ];

      const sortProps: SortRowsProps = {
        rows: mixedDateRows,
        columnName: "date",
        types,
        sortDirection: SortDirection.ASC,
      };

      const sortedRows = sortTableRowsByColumnName(sortProps);
      expect(sortedRows).toEqual([
        { id: "2", date: "2021" },
        { id: "1", date: "02-01-2022" },
        { id: "3", date: "15-05-2023" },
        { id: "4", date: "Unknown" },
      ]);
    });
  });

  describe("filterTableByPropertyAndValue", () => {
    it("should work with an empty dataset", () => {
      const filterColumn: FilterColumn = {
        column: { id: "", title: "" },
        value: "111",
      };
      const result = filterTableByPropertyAndValue({
        rows: [],
        filterColumn,
      });
      expect(result).toMatchObject([]);
    });

    it("should filter by a specific filter column", () => {
      const filterColumn: FilterColumn = {
        column: { id: "textColumn", title: "" },
        value: "2",
      };
      const result = filterTableByPropertyAndValue({
        rows: mockUnsortedRows,
        filterColumn,
      });
      expect(result).toMatchObject([
        {
          dateColumn: "27-05-2010",
          moneyColumn: "621156389",
          numberColumn: "2",
          textColumn: "Iron Man 2",
        },
      ]);
    });

    it("should retrieve empty results", () => {
      const filterColumn: FilterColumn = {
        column: { id: "textColumn", title: "" },
        value: "20000",
      };
      const result = filterTableByPropertyAndValue({
        rows: mockUnsortedRows,
        filterColumn,
      });
      expect(result).toMatchObject([]);
    });
  });

  describe("applySequentialFilters", () => {
    it("should work with an empty dataset", () => {
      const filterColumns: FilterColumn[] = [];
      const result = applySequentialFilters({
        columns: [],
        rows: [],
        filterColumns,
      });
      expect(result).toMatchObject({ columns: [], filteredRows: [] });
    });

    it("should work with an empty dataset", () => {
      const mockColumns: Column[] = [
        {
          id: "id",
          title: "Id",
        },
        {
          id: "numberColumn",
          title: "numberColumn",
        },
        {
          id: "textColumn",
          title: "textColumn",
        },
      ];
      const mockRows = [
        {
          id: "1",
          numberColumn: "111",
          textColumn: "Iron Man 1",
        },

        {
          id: "2",
          numberColumn: "222",
          textColumn: "Iron Man 2",
        },

        {
          id: "3",
          numberColumn: "333",
          textColumn: "Iron Man 3",
        },
      ];

      const mockFilterColumns: FilterColumn[] = [
        {
          column: { id: "textColumn", title: "textColumn" },
          value: "Iron Man",
        },
      ];
      const { filteredRows: result } = applySequentialFilters({
        columns: mockColumns,
        rows: mockRows,
        filterColumns: mockFilterColumns,
      });
      expect(result).toMatchObject([
        { id: "1", numberColumn: "111", textColumn: "Iron Man 1" },
        { id: "2", numberColumn: "222", textColumn: "Iron Man 2" },
        { id: "3", numberColumn: "333", textColumn: "Iron Man 3" },
      ]);
    });
  });

  describe("applySequentialFiltersOptimized", () => {
    const mockColumns: Column[] = [
      {
        id: "id",
        title: "Id",
      },
      {
        id: "numberColumn",
        title: "numberColumn",
      },
      {
        id: "textColumn",
        title: "textColumn",
      },
    ];
    const mockRows = [
      {
        id: "1",
        numberColumn: "111",
        textColumn: "Iron Man 1",
      },

      {
        id: "2",
        numberColumn: "222",
        textColumn: "Iron Man 2",
      },

      {
        id: "3",
        numberColumn: "333",
        textColumn: "Iron Man 3",
      },
    ];

    it("should work with an empty dataset", () => {
      const filterColumns: FilterColumn[] = [];
      const result = applySequentialFiltersOptimized({
        columns: [],
        rows: [],
        filterColumns,
      });
      expect(result).toMatchObject({ columns: [], filteredRows: [] });
    });

    it("should work with a custom filter dataset", () => {
      const mockFilterColumns: FilterColumn[] = [
        {
          column: { id: "textColumn", title: "textColumn" },
          value: "Iron Man",
        },
      ];
      const { filteredRows: result } = applySequentialFiltersOptimized({
        columns: mockColumns,
        rows: mockRows,
        filterColumns: mockFilterColumns,
      });
      expect(result).toMatchObject([
        { id: "1", numberColumn: "111", textColumn: "Iron Man 1" },
        { id: "2", numberColumn: "222", textColumn: "Iron Man 2" },
        { id: "3", numberColumn: "333", textColumn: "Iron Man 3" },
      ]);
    });

    it("should work with a multiple filter ", () => {
      const mockFilterColumns: FilterColumn[] = [
        {
          column: { id: "id", title: "Id" },
          value: "2",
        },
        {
          column: { id: "textColumn", title: "textColumn" },
          value: "Iron Man",
        },
      ];
      const { filteredRows: result } = applySequentialFiltersOptimized({
        columns: mockColumns,
        rows: mockRows,
        filterColumns: mockFilterColumns,
      });
      expect(result).toMatchObject([
        { id: "2", numberColumn: "222", textColumn: "Iron Man 2" },
      ]);
    });
  });
});
