import React from "react";

import { shallow } from "enzyme";

import Main from "../Main";

import { saveProgress } from "../../Group/API";
import checkAnswer from "../../Question/answer";
import OutputTable from "../../Database/Output";
import Question from "../../Question";

import saveQuestions from "../../../questions/utils/saveQuestions";
import buildQuestions from "../../../questions/utils/buildQuestions";

jest.mock("../../Group/API");
jest.mock("../../Question/answer");
jest.mock("../../../questions/utils/saveQuestions");
jest.mock("../../../questions/utils/buildQuestions");

buildQuestions.mockImplementation(() =>
  Promise.resolve([{ q1: true }, { q2: true }])
);

saveProgress.mockImplementation(() => Promise.resolve(true));

const currentDatabaseMock = {
  filename: "Current database mock filename",
  exec: jest.fn(() => {}),
  getRowsModified: jest.fn(),
  export: jest.fn(() => {})
};

const loadDatabaseMock = jest.fn();
const updateResultsMock = jest.fn();
const userMock = {};

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

describe("the Main component", () => {
  let component;

  beforeEach(async () => {
    component = shallow(
      <Main
        user={userMock}
        results={[]}
        updateResultsHandler={updateResultsMock}
        currentDatabase={currentDatabaseMock}
        loadDatabase={loadDatabaseMock}
      />
    );

    await flushPromises();

    jest.clearAllMocks();
  });

  it("alters the state to add a feedback item", () => {
    const feedback = { message: "Test Feedback", variant: "error" };

    component.instance().changeFeedback(feedback);

    component.update();

    expect(component.state("feedback")).toHaveProperty(
      "message",
      "Test Feedback"
    );

    expect(component.state("feedback")).toHaveProperty("variant", "error");

    expect(component.state("feedback")).toHaveProperty("timestamp");
  });

  describe("runQuery()", () => {
    it("saves the database when rows are modified", () => {
      // Call the run query but route so new results are used.
      currentDatabaseMock.getRowsModified.mockReturnValueOnce(1);

      component.instance().runQuery('SELECT "Example Query";');

      expect(loadDatabaseMock).toHaveBeenCalledTimes(1);
    });

    it("saves progress (to server) on a correct answer", async () => {
      checkAnswer.mockReturnValueOnce(true);

      // Mock the changeFeedback method.
      component.instance().completeCurrentQuestion = jest
        .fn()
        .mockImplementation(() => Promise.resolve(true));

      component = component.setProps({ user: { group: {} } });

      component.instance().runQuery('SELECT "Example Query";');

      await flushPromises();

      expect(
        component.instance().completeCurrentQuestion
      ).toHaveBeenCalledTimes(1);

      expect(saveProgress).toHaveBeenCalledTimes(1);
    });

    it("saves progress (to client) on a correct answer", async () => {
      checkAnswer.mockReturnValueOnce(true);

      // Mock the changeFeedback method.
      component.instance().completeCurrentQuestion = jest
        .fn()
        .mockImplementation(() => Promise.resolve(true));

      component.instance().runQuery('SELECT "Example Query";');

      await flushPromises();

      expect(
        component.instance().completeCurrentQuestion
      ).toHaveBeenCalledTimes(1);

      expect(saveQuestions).toHaveBeenCalledTimes(1);
    });

    it("throws an Error exception when an incorrect answer", () => {
      const errorMessage = "Incorrect Answer";
      checkAnswer.mockImplementationOnce(() => {
        throw new Error(errorMessage);
      });

      // Mock the changeFeedback method.
      component.instance().changeFeedback = jest.fn();

      component.instance().runQuery('SELECT "Example Query";');

      expect(
        component.instance().changeFeedback.mock.calls[0][0].message
      ).toEqual(errorMessage);
    });
  });

  it("marks the current question as completed", () => {
    // Update the state to make sure we guarantee it is what is expected.
    let allQuestionsMock = [
      {
        testProperty1: "testValue1"
      },
      {
        testProperty2: "testValue2"
      }
    ];

    component = component.setState({
      allQuestions: allQuestionsMock,
      activeQuestionIndex: 1
    });

    // Mock the methods that are called inside completeCurrentQuestion(), to isolate it.
    component.instance().changeFeedback = jest.fn();

    // Call the actual method.
    component.instance().completeCurrentQuestion('Select "Example SQL";');

    const completedQuestionMock = {
      testProperty2: "testValue2",
      completed: true
    };

    allQuestionsMock[1] = completedQuestionMock;

    component.update();

    expect(component.state("allQuestions")).toEqual(allQuestionsMock);
  });

  it("renders the results when the props recieves them", () => {
    expect(component.find(OutputTable).length).toBeFalsy();

    // Once some results are injected the database output should be shown.
    const results = [
      {
        columns: [],
        values: []
      }
    ];

    component = component.setProps({ results });

    expect(component.find(OutputTable).length).toBe(1);
  });

  it("renders the Question component once all the questions are loaded", () => {
    // The Questions component shouldn't be rendered until all the questions are loaded.
    // Set the allQuestion state property back to null, as they'd get loaded in the componentDidMount() on shallow()
    component = component.setState({ allQuestions: null });

    // and expect it to be false/hidden
    expect(component.find(Question).length).toBeFalsy();

    // Then mock some allQuestions state
    const allQuestions = [{}];

    component = component.setState({ allQuestions });

    expect(component.state("allQuestions")).toEqual(allQuestions);

    expect(component.find(Question).length).toBe(1);
  });

  it("builds a new question set when the database changes", async () => {
    // Trigger the componentDidMount().
    const questions = [
      {
        mockObjectThree: "Mock question 3"
      },
      {
        mockObjectFour: "Mock question 4"
      }
    ];

    buildQuestions.mockImplementationOnce(() => Promise.resolve(questions));

    const currentDatabaseMock2 = {
      filename: "Current database 2 mock filename",
      export: jest.fn(() => {})
    };

    component = component.setProps({ currentDatabase: currentDatabaseMock2 });

    await flushPromises();

    expect(component.state("allQuestions")).toEqual(questions);
  });

  it("changes question when a new active question is supplied", () => {
    // Supply a new active question to the changeQuestion() function.
    const mockActiveQuestion = { index: 5, mockQuestion: "Mock Question" };

    component.instance().changeQuestion(mockActiveQuestion.index);

    expect(component.state("activeQuestionIndex")).toEqual(5);
  });
});

