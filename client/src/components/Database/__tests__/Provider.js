import React from "react";
import { shallow } from "enzyme";
import Provider from "../Provider";

import getDatabase, { saveDatabase } from "../helpers";

jest.mock("../helpers");

const database = new ArrayBuffer(8);

getDatabase.mockImplementation(() => Promise.resolve(database));
saveDatabase.mockImplementation(() => {});

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

describe("the DatabaseContext Provider component", () => {
  it("fetches the current database on mount", async () => {
    const component = shallow(<Provider />);

    await flushPromises();

    component.update();

    // Expect a database to be created and saved to the state.
    expect(component.state("database")).not.toBeNull();
  });
});
