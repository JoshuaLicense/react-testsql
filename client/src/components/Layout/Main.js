import React from "react";

import Section from "./Section";
import Question from "../Question";

import OutputTable from "../Database/Output";

import Feedback from "../Feedback";

import checkAnswer, { IncorrectAnswer } from "../Question/answer"; // eslint-disable-line no-unused-vars

import { saveProgress } from "../Group/API";

import Schema from "../Schema";

import Loadable from "react-loadable";
import buildQuestions from "../../questions/utils/buildQuestions";

const LoadableInputForm = Loadable({
  loader: () => import("../Database/Input" /* webpackChunkName: "inputForm" */),
  loading() {
    return <div>Loading...</div>;
  }
});

const containerStyle = {
  display: "flex",
  flexDirection: "row",
  zIndex: 0, // The header shadow will overlap.
  height: "100%"
};

const innerContainerStyle = {
  overflow: "auto",
  flexGrow: 1
};

export default class Main extends React.Component {
  state = {
    feedback: null,

    allQuestions: null,
    activeQuestion: null,

    results: null
  };

  changeFeedback = feedback =>
    this.setState({
      feedback: { ...feedback, timestamp: new Date().getTime() }
    });

  componentDidMount = async () => {
    let allQuestions;
    // Load the group questions that have come from the server,
    //if the user is in a group and has saved question progress.

    const { user } = this.props;

    const userGroup = user && user.group;

    if (userGroup && userGroup.questions && userGroup.questions.length > 0) {
      allQuestions = this.props.user.group.questions;
    } else {
      allQuestions = await buildQuestions(this.props.currentDatabase);

      // If the user has no saved questions, then send all the generated questions up to the server.
      // If the user is in a group. Save the progress.
      if (userGroup) {
        saveProgress(allQuestions);
      }
    }

    this.setState({ allQuestions, activeQuestion: allQuestions[0] });
  };

  componentDidUpdate(prevProps, prevState) {
    // If the database has changed, reconstruct the questions
    if (
      prevProps.currentDatabase.filename !== this.props.currentDatabase.filename
    ) {
      buildQuestions(this.props.currentDatabase, true).then(allQuestions => {
        this.setState({ allQuestions, activeQuestion: allQuestions[0] });
      });
    }
  }

  changeQuestion = question => this.setState({ activeQuestion: question });

  runQuery = async sql => {
    const { currentDatabase, loadDatabase } = this.props;

    const { activeQuestion, allQuestions } = this.state;

    // Defaultly set the results to blank.
    // setState() are grouped so calling this shouldn't update,
    // the actual state if called further in the function.
    this.setState({ results: [] });

    try {
      const results = currentDatabase.exec(sql);

      // Check if any database actions were ran, if so only update the database.
      if (currentDatabase.getRowsModified()) {
        loadDatabase(currentDatabase);
      } else {
        this.setState({
          results
        });
      }
    } catch (Error) {
      return this.changeFeedback({ message: Error.message, variant: "error" });
    }

    try {
      if (checkAnswer(currentDatabase, sql, activeQuestion)) {
        await this.completeCurrentQuestion(sql);

        return saveProgress(sql, allQuestions);
      }
    } catch (Error) {
      return this.changeFeedback({ message: Error.message, variant: "error" });
    }
  };

  completeCurrentQuestion = sql => {
    const { activeQuestion, allQuestions } = this.state;

    this.changeFeedback({ message: "Correct Answer", variant: "success" });

    // Create a new question object with completed=true
    const completedActiveQuestion = { ...activeQuestion, completed: true };

    // Find the active question index in allQuestions to allow
    // to alter the main array with a new completed status.
    const index = allQuestions.indexOf(activeQuestion);

    // Create a copy of the original question set.
    const updatedAllQuestions = allQuestions;

    // Directly update the active question element.
    updatedAllQuestions[index] = completedActiveQuestion;

    // Save the updated set to the client localStorage.
    localStorage.setItem(
      "__testSQL_Questions__",
      JSON.stringify(updatedAllQuestions)
    );

    this.setState({
      allQuestions: updatedAllQuestions,
      activeQuestion: completedActiveQuestion
    });
  };

  displaySchema = name => {
    const { currentDatabase } = this.props;

    const results = currentDatabase.exec(`SELECT * FROM ${name} LIMIT 10`);

    this.setState(state => ({
      results
    }));

    this.props.sidebarToggleHandler();
  };

  render() {
    const {
      allQuestions,
      activeQuestion,

      feedback,
      results
    } = this.state;

    const {
      currentDatabase,
      loadDatabase,
      openSidebar,
      sidebarToggleHandler
    } = this.props;

    return (
      <div style={containerStyle}>
        <Schema
          open={openSidebar}
          currentDatabase={currentDatabase}
          uploadDatabaseHandler={loadDatabase}
          showSchemaHandler={this.displaySchema}
          toggleSidebarHandler={sidebarToggleHandler}
        />
        <main style={innerContainerStyle}>
          <Section title="Questions">
            {allQuestions && (
              <Question
                activeQuestion={activeQuestion}
                allQuestions={allQuestions}
                changeQuestionHandler={this.changeQuestion}
              />
            )}
          </Section>

          <Section title="Statement" padding="16px">
            <LoadableInputForm submitHandler={this.runQuery} />
          </Section>

          {results &&
            results.map((result, i) => (
              <Section title="Results" key={i} padding="16px">
                <OutputTable columns={result.columns} values={result.values} />
              </Section>
            ))}
          <Feedback {...feedback} changeHandler={this.changeFeedback} />
        </main>
      </div>
    );
  }
}
