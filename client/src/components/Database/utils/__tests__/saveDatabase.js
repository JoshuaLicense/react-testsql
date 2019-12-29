import React from "react";

import saveDatabase from "../../utils/saveDatabase";
import toBinString from "../../utils/toBinString";

jest.mock("../../utils/toBinString");

describe("the saveDatabase helper function", () => {
  it("saves the database to the localStorage", () => {
    const database = {
      export: jest.fn()
    };

    toBinString.mockImplementation(() => true);

    saveDatabase(database);

    expect(database.export).toHaveBeenCalledTimes(1);
    expect(toBinString).toHaveBeenCalledTimes(1);
  });
});
