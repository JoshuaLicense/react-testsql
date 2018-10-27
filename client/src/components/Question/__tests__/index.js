import React from "react";
import { shallow } from "enzyme";
import QuestionManager from "../index";
import Typography from "@material-ui/core/Typography";

import StepLabel from "@material-ui/core/StepLabel";

const questions = [
  { index: 0, set: "Test set 1", question: "Test question 1", completed: true },
  {
    index: 1,
    set: "Test set 2",
    question: "Test question 2",
    completed: false
  },
  {
    index: 2,
    set: "Test set 2",
    question: "Test question 3",
    error: "A problem occurred while building this question."
  },
  { index: 3, set: "Test set 1", question: "Test question 4", completed: true },
  {
    index: 4,
    set: "Test set 1",
    question: "Test question 5",
    completed: false,
    error: "A problem occurred while building this question."
  }
];

const changeQuestionMock = jest.fn();

describe("Question component", () => {
  let component;

  beforeEach(() => {
    // Dive as the component is wrapped by withStyles() from MaterialUI
    component = shallow(
      <QuestionManager
        activeQuestionIndex={0}
        allQuestions={questions}
        changeQuestionHandler={changeQuestionMock}
      />
    ).dive();

    jest.clearAllMocks();
  });

  it("extracts all the set names from the questions and sets the default active set as the first element", () => {
    expect(component.state("allSetNames")).toEqual([
      "Test set 1",
      "Test set 2"
    ]);

    expect(component.state("activeSet")).toEqual("Test set 1");
  });

  it("extract the currently active set questions and sets the default current active set to the first question", () => {
    expect(component.state("activeQuestionSet")).toEqual([
      questions[0],
      questions[3],
      questions[4]
    ]);
  });

  it("updates the active set questions when changing sets", () => {
    // Trigger a set change
    component.instance().handleSetChange({
      target: { value: "Test set 2" }
    });

    expect(component.state("activeQuestionSet")).toEqual([
      questions[1],
      questions[2]
    ]);

    // The change question prop updates the active question and passes it back.
    // Called in handleSetChange()
    expect(changeQuestionMock).toHaveBeenCalledTimes(1);
  });

  it("goes to the next question in the set", () => {
    component.instance().handleNext();

    // The next QUESTION INDEX in "Test Set 1" is index 3.
    expect(changeQuestionMock).toBeCalledWith(3);
  });

  it("goes to the previous question in the set (loops)", () => {
    component.instance().handlePrev();

    // The last QUESTION INDEX in "Test Set 1" is index 4.
    expect(changeQuestionMock).toBeCalledWith(4);
  });

  it("doesn't change sets if the set requested is not found", () => {
    const prevState = component.state("activeQuestionSet");

    // Trigger a set change
    component.instance().handleSetChange({
      target: { value: "Non-existant set" }
    });

    // Expect the state to not change
    expect(component.state("activeQuestionSet")).toEqual(prevState);
  });
});

it("shows the active question", () => {
  // Dive as the component is wrapped by withStyles() from MaterialUI
  const component = shallow(
    <QuestionManager
      activeQuestionIndex={0}
      allQuestions={questions}
      changeQuestionHandler={jest.fn()}
    />
  ).dive();

  expect(
    component
      .find(Typography)
      .render()
      .text()
      .trim()
  ).toEqual("Test question 1");
});

it("shows the error message label when a message failed to build", () => {
  // Dive as the component is wrapped by withStyles() from MaterialUI
  const component = shallow(
    <QuestionManager
      activeQuestionIndex={4}
      allQuestions={questions}
      changeQuestionHandler={jest.fn()}
    />
  ).dive();

  expect(component.find(StepLabel).find({ error: true }).length).toEqual(1);

  expect(component.find(Typography).prop("color")).toEqual("error");
});
