import React from "react";
import { shallow } from "enzyme";
import GroupManager from "../index";

import IconButton from "@material-ui/core/IconButton";

import Dialog from "@material-ui/core/Dialog";

describe("GroupManager component", () => {
  it("renders a default group icon (not in any group)", () => {
    const groupManager = shallow(<GroupManager currentGroup={null} />);

    expect(groupManager.find(IconButton).prop("color")).toEqual("inherit");
  });

  it("renders a different group icon when in a current group", () => {
    const currentGroup = {
      _id: "123",
      title: "Test current group"
    };

    const groupManager = shallow(<GroupManager currentGroup={currentGroup} />);

    expect(groupManager.find(IconButton).prop("color")).toEqual("secondary");
  });

  it("toggle the dialog", () => {
    const groupManager = shallow(<GroupManager />);

    // Should start closed.
    expect(groupManager.find(Dialog).prop("open")).toEqual(false);

    // Simulate a click on the icon.
    groupManager.instance().handleOpen();
    // Update the instance as the component state has changed.
    groupManager.update();
    // Check if the dialog was opened.
    expect(groupManager.state("open")).toEqual(true);
    // Check the state opens the dialog.
    expect(groupManager.find(Dialog).prop("open")).toEqual(true);
    // Simulate another click, should close the dialog.
    groupManager.instance().handleClose();
    // Update the instance as the component state has changed.
    groupManager.update();
    // Check if the dialog was opened.
    expect(groupManager.state("open")).toEqual(false);
    // Check the state opens the dialog.
    expect(groupManager.find(Dialog).prop("open")).toEqual(false);
  });
});
