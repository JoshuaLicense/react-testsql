import React from "react";
import { shallow, mount } from "enzyme";

import ManageGroup from "../ManageGroup";

import { getGroup, updateGroup, removeUserFromGroup } from "../API";

jest.mock("../API");

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

const group = {
  _id: "31c286f9064f4d92911419783a7b299d",
  title: "Active Group 1",
  users: [
    {
      _id: "4d902964419729116f983a731c28fb9d",
      username: "User 1"
    }
  ]
};

describe("ManageGroup component", () => {
  let component, closeHandlerMock;

  beforeEach(async () => {
    closeHandlerMock = jest.fn();

    getGroup.mockImplementation(id => new Promise(resolve => resolve(group)));

    component = shallow(
      <ManageGroup
        match={{ params: { id: 1 }, isExact: true, path: "", url: "" }}
        closeHandler={closeHandlerMock}
      />
    );

    // Wait for the event loop to finish.
    await flushPromises();

    component.update();
  });

  it("renders and tries to get the group's information", () => {
    // Check the API was called, only once.
    expect(getGroup).toHaveBeenCalledTimes(1);

    expect(component.state()).toEqual({
      group,
      errors: null,
      controlledTitle: group.title
    });
  });
});

it("displays loading a group while waiting for promise to resolve", () => {
  getGroup.mockImplementation(() => new Promise(resolve => resolve(group)));

  const component = shallow(
    <ManageGroup
      match={{ params: { id: 1 }, isExact: true, path: "", url: "" }}
    />
  );

  expect(
    component.contains(<div>Loading group information...</div>)
  ).toBeTruthy();
});
