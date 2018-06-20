import React from "react";
import { shallow } from "enzyme";
import GroupList from "../GroupList";

import GroupItem from "../GroupItem";

import List from "@material-ui/core/List";

import { listGroups, joinGroup, leaveGroup, leaveCurrentGroup } from "../API";

jest.mock("../API.js");

jest.mock("../../SavedDatabase/API.js");

const groups = [
  {
    _id: "31c286f9064f4d92911419783a7b299d",
    title: "Active Group 1",
    isCurrent: true,
    canManage: false,
    canLeave: true,
    completedQuestions: 1,
    totalQuestions: 10,
    database: "5b11836cbc21661f106cdc93"
  },
  {
    _id: "d00ff47f9d8a48deb488acd70fdd0628",
    title: "Active Group 2",
    isCurrent: false,
    canManage: true,
    canLeave: false,
    completedQuestions: 1,
    totalQuestions: 10,
    database: "5b11836cbc21661f106cdc93"
  },
  {
    _id: "5a01082ce3db43f2a5fc548bf69c1eec",
    title: "Active Group 3",
    isCurrent: false,
    canManage: true,
    canLeave: false,
    completedQuestions: 1,
    totalQuestions: 10,
    database: "5b11836cbc21661f106cdc93"
  },
  {
    _id: "055d47120cd4485d84123ae69c6d8e39",
    title: "Active Group 4",
    isCurrent: false,
    canManage: true,
    canLeave: false,
    completedQuestions: 1,
    totalQuestions: 10,
    database: "5b11836cbc21661f106cdc93"
  },
  {
    _id: "518b00af33c64947b48724be49ceb0b1",
    title: "Active Group 5",
    isCurrent: false,
    canManage: true,
    canLeave: false,
    completedQuestions: 1,
    totalQuestions: 10,
    database: "5b11836cbc21661f106cdc93"
  },
  {
    _id: "b59fd64ea748402d9abf2a2c6183f9c5",
    title: "Active Group 6",
    isCurrent: false,
    canManage: true,
    canLeave: false,
    completedQuestions: 1,
    totalQuestions: 10,
    database: "5b11836cbc21661f106cdc93"
  }
];

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

describe("ActiveGroups component (Initial loading)", () => {
  let component, loadDatabaseMock, refreshUserContextMock;

  beforeEach(async () => {
    loadDatabaseMock = jest.fn();
    refreshUserContextMock = jest.fn();

    // Mock so only 3 active groups are rendered.
    listGroups.mockImplementation(
      () => new Promise(resolve => resolve(groups))
    );

    // Disable lifecycle methods so the script can access the load promise directly.
    component = shallow(
      <GroupList
        loadDatabaseHandler={loadDatabaseMock}
        refreshUserContext={refreshUserContextMock}
      />
    );

    // Wait for the event loop to finish.
    await flushPromises();

    component.update();
  });

  it("shows a list of groups", async () => {
    // Data is in __mocks__/API.js, returns an array of 3 objects.
    expect(component.find(GroupItem).length).toEqual(groups.length);

    // Check the API was called, only once.
    expect(listGroups).toHaveBeenCalledTimes(1);
  });

  it("alters padding on count > 5", async () => {
    // Expecting the component to be compact.
    expect(component.find(List).prop("dense")).toEqual(true);
    // Mock so only 3 active groups are rendered.
    listGroups.mockImplementationOnce(
      () => new Promise(resolve => resolve(groups.slice(0, 3)))
    );

    // Await for the mocked API call to finish.
    await component.instance().load();
    // Update the component, with the new props.
    component.update();

    // The list shouldn't be compact yet.
    expect(component.find(List).prop("dense")).toEqual(false);
  });

  it("joins a group", async () => {
    joinGroup.mockImplementation(
      id =>
        new Promise((resolve, reject) => {
          const joinedGroup = groups.find(group => group._id === id);

          if (!joinedGroup) {
            return reject();
          }

          return resolve({
            ...joinedGroup,
            database: "49af33548724bec6494ceb018b007bb1"
          });
        })
    );

    await component
      .instance()
      .handleJoinGroup("31c286f9064f4d92911419783a7b299d");

    // Assert the relevant flow was followed.
    expect(joinGroup).toHaveBeenCalledTimes(1);
    expect(loadDatabaseMock).toHaveBeenCalledTimes(1);
    expect(refreshUserContextMock).toHaveBeenCalledTimes(1);
  });

  it("leaves the current group", async () => {
    leaveCurrentGroup.mockImplementation(
      () => new Promise(resolve => resolve())
    );

    await component.instance().handleLeaveCurrentGroup();

    // Assert the relevant flow was followed.
    expect(leaveCurrentGroup).toHaveBeenCalledTimes(1);
    expect(refreshUserContextMock).toHaveBeenCalledTimes(1);
  });
});
