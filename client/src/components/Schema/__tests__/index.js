import React from "react";
import { shallow } from "enzyme";

import Schema from "../index";

describe("Schema component", () => {
  let component, toggleSidebarHandlerMock;

  beforeEach(() => {
    jest.resetAllMocks();

    const execMock = jest.fn();
    const currentDatabaseMock = { exec: execMock };

    execMock.mockReturnValueOnce([
      {
        values: [["Test table 1"], ["Test table 2"], ["Test table 3"]]
      }
    ]);

    execMock.mockReturnValue([
      {
        values: [[10]]
      }
    ]);

    toggleSidebarHandlerMock = jest.fn();

    component = shallow(
      <Schema
        toggleSidebarHandler={toggleSidebarHandlerMock}
        currentDatabase={currentDatabaseMock}
      />
    ).dive();
  });

  it("returns a loading div while the schema is loading", () => {
    component.setState({ schema: null });

    component.update();

    expect(component.html()).toEqual("<div>Loading...</div>");
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

  it("calls the prop to toggle the sidebar", () => {
    component.instance().handleToggleSidebar();

    expect(toggleSidebarHandlerMock).toHaveBeenCalledTimes(1);
  });
});
