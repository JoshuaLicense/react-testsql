import React from "react";

import { shallow } from "enzyme";

import Main from "../Main";

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

  it("alters the state to add a feedback item", () => {
    const feedback = { message: "Test Feedback", variant: "error" };

    component.instance().changeFeedback(feedback);

    component.update();

    expect(component.state("feedback")).toHaveProperty(
      "message",
      "Test Feedback"
    );

    expect(component.state("feedback")).toHaveProperty("variant", "error");

    expect(component.state("feedback")).toHaveProperty("timestamp");
  });
});
