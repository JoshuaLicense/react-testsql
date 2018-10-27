import React from "react";

import { shallow } from "enzyme";

import Guest from "../Guest";

const loginMock = jest.fn();

describe("the Guest component", () => {
  let component;

  beforeEach(() => {
    component = shallow(<Guest loginHandler={loginMock} />);
  });

  it("tries to login when handling the submit", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(),
        text: () => Promise.resolve("OK")
      })
    );

    component = component.setState({
      username: "Test username",
      password: "Test password"
    });

    // Mimic a login call.
    await component.instance().handleLogin();

    expect(loginMock).toHaveBeenCalledTimes(1);
  });

  it("correctly updates the state when handling a change", () => {
    const changeUsernameEvent = {
      target: {
        id: "username",
        value: "Test username"
      }
    };

    const changePasswordEvent = {
      target: {
        id: "password",
        value: "Test password"
      }
    };

    component.instance().handleChange(changeUsernameEvent);

    expect(component.state("username")).toEqual(
      changeUsernameEvent.target.value
    );

    component.instance().handleChange(changePasswordEvent);

    expect(component.state("password")).toEqual(
      changePasswordEvent.target.value
    );
  });

  it("opens the dialog on handleOpen", () => {
    // Should start at false
    expect(component.state("open")).toBeFalsy();

    component.instance().handleOpen();

    component.update();

    // The state should be updated accordingly
    expect(component.state("open")).toBeTruthy();
  });

  it("closes the dialog on handleClose", () => {
    // Start the component at the open state.
    component = component.setState({ open: true });

    component.instance().handleClose();

    component.update();

    // The state should be updated accordingly
    expect(component.state("open")).toBeFalsy();
  });
});
