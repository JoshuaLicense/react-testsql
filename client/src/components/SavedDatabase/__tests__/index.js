import React from "react";
import { shallow, mount } from "enzyme";
import DatabaseManager from "../index";

import IconButton from "@material-ui/core/IconButton";

import Dialog from "@material-ui/core/Dialog";

import Route from "react-router-dom/Route";
import MemoryRouter from "react-router-dom/MemoryRouter";
import { Switch } from "react-router-dom";

import SaveDatabase from "../SaveDatabase";
import DatabaseList from "../DatabaseList";

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

  it("toggle the dialog", () => {
    // Should start closed.
    expect(component.find(Dialog).prop("open")).toEqual(false);

    // Simulate a click on the icon.
    component.instance().handleOpen();
    // Update the instance as the component state has changed.
    component.update();
    // Check if the dialog was opened.
    expect(component.state("open")).toEqual(true);
    // Check the state opens the dialog.
    expect(component.find(Dialog).prop("open")).toEqual(true);
    // Simulate another click, should close the dialog.
    component.instance().handleClose();
    // Update the instance as the component state has changed.
    component.update();
    // Check if the dialog was opened.
    expect(component.state("open")).toEqual(false);
    // Check the state opens the dialog.
    expect(component.find(Dialog).prop("open")).toEqual(false);
  });

  it('renders the default list when the URL matches "/" ', () => {
    const allRoutes = component.find(Route);

    const routeRenderComponents = mount(
      <MemoryRouter initialEntries={["/", "/database/save"]} initialIndex={0}>
        <Switch>{allRoutes.map(route => route)}</Switch>
      </MemoryRouter>
    );

    expect(routeRenderComponents.find(DatabaseList).length).toEqual(1);
  });

  it('renders the default list when the URL matches "/database/save" ', () => {
    const allRoutes = component.find(Route);

    const routeRenderComponents = mount(
      <MemoryRouter initialEntries={["/", "/database/save"]} initialIndex={1}>
        <Switch>{allRoutes.map(route => route)}</Switch>
      </MemoryRouter>
    );

    expect(routeRenderComponents.find(SaveDatabase).length).toEqual(1);
  });
});

it("displays loading the saved databases while waiting for promise to resolve", () => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({})
    })
  );

  const component = shallow(<DatabaseManager />);

  expect(
    component.contains(<div>Loading your saved databases...</div>)
  ).toBeTruthy();
});
