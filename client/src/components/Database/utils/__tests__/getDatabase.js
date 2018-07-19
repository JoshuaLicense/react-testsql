import React from "react";

import getDatabase from "../../utils/getDatabase";
import toBinArray from "../../utils/toBinArray";

jest.mock("../../utils/toBinArray");

describe("the getDatabase helper function", () => {
  it("gets the database (cached)", () => {
    toBinArray.mockImplementation(() => true);

    localStorage.getItem.mockImplementation(() => true);

    getDatabase().then(typedArray => expect(typedArray).toBeTruthy());

    expect(toBinArray).toHaveBeenCalledTimes(1);
  });

  it("gets the database (default)", () => {
    // null is returned when the localStorage item isn't found.
    localStorage.getItem.mockImplementation(() => null);

    // Mock the fetching of the default database.
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(8))
      })
    );

    getDatabase().then(typedArray => expect(typedArray).toBeTruthy());

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
