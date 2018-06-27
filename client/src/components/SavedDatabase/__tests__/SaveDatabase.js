import React from "react";
import { shallow } from "enzyme";

import SaveDatabase from "../SaveDatabase";

import { Redirect } from "react-router-dom";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

describe("SaveDatabase component", () => {
  let component, refreshHandlerMock, closeHandlerMock;

  beforeEach(async () => {
    jest.resetAllMocks();

    closeHandlerMock = jest.fn();
    refreshHandlerMock = jest.fn();

    const currentDatabaseMock = {
      export: jest.fn(() => {})
    };

    component = shallow(
      <SaveDatabase
        currentDatabase={currentDatabaseMock}
        currentSavedDatabaseCount={1}
        refreshHandler={refreshHandlerMock}
        closeHandler={closeHandlerMock}
      />
    );

    // Wait for the event loop to finish.
    await flushPromises();

    component.update();
  });

  it("creates a new group", async () => {
    component = component.setState({
      title: "Test database title"
    });

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({})
      })
    );

    await component.instance().handleSaveDatabase();

    // Update the component, to allow state changes to take effect.
    component.update();

    // Expect an API call was made.
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(refreshHandlerMock).toHaveBeenCalledTimes(1);

    // Expect the redirect state flag to true, and a redirect is "rendered".
    expect(component.state("redirect")).toBeTruthy();
    expect(component.find(Redirect).length).toEqual(1);
  });

  it("sets an error while creating trying to save a database", async () => {
    // Error text to be hidden initially.
    expect(component.find(FormHelperText).length).toEqual(0);

    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () =>
          Promise.resolve({
            message: "A problem occured while trying to save this database."
          })
      })
    );

    await component.instance().handleSaveDatabase();

    expect(component.state("error")).toEqual(
      "A problem occured while trying to save this database."
    );

    component.update();

    expect(component.find(FormHelperText).length).toEqual(1);
  });

  it("updates the state onChange input, controlled input", () => {
    component.find(Input).simulate("change", {
      target: { name: "name", value: "Example title" }
    });

    component.update();

    expect(component.state("title")).toEqual("Example title");
  });

  it("calls the closeHandler props", async () => {
    await component.instance().handleClose();

    expect(closeHandlerMock).toHaveBeenCalledTimes(1);
  });
});
