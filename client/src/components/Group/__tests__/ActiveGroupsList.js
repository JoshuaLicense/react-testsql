import React from "react";
import { shallow } from "enzyme";
import ActiveGroupList from "../ActiveGroupList";

import GroupItem from "../GroupItem";

import { listActiveGroups } from "../API";

jest.mock("../API.js");

const activeGroups = [
  {
    _id: "31c286f9064f4d92911419783a7b299d",
    title: "Active Group 1",
    isCurrent: false,
    canManage: false,
    canLeave: true
  },
  {
    _id: "d00ff47f9d8a48deb488acd70fdd0628",
    title: "Active Group 2",
    isCurrent: false,
    canManage: true,
    canLeave: false
  },
  {
    _id: "5a01082ce3db43f2a5fc548bf69c1eec",
    title: "Active Group 3",
    isCurrent: false,
    canManage: true,
    canLeave: false
  },
  {
    _id: "055d47120cd4485d84123ae69c6d8e39",
    title: "Active Group 4",
    isCurrent: false,
    canManage: true,
    canLeave: false
  },
  {
    _id: "518b00af33c64947b48724be49ceb0b1",
    title: "Active Group 5",
    isCurrent: false,
    canManage: true,
    canLeave: false
  },
  {
    _id: "b59fd64ea748402d9abf2a2c6183f9c5",
    title: "Active Group 6",
    isCurrent: false,
    canManage: true,
    canLeave: false
  }
];

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

describe("ActiveGroups component", () => {
  it("shows a list of the active groups", async () => {
    listActiveGroups.mockImplementation(
      () => new Promise(resolve => resolve(activeGroups))
    );

    const component = shallow(<ActiveGroupList />);

    // Wait for the event loop to finish.
    await flushPromises();

    component.update();

    // Data is in __mocks__/API.js, returns an array of 3 objects.
    expect(component.find(GroupItem).length).toEqual(activeGroups.length);

    // Check the API was called, only once.
    expect(listActiveGroups).toHaveBeenCalledTimes(1);
  });

  it("alters padding on count > 5", async () => {
    // Disable lifecycle methods so the script can access the load promise directly.
    const component = shallow(<ActiveGroupList />, {
      disableLifecycleMethods: true
    });

    // Mock so only 3 active groups are rendered.
    listActiveGroups.mockImplementation(
      () => new Promise(resolve => resolve(activeGroups.slice(0, 3)))
    );

    // Await for the mocked API call to finish.
    await component.instance().load();

    // Update the component, with the new props.
    component.update();

    // The list shouldn't be compact yet.
    expect(component.prop("dense")).toEqual(false);

    // Use the full active group list.
    listActiveGroups.mockImplementation(
      () => new Promise(resolve => resolve(activeGroups))
    );

    await component.instance().load();

    component.update();

    // Expecting the component to be compact.
    expect(component.prop("dense")).toEqual(true);
  });
});
