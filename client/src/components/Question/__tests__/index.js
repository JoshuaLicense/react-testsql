import React from "react";
import { shallow } from "enzyme";
import QuestionManager from "../index";
import Typography from "@material-ui/core/Typography";

import Markdown from "markdown-to-jsx";
import { StepLabel } from "@material-ui/core";

const questions = [
  { set: "Test set 1", question: "Test question 1", completed: true },
  { set: "Test set 2", question: "Test question 2", completed: false },
  {
    set: "Test set 2",
    question: "Test question 3",
    error: "A problem occurred while building this question."
  },
  { set: "Test set 1", question: "Test question 4", completed: true },
  {
    set: "Test set 1",
    question: "Test question 5",
    completed: false,
    error: "A problem occurred while building this question."
  }
];

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

describe("Question component", () => {
  let component, changeQuestionMock;

  beforeEach(() => {
    jest.resetAllMocks();

    changeQuestionMock = jest.fn();

    // Dive as the component is wrapped by withStyles() from MaterialUI
    component = shallow(
      <QuestionManager
        allQuestions={questions}
        changeQuestionHandler={changeQuestionMock}
      />
    ).dive();
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

    // The change question prop updates the active question and passes it back.
    expect(changeQuestionMock).toHaveBeenCalledTimes(1);

    expect(component.state("activeQuestionIndex")).toEqual(0);
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
    // Called in ComponentDidMount() and in handleSetChange()
    expect(changeQuestionMock).toHaveBeenCalledTimes(2);

    expect(component.state("activeQuestionIndex")).toEqual(0);
  });

  it("goes to the previous question in the set (loops)", () => {
    component.instance().handlePrev();

    // The last set in "Test Set 1" is index 2.
    expect(component.state("activeQuestionIndex")).toEqual(2);

    component.instance().handlePrev();

    expect(component.state("activeQuestionIndex")).toEqual(1);
  });

  it("goes to the next question in the set (loops)", () => {
    component.instance().handleNext();

    // The last set in "Test Set 1" is index 2.
    expect(component.state("activeQuestionIndex")).toEqual(1);
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

  it("updates the questions when a new active question is detected", () => {
    const activeQuestion = { ...questions[4], completed: true };

    const allQuestions = [
      questions[0],
      questions[1],
      questions[2],
      questions[3],
      activeQuestion
    ];

    component.setProps({
      activeQuestion,
      allQuestions
    });

    expect(component.state("activeQuestionIndex")).toEqual(2);
  });
});

it("shows the active question", () => {
  // Dive as the component is wrapped by withStyles() from MaterialUI
  const component = shallow(
    <QuestionManager
      allQuestions={questions}
      activeQuestion={questions[0]}
      changeQuestionHandler={jest.fn()}
    />
  ).dive();

  expect(
    component
      .find(Typography)
      .find(Markdown)
      .dive()
      .text()
  ).toEqual("Test question 1");
});

it("shows the error message label when a message failed to build", () => {
  // Dive as the component is wrapped by withStyles() from MaterialUI
  const component = shallow(
    <QuestionManager
      allQuestions={questions}
      activeQuestion={questions[4]}
      changeQuestionHandler={jest.fn()}
    />
  ).dive();

  expect(component.find(StepLabel).find({ error: true }).length).toEqual(1);

  expect(component.find(Typography).prop("color")).toEqual("error");
});
