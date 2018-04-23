import {
  getTables,
  getColumns,
  getForeignColumns,
  getRows
} from "./helpers";

const mockDB = {
  exec: jest.fn()
};

describe("getTables()", () => {
  it("fails lack of available tables", () => {
    mockDB.exec.mockReturnValueOnce([
      {
        columns: ["tbl_name"],
        values: [["Orders"], ["Customers"], ["OrderDetails"], ["Shippers"]]
      }
    ]);

    expect(() => getTables(mockDB, 5)).toThrowError(
      /^Not enough tables found in the database.$/
    );
  });

  it("returns all available tables", () => {
    mockDB.exec.mockReturnValueOnce([
      {
        columns: ["tbl_name"],
        values: [["Orders"], ["Customers"], ["OrderDetails"], ["Shippers"]]
      }
    ]);

    expect(getTables(mockDB, 4)).toEqual([
      "Orders",
      "Customers",
      "OrderDetails",
      "Shippers"
    ]);
  });
});

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
      },
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

    expect(() => getColumns(mockDB, tables, {x : 7 })).toThrowError(
      /^Not enough columns found in the database.$/
    );
  });
});

describe("getRows()", () => {
  it("fails lack of available rows", () => {
    mockDB.exec.mockReturnValueOnce([
      {
        columns: ["EmployeeID"],
        values: [[2], [1], [4]]
      }
    ]);

    expect(() => getRows(mockDB, "", "", 5)).toThrowError(
      /^The table doesn't contain enough rows.$/
    );
  });

  it("returns 4 rows", () => {
    mockDB.exec.mockReturnValueOnce([
      {
        columns: ["EmployeeID"],
        values: [[2], [1], [4], [3]]
      }
    ]);

    expect(getRows(mockDB, "", "", 4)).toEqual([2, 1, 4, 3]);
  });
});

describe("getForeignColumns()", () => {
  const tables = ["Album", "Invoice", "Customer", "Artist", "Employee", "Track", "MediaType"];

  it("fails as no foreign keys exist", () => {
    // PRAMGA foreign_key_list will return a blank array upon not finding any fk's for that table
    mockDB.exec.mockReturnValue([]);

    expect(() => getForeignColumns(mockDB, tables, 2)).toThrowError(
      /^Not enough foreign keys were found in the database.$/
    );
  });

  it("returns 2 foreign keys", () => {
    mockDB.exec.mockReturnValueOnce([
      {
        columns: ["id", "seq", "table", "from", "to", "on_update", "on_delete", "match"],
        values: [
          [0, 0, "Customer", "CustomerId", "CustomerId", "NO ACTION", "NO ACTION", "NONE"],
        ]
      }
    ]);
    mockDB.exec.mockReturnValueOnce([
      {
        columns: ["id", "seq", "table", "from", "to", "on_update", "on_delete", "match"],
        values: [
          [0, 0, "Employee", "SupportRepId", "EmployeeId", "NO ACTION", "NO ACTION", "NONE"],
        ]
      }
    ]);
    mockDB.exec.mockReturnValueOnce([
      {
        columns: ["id", "seq", "table", "from", "to", "on_update", "on_delete", "match"],
        values: [
          [0, 0, "Track", "TrackId", "TrackId", "NO ACTION", "NO ACTION", "NONE"],
        ]
      }
    ]);

    expect(getForeignColumns(mockDB, tables, 2)).toEqual(
      [
        { 
          from : { 
            table: "Customer", 
            column: "CustomerId" 
          }, 
          to : { 
            table: "Album", 
            column: "CustomerId"
          }
        },
        { 
          from : { 
            table: "Employee", 
            column: "SupportRepId" 
          }, 
          to : { 
            table: "Invoice", 
            column: "EmployeeId"
          }
        },
    ]);
  });
});
