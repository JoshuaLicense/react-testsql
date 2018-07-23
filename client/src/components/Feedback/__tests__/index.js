import React from "react";
import { shallow } from "enzyme";

import Feedback from "../";

const testFeedback = {
  message: "Test feedback message",
  variant: "error",
  timestamp: Date.now()
};

const testFeedback2 = {
  message: "Test feedback message 2",
  variant: "success",
  timestamp: Date.now() + 10
};

describe("Feedback component", () => {
  let component;

  beforeEach(() => {
    component = shallow(<Feedback classes={{}} />).dive();
  });

  it("renders nothing on first load", () => {
    expect(component.type()).toBeNull();
  });

  it("adds a message to the queue when recieving new props.", () => {
    component = component.setProps(testFeedback);

    expect(component.state()).toMatchObject(testFeedback);

    component = component.setProps(testFeedback2);
  });

  it("adds a message to the queue when recieving new props", () => {
    component = component.setProps(testFeedback);

    expect(component.state()).toMatchObject(testFeedback);

    expect(component.state("open")).toBeTruthy();
  });

  it("dismisses the current feedback message upon a new message and displays the next message", () => {
    component = component.setProps(testFeedback);

    expect(component.state()).toMatchObject(testFeedback);

    expect(component.state("open")).toBeTruthy();

    component = component.setProps(testFeedback2);

    expect(component.state("open")).toBeFalsy();
    // When the feedback exits it will trigger the this.processQueue()
    component.instance().handleExited();

    // Update the component.
    component.update();

    // Expect the state to match the new testFeedback2 object.
    expect(component.state()).toMatchObject(testFeedback2);
  });

  it("handles closing of a feedback item (depending on reason)", () => {
    component = component.setProps(testFeedback);

    // Start at the feedback item to be open.
    expect(component.state("open")).toBeTruthy();

    // Trigger the handleClose, with the reason "clickaway". This should be ignored.
    component.instance().handleClose({}, "clickaway");

    component.update();

    // So expect the feedback snackbar to stay open.
    expect(component.state("open")).toBeTruthy();

    // Trigger the handleClose, with the reason other than "clickaway". This should be NOT ignored.
    component.instance().handleClose({}, "valid-reason");

    component.update();

    // So expect the feedback snackbar to stay open.
    expect(component.state("open")).toBeFalsy();
  });
});
