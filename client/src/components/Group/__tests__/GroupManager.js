import React from "react";
import { shallow, mount } from "enzyme";
import GroupManager from "../GroupManager";

import { Switch, Route, MemoryRouter } from "react-router-dom";

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
    component = shallow(<GroupManager />);
  });

  it('renders the default list when the URL matches "/" ', () => {
    const allRoutes = component.find(Route);

    const routeRenderComponents = mount(
      <MemoryRouter
        initialEntries={["/", "/group/manage", "/group/create"]}
        initialIndex={0}
      >
        <Switch>{allRoutes.map(route => route)}</Switch>
      </MemoryRouter>
    );

    expect(routeRenderComponents.find(GroupList).length).toEqual(1);
  });

  it('renders the create a group component when the URL matches "/group/create" ', () => {
    const allRoutes = component.find(Route);

    const routeRenderComponents = mount(
      <MemoryRouter
        initialEntries={["/", "/group/create", "/group/manage"]}
        initialIndex={1}
      >
        <Switch>{allRoutes.map(route => route)}</Switch>
      </MemoryRouter>
    );

    expect(routeRenderComponents.find(CreateGroup).length).toEqual(1);
  });

  it('renders the manage a group component when the URL matches "/group/manage/:id/:title" ', () => {
    const allRoutes = component.find(Route);

    const routeRenderComponents = mount(
      <MemoryRouter
        initialEntries={[
          "/",
          "/group/create",
          "/group/manage/a_group_id/a_group_title"
        ]}
        initialIndex={2}
      >
        <Switch>{allRoutes.map(route => route)}</Switch>
      </MemoryRouter>
    );

    expect(routeRenderComponents.find(ManageGroup).length).toEqual(1);
  });
});
