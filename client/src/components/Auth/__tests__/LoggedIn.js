import React from "react";

import { shallow } from "enzyme";

import LoggedIn from "../LoggedIn";

const logoutMock = jest.fn();
const joinGroupMock = jest.fn();
const leaveGroupMock = jest.fn();

describe("the LoggedIn component", () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <LoggedIn
        user={{}}
        joinGroup={joinGroupMock}
        leaveGroup={leaveGroupMock}
        logoutHandler={logoutMock}
      />
    );
  });

  it("Calls the API to log out the current user", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(),
        text: () => Promise.resolve("OK")
      })
    );

    await component.instance().handleLogout();

    expect(logoutMock).toHaveBeenCalledTimes(1);
  });
});
