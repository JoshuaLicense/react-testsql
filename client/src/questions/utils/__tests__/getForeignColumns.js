import getForeignColumns from "../getForeignColumns";

const mockDB = {
  exec: jest.fn()
};

describe("getForeignColumns()", () => {
  const tables = [
    "Album",
    "Invoice",
    "Customer",
    "Artist",
    "Employee",
    "Track",
    "MediaType"
  ];

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
        columns: [
          "id",
          "seq",
          "table",
          "from",
          "to",
          "on_update",
          "on_delete",
          "match"
        ],
        values: [
          [
            0,
            0,
            "Customer",
            "CustomerId",
            "CustomerId",
            "NO ACTION",
            "NO ACTION",
            "NONE"
          ]
        ]
      }
    ]);
    mockDB.exec.mockReturnValueOnce([
      {
        columns: [
          "id",
          "seq",
          "table",
          "from",
          "to",
          "on_update",
          "on_delete",
          "match"
        ],
        values: [
          [
            0,
            0,
            "Employee",
            "SupportRepId",
            "EmployeeId",
            "NO ACTION",
            "NO ACTION",
            "NONE"
          ]
        ]
      }
    ]);
    mockDB.exec.mockReturnValueOnce([
      {
        columns: [
          "id",
          "seq",
          "table",
          "from",
          "to",
          "on_update",
          "on_delete",
          "match"
        ],
        values: [
          [
            0,
            0,
            "Track",
            "TrackId",
            "TrackId",
            "NO ACTION",
            "NO ACTION",
            "NONE"
          ]
        ]
      }
    ]);

    expect(getForeignColumns(mockDB, tables, 2)).toEqual([
      {
        from: {
          table: "Customer",
          column: "CustomerId"
        },
        to: {
          table: "Album",
          column: "CustomerId"
        }
      },
      {
        from: {
          table: "Employee",
          column: "SupportRepId"
        },
        to: {
          table: "Invoice",
          column: "EmployeeId"
        }
      }
    ]);
  });
});
