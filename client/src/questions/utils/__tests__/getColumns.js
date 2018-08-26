import getColumns from "../getColumns";

const mockDB = {
  exec: jest.fn()
};

describe("getColumns()", () => {
  const tables = ["Employees", "Customers", "OrderDetails", "Orders"];

  beforeEach(() => {
    // Reset the question cache.
    window.questionCache = {};
  });

  it("returns a single column", () => {
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
        column: expect.any(String)
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

    expect([
      {
        table: "Customers",
        column: "CustomerID"
      },
      {
        table: "Customers",
        column: "CustomerName"
      },
      {
        table: "Customers",
        column: "CustomerAddress"
      }
    ]).toEqual(expect.arrayContaining(getColumns(mockDB, tables, 2)));
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

    expect(getColumns(mockDB, tables, 3).length).toEqual(3);
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

    const recieved = getColumns(mockDB, tables, 2, undefined, true);

    recieved.forEach(obj =>
      expect(["EmployeeID", "LastName", "HireDate"]).toContain(obj.column)
    );
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

    const recieved = getColumns(mockDB, tables, 2, undefined, false);

    recieved.forEach(obj =>
      expect(["FirstName", "Title", "Address"]).toContain(obj.column)
    );
  });

  it("returns a varchar column", () => {
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

    const received = getColumns(mockDB, tables, 1, "VARCHAR");

    received.forEach(obj =>
      expect([
        "LastName",
        "FirstName",
        "Title",
        "Address",
        "HireDate"
      ]).toContain(obj.column)
    );
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

    expect(() => getColumns(mockDB, tables, 7)).toThrowError(
      /^Not enough columns found in the database.$/
    );
  });
});
