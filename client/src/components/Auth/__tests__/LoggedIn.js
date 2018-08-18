import React from "react";

import { shallow } from "enzyme";

import LoggedIn from "../LoggedIn";

const refreshUserContextMock = jest.fn();

describe("the LoggedIn component", () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <LoggedIn refreshUserContext={refreshUserContextMock} />
    );
  });

  it("Calls the API to log out the current user", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve()
      })
    );

    await component.instance().handleLogout();

    expect(refreshUserContextMock).toHaveBeenCalledTimes(1);
  });
});
