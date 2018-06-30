import getRows from "../getRows";

const mockDB = {
  exec: jest.fn()
};

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
