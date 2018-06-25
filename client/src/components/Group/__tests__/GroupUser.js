import React from "react";
import { shallow } from "enzyme";

import RemoveUserIcon from "@material-ui/icons/RemoveCircle";

import GroupUser from "../GroupUser";

describe("GroupItem component", () => {
  let removeHandlerMock;

  beforeEach(() => {
    jest.resetAllMocks();

    removeHandlerMock = jest.fn();
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

    const removeUserButton = component.find(RemoveUserIcon).parent();

    removeUserButton.simulate("click");

    expect(removeHandlerMock).toHaveBeenCalledTimes(1);
  });
});