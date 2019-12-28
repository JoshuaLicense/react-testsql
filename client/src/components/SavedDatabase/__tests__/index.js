import React from "react";
import { shallow, mount } from "enzyme";
import DatabaseManager from "../index";

import IconButton from "@material-ui/core/IconButton";

import Dialog from "@material-ui/core/Dialog";

import { Switch, Route, MemoryRouter } from "react-router-dom";

import SaveDatabase from "../SaveDatabase";
import DatabaseList from "../DatabaseList";
import Tooltip from "@material-ui/core/Tooltip";

jest.mock("../SaveDatabase.js");
jest.mock("../DatabaseList.js");

DatabaseList.mockImplementation(() => true);
SaveDatabase.mockImplementation(() => true);

fetch.mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({})
  })
);

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

describe("DatabaseManager component", () => {
  let component;

  beforeEach(async () => {
    component = shallow(<DatabaseManager />);

    // Wait for the event loop to finish.
    await flushPromises();

    component.update();
  });

  it("renders a default database icon (not in any group)", () => {
    expect(component.find(IconButton).prop("disabled")).toBeFalsy();
  });

  it("renders a disabled icon when in a current group", () => {
    // Add a current group prop.
    component = component.setProps({ disabled: true });

    expect(component.find(IconButton).prop("disabled")).toBeTruthy();
  });
});
