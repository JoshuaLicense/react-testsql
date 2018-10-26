import React from "react";
import { shallow } from "enzyme";

import ManageGroup from "../Manage";

import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import { DialogContentText, DialogContent } from "@material-ui/core";

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

const group = {
  _id: "31c286f9064f4d92911419783a7b299d",
  title: "Active Group 1",
  users: [
    {
      _id: "4d902964419729116f983a731c28fb9d",
      username: "User 1"
    },
    {
      _id: "2911696441f983a731c284d90297fb9d",
      username: "User 2"
    }
  ]
};

const closeHandlerMock = jest.fn();

fetch.mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(group)
  })
);

describe("ManageGroup component", () => {
  let component;

  beforeEach(async () => {
    component = shallow(
      <ManageGroup
        match={{ params: { id: 1 }, isExact: true, path: "", url: "" }}
        closeHandler={closeHandlerMock}
      />
    );

    // Wait for the event loop to finish.
    await flushPromises();

    component.update();

    jest.clearAllMocks();
  });

  it("renders and tries to get the group's information", () => {
    expect(component.state()).toEqual({
      group,
      error: null,
      controlledTitle: group.title
    });
  });

  // TODO: Remove server side call and remove the user in the state.
  it("calls the RemoveUser API and reloads the group data", async () => {
    const group = {
      _id: "31c286f9064f4d92911419783a7b299d",
      title: "Active Group 1",
      users: [
        {
          _id: "2911696441f983a731c284d90297fb9d",
          username: "User 2"
        }
      ]
    };

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve()
      })
    );

    await component
      .instance()
      .handleRemoveUser("4d902964419729116f983a731c28fb9d");

    component.update();

    expect(component.state()).toEqual({
      group,
      error: null,
      controlledTitle: group.title
    });
  });

  it("calls the UpdateGroup API and reloads the group data", async () => {
    // Mock the call inside updateGroup() API call.
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve()
      })
    );

    component = component.setState({ controlledTitle: "Updated Title 2" });

    await component.instance().handleUpdateGroup();

    component.update();

    expect(component.state("group")).toHaveProperty("title", "Updated Title 2");
  });

  it("sets an error while creating a new group", async () => {
    // Error text to be hidden initially.
    expect(component.find(DialogContentText).length).toEqual(0);

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () =>
          Promise.resolve({
            message: "A problem occured while trying to manage this group."
          }),
        text: () =>
          Promise.resolve(
            "A problem occured while trying to manage this group."
          )
      })
    );

    await component.instance().loadGroup();

    expect(component.state("error")).toEqual(
      "A problem occured while trying to manage this group."
    );

    component.update();

    expect(component.find(DialogContentText).length).toEqual(1);
  });
});

it("displays loading a group while waiting for promise to resolve", () => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(group)
    })
  );

  const component = shallow(
    <ManageGroup
      match={{ params: { id: 1 }, isExact: true, path: "", url: "" }}
    />
  );

  expect(
    component.find(DialogContentText).text("Loading group information...")
  ).toBeTruthy();
});
