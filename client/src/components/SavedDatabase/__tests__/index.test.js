import React from "react";
import { shallow } from "enzyme";
import DatabaseManager from "../index";

import IconButton from "@material-ui/core/IconButton";

import Dialog from "@material-ui/core/Dialog";

describe("DatabaseManager component", () => {
  let databaseManager;

  beforeEach(() => {
    databaseManager = shallow(<DatabaseManager />);
  });

  it("renders a default database icon (not in any group)", () => {
    expect(databaseManager.find(IconButton).prop("disabled")).toBeFalsy();
  });

  it("renders a disabled icon when in a current group", () => {
    // Add a current group prop.
    databaseManager = databaseManager.setProps({ disabled: true });

    expect(databaseManager.find(IconButton).prop("disabled")).toBeTruthy();
  });

  it("toggle the dialog", () => {
    // Should start closed.
    expect(databaseManager.find(Dialog).prop("open")).toEqual(false);

    // Simulate a click on the icon.
    databaseManager.instance().handleOpen();
    // Update the instance as the component state has changed.
    databaseManager.update();
    // Check if the dialog was opened.
    expect(databaseManager.state("open")).toEqual(true);
    // Check the state opens the dialog.
    expect(databaseManager.find(Dialog).prop("open")).toEqual(true);
    // Simulate another click, should close the dialog.
    databaseManager.instance().handleClose();
    // Update the instance as the component state has changed.
    databaseManager.update();
    // Check if the dialog was opened.
    expect(databaseManager.state("open")).toEqual(false);
    // Check the state opens the dialog.
    expect(databaseManager.find(Dialog).prop("open")).toEqual(false);
  });
});
