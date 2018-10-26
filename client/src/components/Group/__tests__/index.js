import React from "react";
import { shallow, mount } from "enzyme";
import Group from "../index";

import IconButton from "@material-ui/core/IconButton";

import Dialog from "@material-ui/core/Dialog";

import GroupList from "../GroupList";
import CreateGroup from "../CreateGroup";
import ManageGroup from "../Manage";

jest.mock("../GroupList.js");
jest.mock("../CreateGroup.js");
jest.mock("../Manage");

GroupList.mockImplementation(() => true);
CreateGroup.mockImplementation(() => true);
ManageGroup.mockImplementation(() => true);

describe("Group component", () => {
  let component;

  beforeEach(() => {
    component = shallow(<Group />);
  });

  it("renders a default group icon (not in any group)", () => {
    expect(component.find(IconButton).prop("color")).toEqual("inherit");
  });

  it("renders a different group icon when in a current group", () => {
    const currentGroup = {
      _id: "123",
      title: "Test current group"
    };

    // Add a current group prop.
    component = component.setProps({ currentGroup });

    expect(component.find(IconButton).prop("color")).toEqual("secondary");
  });
});
