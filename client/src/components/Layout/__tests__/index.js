import React from "react";

import { shallow } from "enzyme";

import Layout from "../index";

describe("the Layout component", () => {
  let component;

  beforeEach(() => {
    component = shallow(<Layout />);
  });

  // Only takes effect when the screen resolution is below medium.
  it("toggles the sidebar", () => {
    // The sidebar should start as hidden.
    expect(component.state("openSidebar")).toBeFalsy();

    // Try to toggle the sidebar.
    component.instance().handleToggleSidebar();

    // Update the component.
    component.update();

    expect(component.state("openSidebar")).toBeTruthy();

    // Force close the sidebar.
    component.instance().handleToggleSidebar(false);
    // Twice for good measure.
    component.instance().handleToggleSidebar(false);

    // Update the component.
    component.update();

    expect(component.state("openSidebar")).toBeFalsy();
  });
});
