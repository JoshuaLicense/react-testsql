import getColumns from "../getColumns";

const mockDB = {
  exec: jest.fn()
};

describe("getColumns()", () => {
  const tables = ["Employees", "Customers", "OrderDetails", "Orders"];

  it("returns a column", () => {
    mockDB.exec.mockReturnValueOnce([
      {
        columns: ["cid", "name", "type", "notnull", "dflt_value", "pk"],
        values: [
          [0, "EmployeeID", "INTEGER", 1, null, 1],
          [1, "LastName", "VARCHAR(20)", 1, null, 0],
          [2, "FirstName", "VARCHAR(20)", 0, null, 0],
          [3, "Title", "VARCHAR(60)", 0, null, 0],
          [4, "Address", "VARCHAR(40)", 0, null, 0],
          [5, "HireDate", "VARCHAR(25)", 1, null, 0]
        ]
      }
    ]);

    expect(getColumns(mockDB, tables)).toEqual([
      {
        table: "Employees",
        column: "EmployeeID"
      }
    ]);
  });

  it("moves on to the next table due to lack of columns", () => {
    mockDB.exec.mockReturnValueOnce([
      {
        columns: ["cid", "name", "type", "notnull", "dflt_value", "pk"],
        values: [[0, "EmployeeID", "INTEGER", 1, null, 1]]
      }
    ]);

    mockDB.exec.mockReturnValueOnce([
      {
        columns: ["cid", "name", "type", "notnull", "dflt_value", "pk"],
        values: [
          [0, "CustomerID", "INTEGER", 1, null, 1],
          [1, "CustomerName", "VARCHAR(20)", 1, null, 0],
          [2, "CustomerAddress", "VARCHAR(20)", 0, null, 0]
        ]
      }
    ]);

    expect(getColumns(mockDB, tables, { x: 2 })).toEqual([
      {
        table: "Customers",
        column: "CustomerID"
      },
      {
        table: "Customers",
        column: "CustomerName"
      }
    ]);
  });

  it("returns any 3 columns", () => {
    mockDB.exec.mockReturnValueOnce([
      {
        columns: ["cid", "name", "type", "notnull", "dflt_value", "pk"],
        values: [
          [0, "EmployeeID", "INTEGER", 1, null, 1],
          [1, "LastName", "VARCHAR(20)", 1, null, 0],
          [2, "FirstName", "VARCHAR(20)", 0, null, 0],
          [3, "Title", "VARCHAR(60)", 0, null, 0],
          [4, "Address", "VARCHAR(40)", 0, null, 0],
          [5, "HireDate", "VARCHAR(25)", 1, null, 0]
        ]
      }
    ]);

    expect(getColumns(mockDB, tables, { x: 3 })).toEqual([
      {
        table: "Employees",
        column: "EmployeeID"
      },
      {
        table: "Employees",
        column: "LastName"
      },
      {
        table: "Employees",
        column: "FirstName"
      }
    ]);
  });

  it("returns 3 not-null columns", () => {
    mockDB.exec.mockReturnValueOnce([
      {
        columns: ["cid", "name", "type", "notnull", "dflt_value", "pk"],
        values: [
          [0, "EmployeeID", "INTEGER", 1, null, 1],
          [1, "LastName", "VARCHAR(20)", 1, null, 0],
          [2, "FirstName", "VARCHAR(20)", 0, null, 0],
          [3, "Title", "VARCHAR(60)", 0, null, 0],
          [4, "Address", "VARCHAR(40)", 0, null, 0],
          [5, "HireDate", "VARCHAR(25)", 1, null, 0]
        ]
      }
    ]);

    expect(getColumns(mockDB, tables, { x: 3, notnull: true })).toEqual([
      {
        table: "Employees",
        column: "EmployeeID"
      },
      {
        table: "Employees",
        column: "LastName"
      },
      {
        table: "Employees",
        column: "HireDate"
      }
    ]);
  });

  it("returns 3 null columns", () => {
    mockDB.exec.mockReturnValueOnce([
      {
        columns: ["cid", "name", "type", "notnull", "dflt_value", "pk"],
        values: [
          [0, "EmployeeID", "INTEGER", 1, null, 1],
          [1, "LastName", "VARCHAR(20)", 1, null, 0],
          [2, "FirstName", "VARCHAR(20)", 0, null, 0],
          [3, "Title", "VARCHAR(60)", 0, null, 0],
          [4, "Address", "VARCHAR(40)", 0, null, 0],
          [5, "HireDate", "VARCHAR(25)", 1, null, 0]
        ]
      }
    ]);

    expect(getColumns(mockDB, tables, { x: 3, notnull: false })).toEqual([
      {
        table: "Employees",
        column: "FirstName"
      },
      {
        table: "Employees",
        column: "Title"
      },
      {
        table: "Employees",
        column: "Address"
      }
    ]);
  });

  it("returns an int column", () => {
    mockDB.exec.mockReturnValueOnce([
      {
        columns: ["cid", "name", "type", "notnull", "dflt_value", "pk"],
        values: [
          [0, "EmployeeID", "INTEGER", 1, null, 1],
          [1, "LastName", "VARCHAR(20)", 1, null, 0],
          [2, "FirstName", "VARCHAR(20)", 0, null, 0],
          [3, "Title", "VARCHAR(60)", 0, null, 0],
          [4, "Address", "VARCHAR(40)", 0, null, 0],
          [5, "HireDate", "VARCHAR(25)", 1, null, 0]
        ]
      }
    ]);

    expect(getColumns(mockDB, tables, { type: "int" })).toEqual([
      {
        table: "Employees",
        column: "EmployeeID"
      }
    ]);
  });

  it("doesn't find enough columns in the database", () => {
    mockDB.exec.mockReturnValue([
      {
        columns: ["cid", "name", "type", "notnull", "dflt_value", "pk"],
        values: [
          [0, "EmployeeID", "INTEGER", 1, null, 1],
          [1, "LastName", "VARCHAR(20)", 1, null, 0],
          [2, "FirstName", "VARCHAR(20)", 0, null, 0],
          [3, "Title", "VARCHAR(60)", 0, null, 0],
          [4, "Address", "VARCHAR(40)", 0, null, 0],
          [5, "HireDate", "VARCHAR(25)", 1, null, 0]
        ]
      }
    ]);

    expect(() => getColumns(mockDB, tables, { x: 7 })).toThrowError(
      /^Not enough columns found in the database.$/
    );
  });
});
