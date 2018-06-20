import React from "react";
import { shallow, mount, render } from "enzyme";
import GroupManager from "../index";

import IconButton from "@material-ui/core/IconButton";

import Dialog from "@material-ui/core/Dialog";

import Route from "react-router-dom/Route";
import MemoryRouter from "react-router-dom/MemoryRouter";
import { Switch } from "react-router-dom";

import GroupList from "../GroupList";
import CreateGroup from "../CreateGroup";
import ManageGroup from "../ManageGroup";

jest.mock("../GroupList.js");
jest.mock("../CreateGroup.js");
jest.mock("../ManageGroup.js");

GroupList.mockImplementation(() => true);
CreateGroup.mockImplementation(() => true);
ManageGroup.mockImplementation(() => true);

describe("GroupManager component", () => {
  let component;

  beforeEach(() => {
    component = shallow(<GroupManager />);
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
      <MemoryRouter
        initialEntries={["/", "/group/manage", "/group/create"]}
        initialIndex={0}
      >
        <Switch>{allRoutes.map(route => route)}</Switch>
      </MemoryRouter>
    );

    expect(routeRenderComponents.find(GroupList).length).toEqual(1);
  });

  it('renders the default list when the URL matches "/group/create" ', () => {
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

  it('renders the default list when the URL matches "/group/manage/:id" ', () => {
    const allRoutes = component.find(Route);

    const routeRenderComponents = mount(
      <MemoryRouter
        initialEntries={["/", "/group/create", "/group/manage/a_group_id"]}
        initialIndex={2}
      >
        <Switch>{allRoutes.map(route => route)}</Switch>
      </MemoryRouter>
    );

    expect(routeRenderComponents.find(ManageGroup).length).toEqual(1);
  });
});
