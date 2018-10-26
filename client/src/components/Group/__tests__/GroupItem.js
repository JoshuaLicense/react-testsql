import React from "react";
import { shallow } from "enzyme";

import LeaveIcon from "@material-ui/icons/ExitToApp";
import ManageIcon from "@material-ui/icons/Settings";

import GroupItem from "../GroupItem";

const joinGroupMock = jest.fn();
const leaveGroupMock = jest.fn();

describe("GroupItem component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("joins a group on click", () => {
    const group = {
      _id: "31c286f9064f4d92911419783a7b299d",
      title: "Active Group 1",
      isCurrent: true,
      canManage: false,
      canLeave: true,
      completedQuestions: 1,
      totalQuestions: 10,
      database: "5b11836cbc21661f106cdc93"
    };

    const component = shallow(
      <GroupItem
        group={group}
        joinGroupHandler={joinGroupMock}
        leaveGroupHandler={leaveGroupMock}
      />
    );

    component.simulate("click");

    expect(joinGroupMock).toHaveBeenCalledTimes(1);
  });

  it("allows the user to leave their current group", () => {
    const group = {
      _id: "31c286f9064f4d92911419783a7b299d",
      title: "Active Group 1",
      isCurrent: true,
      canManage: false,
      canLeave: true,
      completedQuestions: 1,
      totalQuestions: 10,
      database: "5b11836cbc21661f106cdc93"
    };

    const component = shallow(
      <GroupItem
        group={group}
        joinGroupHandler={joinGroupMock}
        leaveGroupHandler={leaveGroupMock}
      />
    );

    // Find the leave group icon.
    const leaveIconComponent = component.find(LeaveIcon);

    // Expect there to be one as isCurrent: true
    expect(leaveIconComponent.length).toEqual(1);

    // Simulate a click of the icon.
    leaveIconComponent.parent().simulate("click");

    // Should call the relevant prop.
    expect(leaveGroupMock).toHaveBeenCalledTimes(1);
  });

  it("doesn't allow the user to leave a group that is not current", () => {
    const group = {
      _id: "31c286f9064f4d92911419783a7b299d",
      title: "Active Group 1",
      isCurrent: false,
      canManage: false,
      canLeave: true,
      completedQuestions: 1,
      totalQuestions: 10,
      database: "5b11836cbc21661f106cdc93"
    };

    const component = shallow(
      <GroupItem
        group={group}
        joinGroupHandler={joinGroupMock}
        leaveGroupHandler={leaveGroupMock}
      />
    );

    // Find the leave group icon.
    const leaveIconComponent = component.find(LeaveIcon);

    // Expect there to be one as isCurrent: true
    expect(leaveIconComponent.length).toEqual(0);
  });

  it("allows the user to manage a group", () => {
    const group = {
      _id: "31c286f9064f4d92911419783a7b299d",
      title: "Active Group 1",
      isCurrent: true,
      canManage: true,
      completedQuestions: 1,
      totalQuestions: 10,
      database: "5b11836cbc21661f106cdc93"
    };

    const component = shallow(
      <GroupItem
        group={group}
        joinGroupHandler={joinGroupMock}
        leaveGroupHandler={leaveGroupMock}
      />
    );

    // Find the leave group icon.
    const manageIconComponent = component.find(ManageIcon);

    // Expect there to be one as isCurrent: true
    expect(manageIconComponent.length).toEqual(1);

    // Simulate a click of the icon.
    manageIconComponent.parent().simulate("click");

    // TODO: Expect URL to change....
  });

  it("doesn't allow the user to leave a group that is not current", () => {
    const group = {
      _id: "31c286f9064f4d92911419783a7b299d",
      title: "Active Group 1",
      isCurrent: false,
      canManage: false,
      completedQuestions: 1,
      totalQuestions: 10,
      database: "5b11836cbc21661f106cdc93"
    };

    const component = shallow(
      <GroupItem
        group={group}
        joinGroupHandler={joinGroupMock}
        leaveGroupHandler={leaveGroupMock}
      />
    );

    // Find the leave group icon.
    const manageIconComponent = component.find(ManageIcon);

    // Expect there to be one as isCurrent: true
    expect(manageIconComponent.length).toEqual(0);
  });
});
