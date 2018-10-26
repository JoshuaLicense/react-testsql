import React from "react";
import { shallow } from "enzyme";

import CreateGroup from "../CreateGroup";

import { Redirect } from "react-router-dom";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

const databases = [
  {
    _id: "b644ac4be9cef3b005183947b48720b1",
    title: "Database 1"
  },
  {
    _id: "39e9f314e84ac4b2c48747b005bb60b1",
    title: "Database 2"
  },
  {
    _id: "51839c4be9cef3b047b48b644a0720b1",
    title: "Database 3"
  }
];

const closeHandlerMock = jest.fn();

describe("CreateGroup component", () => {
  let component;

  beforeEach(async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(databases)
      })
    );

    component = shallow(<CreateGroup closeHandler={closeHandlerMock} />);

    // Wait for the event loop to finish.
    await flushPromises();

    component.update();

    jest.clearAllMocks();
  });

  it("renders and lists all the users saved databases", () => {
    expect(component.state()).toEqual({
      list: databases,
      error: null,
      redirect: false,
      name: "",
      selectedDatabase: ""
    });
  });

  it("creates a new group", async () => {
    component = component.setState({
      name: "Test group",
      selectedDatabase: "51839c4be9cef3b047b48b644a0720b1"
    });

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve()
      })
    );

    await component.instance().handleSubmit();

    // Update the component, to allow state changes to take effect.
    component.update();

    // Expect the redirect state flag to true, and a redirect is "rendered".
    expect(component.state("redirect")).toBeTruthy();
    expect(component.find(Redirect).length).toEqual(1);
  });

  it("sets an error while creating a new group", async () => {
    // Error text to be hidden initially.
    expect(
      component
        .find(FormHelperText)
        .findWhere(elem => elem.props().id === "name-error-text").length
    ).toEqual(0);

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () =>
          Promise.resolve({
            message: "A problem occured while trying to create a group."
          }),
        text: () =>
          Promise.resolve("A problem occured while trying to create a group.")
      })
    );

    await component.instance().handleSubmit();

    expect(component.state("error")).toEqual(
      "A problem occured while trying to create a group."
    );

    component.update();

    expect(
      component
        .find(FormHelperText)
        .findWhere(elem => elem.props().id === "name-error-text").length
    ).toEqual(1);
  });

  it("updates the state onChange input, controlled input", () => {
    component.find(Input).simulate("change", {
      target: { name: "name", value: "Text" }
    });

    component.update();

    expect(component.state("name")).toEqual("Text");
  });
});
