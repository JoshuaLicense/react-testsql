import React from "react";
import { shallow } from "enzyme";
import GroupList from "../GroupList";

import GroupItem from "../GroupItem";

import List from "@material-ui/core/List";

import clearQuestions from "../../../questions/utils/clearQuestions";

jest.mock("../../../questions/utils/clearQuestions");

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

const loadDatabaseMock = jest.fn();
const refreshUserContextMock = jest.fn();
const joinGroupMock = jest.fn();
const leaveGroupMock = jest.fn();
const closeHandlerMock = jest.fn();

clearQuestions.mockImplementation(() => Promise.resolve());

fetch.mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(groups)
  })
);

describe("ActiveGroups component (Initial loading)", () => {
  let component;

  beforeEach(async () => {
    // Disable lifecycle methods so the script can access the load promise directly.
    component = shallow(
      <GroupList
        currentGroup={{}}
        joinGroupHandler={joinGroupMock}
        leaveGroupHandler={leaveGroupMock}
        loadDatabaseHandler={loadDatabaseMock}
        closeHandler={closeHandlerMock}
      />
    );

    // Wait for the event loop to finish.
    await flushPromises();

    component.update();

    jest.clearAllMocks();
  });

  it("shows a list of groups", async () => {
    // Data is in __mocks__/API.js, returns an array of 3 objects.
    expect(component.find(GroupItem).length).toEqual(groups.length);
  });

  it("alters padding on count > 5", async () => {
    // Mock a response with 3 array length.
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(groups.splice(0, 3))
      })
    );

    // Expecting the component to be compact.
    expect(component.find(List).prop("dense")).toEqual(true);

    // Await for the mocked API call to finish.
    await component.instance().load();
    // Update the component, with the new props.
    component.update();

    // The list shouldn't be compact yet.
    expect(component.find(List).prop("dense")).toEqual(false);
  });

  it("joins a group", async () => {
    // joinGroup mock, expects a json object to be returned.
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({})
      })
    );

    // loadDatabase mock, expects an ArrayBuffer to be returned.
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(8))
      })
    );

    const joinGroupId = "5a01082ce3db43f2a5fc548bf69c1eec";

    await component.instance().handleJoinGroup(joinGroupId);

    // Assert the relevant flow was followed.
    expect(loadDatabaseMock).toHaveBeenCalledTimes(1);
    expect(joinGroupMock).toHaveBeenCalledTimes(1);

    // Expect the group just joined to be the only new current group.
    expect(component.state("list")).toEqual(
      // Find the group the user has just joined, and set it as active
      groups.map(listGroup => {
        // Update the isCurrent for all the groups in the list, leaving the last joined group as the active one.
        listGroup.isCurrent = joinGroupId === listGroup._id;

        return listGroup;
      })
    );
  });

  it("leaves the current group", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve()
      })
    );

    await component.instance().handleLeaveGroup();

    // Assert the relevant flow was followed.
    expect(leaveGroupMock).toHaveBeenCalledTimes(1);

    // Expect all the groups to have isCurrent = false
    expect(component.state("list")).toEqual(
      groups.map(listGroup => {
        listGroup.isCurrent = false;

        return listGroup;
      })
    );
  });

  it("catches an error when trying to join a group", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () =>
          Promise.resolve({
            message: "A problem occured while trying to join this group."
          }),
        text: () =>
          Promise.resolve("A problem occured while trying to join this group.")
      })
    );

    await component
      .instance()
      .handleJoinGroup("31c286f9064f4d92911419783a7b299d");

    // Assert the relevant flow was followed.
    expect(loadDatabaseMock).toHaveBeenCalledTimes(0);
    expect(refreshUserContextMock).toHaveBeenCalledTimes(0);

    expect(component.state("error")).toEqual(
      "A problem occured while trying to join this group."
    );
  });

  it("catches an error when trying to get a list of groups", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () =>
          Promise.resolve({
            message: "A problem occured while trying to load groups."
          }),
        text: () =>
          Promise.resolve("A problem occured while trying to load groups.")
      })
    );

    await component.instance().load();

    expect(component.state("error")).toEqual(
      "A problem occured while trying to load groups."
    );
  });

  it("catches an error when trying to leave a group", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () =>
          Promise.resolve({
            message: "A problem occured while trying to leave this group."
          }),
        text: () =>
          Promise.resolve("A problem occured while trying to leave this group.")
      })
    );

    await component.instance().handleLeaveGroup();

    // Assert the relevant flow was followed.
    expect(refreshUserContextMock).toHaveBeenCalledTimes(0);

    expect(component.state("error")).toEqual(
      "A problem occured while trying to leave this group."
    );
  });

  it("calls the closeHandler props", async () => {
    await component.instance().handleClose();

    expect(closeHandlerMock).toHaveBeenCalledTimes(1);
  });
});
