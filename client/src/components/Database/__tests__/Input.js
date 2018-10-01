import React from "react";

import { shallow } from "enzyme";

import DatabaseInput from "../Input";

const submitHandlerMock = jest.fn();

describe("Database Input component", () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <DatabaseInput submitHandler={submitHandlerMock} />
    ).dive();
  });

  it("Controls the input when a change is detected", () => {
    component.instance().handleChange("Test input");

    component.update();

    expect(component.state("statement")).toEqual("Test input");
  });

  it("Clears the current saved statement", () => {
    component = component.setState({ statement: "Example input" });

    component.instance().handleClear();

    expect(component.state("statement")).toEqual("");
  });

  it("Submits the current statement to the submit handler prop", () => {
    component = component.setState({ statement: "Example input" });

    component.instance().handleSubmit();

    expect(submitHandlerMock).toHaveBeenCalledTimes(1);
  });
});
