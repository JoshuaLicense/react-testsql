import React from "react";
import { shallow, mount } from "enzyme";
import DatabaseManager from "../DatabaseManager";

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
    component = shallow(
      <DatabaseManager
        currentDatabase={jest.fn()}
        loadDatabaseHandler={jest.fn()}
      />
    );

    // Wait for the event loop to finish.
    await flushPromises();

    component.update();
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
