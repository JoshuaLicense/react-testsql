import React from "react";

import { shallow } from "enzyme";

import Main from "../index";

describe("the Main component", () => {
  let component,
    handleToggleSidebarMock,
    loadDatabaseMock,
    currentDatabaseMock,
    userMock;

  beforeEach(() => {
    userMock = {};

    currentDatabaseMock = {
      export: jest.fn(() => {})
    };

    loadDatabaseMock = jest.fn();
    handleToggleSidebarMock = jest.fn();

    component = shallow(
      <Main
        user={userMock}
        currentDatabase={currentDatabaseMock}
        loadDatabase={loadDatabaseMock}
        sidebarToggleHandler={handleToggleSidebarMock}
        openSidebar={false}
      />
    );
  });

  it("works", () => {
    console.log("works");
  });
});
