import React from "react";
import { shallow } from "enzyme";

import RemoveUserIcon from "@material-ui/icons/RemoveCircleOutline";

import GroupUser from "../GroupUser";

const removeHandlerMock = jest.fn();

describe("GroupItem component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays/hides the option to remove a user", () => {
    const userCanRemove = {
      _id: "31c286f9064f4d92911419783a7b299d",
      username: false,
      canRemove: true,
      questionsCompleted: 1,
      totalQuestions: 10
    };

    const componentWithRemoveUserOption = shallow(
      <GroupUser user={userCanRemove} removeHandler={removeHandlerMock} />
    );

    expect(componentWithRemoveUserOption.find(RemoveUserIcon).length).toEqual(
      1
    );

    const userCannotRemove = {
      _id: "31c286f9064f4d92911419783a7b299d",
      username: false,
      canRemove: false,
      questionsCompleted: 1,
      totalQuestions: 10
    };

    const componentWithoutRemoveUserOption = shallow(
      <GroupUser user={userCannotRemove} removeHandler={removeHandlerMock} />
    );

    expect(
      componentWithoutRemoveUserOption.find(RemoveUserIcon).length
    ).toEqual(0);
  });

  it("removes the user from this group", () => {
    const user = {
      _id: "31c286f9064f4d92911419783a7b299d",
      username: false,
      canRemove: true,
      questionsCompleted: 1,
      totalQuestions: 10
    };

    const component = shallow(
      <GroupUser user={user} removeHandler={removeHandlerMock} />
    );

    component.instance().handleRemoveUser();

    expect(removeHandlerMock).toHaveBeenCalledTimes(1);
  });
});
