import React from "react";

import { shallow } from "enzyme";

import Main from "../Main";

import { saveProgress } from "../../Group/API";
import buildQuestions from "../../../questions/utils/buildQuestions";

jest.mock("../../Group/API");
jest.mock("../../../questions/utils/buildQuestions");

buildQuestions.mockResolvedValue([{}]);
saveProgress.mockResolvedValue(true);

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

describe("the Main component", () => {
  let component,
    handleToggleSidebarMock,
    loadDatabaseMock,
    currentDatabaseMock,
    userMock;

  beforeEach(() => {
    userMock = {};

    currentDatabaseMock = {
      filename: "Current database mock filename",
      export: jest.fn(() => {})
    };

    loadDatabaseMock = jest.fn();
    handleToggleSidebarMock = jest.fn();

    component = shallow(
      <Main
        user={userMock}
        currentDatabase={currentDatabaseMock}
        loadDatabase={loadDatabaseMock}
        sidebarToggleHandler={handleToggleSidebarMock}
        openSidebar={false}
      />
    );
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

    buildQuestions.mockResolvedValueOnce(questions);

    const currentDatabaseMock2 = {
      filename: "Current database 2 mock filename",
      export: jest.fn(() => {})
    };

    component = component.setProps({ currentDatabase: currentDatabaseMock2 });

    await flushPromises();

    expect(component.state("allQuestions")).toEqual(questions);
    expect(component.state("activeQuestion")).toEqual(questions[0]);
  });

  it("changes question when a new active question is supplied", () => {
    // Supply a new active question to the changeQuestion() function.
    const mockActiveQuestion = { mockQuestion: "Mock Question" };

    component.instance().changeQuestion(mockActiveQuestion);

    expect(component.state("activeQuestion")).toEqual(mockActiveQuestion);
  });
});

it("loads the an existing set of user questions for the group they are in", () => {
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

  const component = shallow(<Main user={user} />);

  expect(component.state("allQuestions")).toEqual(questions);
  expect(component.state("activeQuestion")).toEqual(questions[0]);
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

  // Reset the mock implementations just incase...
  buildQuestions.mockReset();

  buildQuestions.mockResolvedValue(questions);

  const component = shallow(<Main user={user} />);

  await flushPromises();

  expect(component.state("allQuestions")).toEqual(questions);
  expect(component.state("activeQuestion")).toEqual(questions[0]);
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

  buildQuestions.mockResolvedValueOnce(questions);

  const component = shallow(<Main user={{}} />);

  await flushPromises();

  expect(component.state("allQuestions")).toEqual(questions);
  expect(component.state("activeQuestion")).toEqual(questions[0]);
});