it("loads the user's progress when in a group", () => {
  // Firstly update the user prop to mimic a user that is currently part of a group
  const questions = [
    {
      mockObjectOne: "Mock question 1"
    },
    {
      mockObjectTwo: "Mock question 2"
    }
  ];

  const user = {
    group: {
      questions
    }
  };

  const component = shallow(<Main user={user} results={[]} />);

  expect(component.state("allQuestions")).toEqual(questions);
});

it("loads the a new set of user questions for the group they are in and saves them to the server", async () => {
  // Firstly update the user prop to mimic a user that is currently part of a group
  const questions = [
    {
      mockObjectOne: "Mock question 1"
    },
    {
      mockObjectTwo: "Mock question 2"
    }
  ];

  const user = {
    group: null
  };

  buildQuestions.mockImplementationOnce(() => Promise.resolve(questions));

  const component = shallow(<Main user={user} results={[]} />);

  await flushPromises();

  expect(component.state("allQuestions")).toEqual(questions);
});

it("builds a set of questions for a user not part of a group", async () => {
  const questions = [
    {
      mockObjectOne: "Mock question 1"
    },
    {
      mockObjectTwo: "Mock question 2"
    }
  ];

  // Reset the mock implementations just incase...
  buildQuestions.mockReset();

  buildQuestions.mockImplementationOnce(() => Promise.resolve(questions));

  const component = shallow(<Main user={{}} results={[]} />);

  await flushPromises();

  expect(component.state("allQuestions")).toEqual(questions);
});
