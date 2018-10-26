import React from "react";
import { shallow } from "enzyme";

import Schema from "../index";
import SchemaItem from "../Item";

const execMock = jest.fn();

execMock.mockReturnValue([
  {
    values: [[10]]
  }
]);

const currentDatabaseMock = { exec: execMock };
const toggleSidebarHandlerMock = jest.fn();

const schemaList = [["Test table 1"], ["Test table 2"], ["Test table 3"]];

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

describe("Schema component", () => {
  let component;

  beforeEach(() => {
    // We mock the database tables once. As they are requested first!
    // After the initial database call, the count is requested.
    // Which is where the default return value on line 9 is returned.
    execMock.mockReturnValueOnce([
      {
        values: schemaList
      }
    ]);

    component = shallow(
      <Schema
        toggleSidebarHandler={toggleSidebarHandlerMock}
        currentDatabase={currentDatabaseMock}
      />
    );
  });

  it("loads all the schema detail", () => {
    expect(component.state("schema")).toEqual(
      expect.arrayContaining([
        { name: "Test table 1", count: 10 },
        { name: "Test table 2", count: 10 },
        { name: "Test table 3", count: 10 }
      ])
    );
  });

  it("display a list of supplied schema tables", () => {
    expect(component.find(SchemaItem).length).toEqual(schemaList.length);
  });
});
