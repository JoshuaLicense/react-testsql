import React from "react";

import { shallow } from "enzyme";

import Container from "../Container";

import { saveProgress } from "../../Group/API";
import checkAnswer from "../../Question/answer";
import DatabaseOutput from "../../Database/Output";
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
const handleToggleSidebarMock = jest.fn();

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

describe("the Main component", () => {
  let component;

  beforeEach(async () => {
    component = shallow(
      <Container
        currentDatabase={currentDatabaseMock}
        loadDatabase={loadDatabaseMock}
        sidebarToggleHandler={handleToggleSidebarMock}
        openSidebar={false}
      />
    );

    await flushPromises();

    jest.clearAllMocks();
  });

  it("updates the results when called upon", () => {
    component.instance().handleUpdateResults(["Example"]);

    expect(component.state("results")).toEqual(["Example"]);
  });

  it("queries the database to fetch the schema", () => {
    const schemaMock = [{ columns: [], values: [] }];

    // Mock the database call to return the schema mock.
    currentDatabaseMock.exec.mockImplementation(() => schemaMock);

    // Call the function.
    component.instance().displaySchema("Test table");

    // Update the component so the state can update inside the displaySchema call.
    component.update();

    // Expect the database to execute a query to fetch the schema.
    expect(currentDatabaseMock.exec).toHaveBeenCalledTimes(1);

    // Expect the state results property to be what was returned from the currentDatabase mock.
    expect(component.state("results")).toEqual(schemaMock);
  });
});
