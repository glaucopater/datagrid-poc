const numberColumn = { id: "numberColumn", title: "Number column" };
const textColumn = { id: "textColumn", title: "Text column" };
const dateColumn = { id: "dateColumn", title: "Date column" };
const moneyColumn = { id: "moneyColumn", title: "Money column" };

export const mockColumns = [numberColumn, textColumn, dateColumn, moneyColumn];

export const mockRows = [
  {
    numberColumn: "2",
    textColumn: "Iron Man 2",
    dateColumn: "07-05-2010",
    moneyColumn: "621156389",
  },
  {
    numberColumn: "1",
    textColumn: "Iron Man",
    dateColumn: "02-05-2011",
    moneyColumn: "585171547",
    worldwideBoxOffice: 585171547,
  },
  {
    numberColumn: "3",
    textColumn: "Thor",
    dateColumn: "11-05-2011",
    moneyColumn: "449326618",
  },
];

export const mockUnsortedRows = [
  {
    numberColumn: "2",
    textColumn: "Iron Man 2",
    dateColumn: "27-05-2010",
    moneyColumn: "621156389",
  },
  {
    numberColumn: "1",
    textColumn: "Iron Man",
    dateColumn: "02-05-2008",
    moneyColumn: "585171547",
  },
  {
    numberColumn: "10",
    textColumn: "Thor",
    dateColumn: "26-05-2011",
    moneyColumn: "449326618",
  },
  {
    numberColumn: "20",
    textColumn: "Matrix 7",
    dateColumn: "Unknown",
    moneyColumn: "0",
  },
  {
    numberColumn: "11",
    textColumn: "Rambo",
    dateColumn: "01-12-1975",
    moneyColumn: "449326618",
  },
];

export const mockIdMapping = {
  numberColumn: "numberColumn",
  textColumn: "textColumn",
  dateColumn: "dateColumn",
  moneyColumn: "moneyColumn",
};

export const mockTypes = {
  numberColumn: "number",
  textColumn: "text",
  dateColumn: "date",
  moneyColumn: "money",
};

export const mockInputPerColumn = [
  {
    column: "numberColumn",
    inputValue: 2,
  },
  {
    column: "textColumn",
    inputValue: "Iron Man 2",
  },
  {
    column: "dateColumn",
    inputValue: "07-05-2010",
  },
  {
    column: "moneyColumn",
    inputValue: "621156389",
  },
];
