import getTables from "../getTables";

const mockDB = {
  exec: jest.fn()
};

window.questionCache = {};

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

    expect(["Orders", "Customers", "OrderDetails", "Shippers"]).toEqual(
      expect.arrayContaining(getTables(mockDB, 3))
    );
  });
});
