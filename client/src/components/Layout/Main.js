import React from "react";

import Section from "../Section";
import Question from "../Question";

import InputForm from "../Database/Input";
import OutputTable from "../Database/Output";

import Feedback from "../Feedback";

import Schema from "../Schema";

import checkAnswer, { IncorrectAnswer } from "../Question/answer"; // eslint-disable-line no-unused-vars

import getQuestions from "../Question/helpers";

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

  componentDidMount = async () => {
    const allQuestions = await getQuestions(this.props.currentDatabase);

    this.setState({ allQuestions, activeQuestion: allQuestions[0] });
  };

  componentDidUpdate(prevProps, prevState) {
    // If the database has changed, reconstruct the questions
    if (
      prevProps.currentDatabase.filename !== this.props.currentDatabase.filename
    ) {
      getQuestions(this.props.currentDatabase).then(allQuestions => {
        this.setState({ allQuestions, activeQuestion: allQuestions[0] });
      });
    }
  }

  changeQuestion = question => this.setState({ activeQuestion: question });

  runQuery = sql => {
    const { currentDatabase, updateDatabase } = this.props;

    const { activeQuestion, allQuestions } = this.state;

    // Defaultly set the results to blank.
    // setState() are grouped so calling this shouldn't update,
    // the actual state if called further in the function.
    this.setState({ results: [] });

    try {
      const results = currentDatabase.exec(sql);

      // Check if any database actions were ran, if so only update the database.
      if (currentDatabase.getRowsModified()) {
        updateDatabase(currentDatabase);
      } else {
        this.setState({
          results
        });
      }
    } catch (Error) {
      this.changeFeedback({ message: Error.message, error: true });
    }

    try {
      if (checkAnswer(currentDatabase, sql, activeQuestion)) {
        this.changeFeedback({ message: "Correct Answer" });

        // Create a new question object with completed=true
        const completedActiveQuestion = { ...activeQuestion, completed: true };

        // Find the active question index in allQuestions to allow
        // to alter the main array with a new completed status.
        const index = allQuestions.indexOf(activeQuestion);

        // Create a copy of the original question set.
        const updatedAllQuestions = allQuestions;

        // Directly update the active question element.
        updatedAllQuestions[index] = completedActiveQuestion;

        this.setState({
          allQuestions: updatedAllQuestions,
          activeQuestion: completedActiveQuestion
        });
      }
    } catch (Error) {
      return this.changeFeedback({ message: Error.message, error: true });
    }
  };

  displaySchema = name => {
    const { currentDatabase } = this.props;

    const results = currentDatabase.exec(`SELECT * FROM ${name} LIMIT 10`);

    this.setState(state => ({
      results
    }));

    this.props.sidebarToggleHandler();
  };

  changeFeedback = object => {
    this.setState({ feedback: object });
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
          sidebarHandler={sidebarToggleHandler}
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

          <Section title="Statement" gutters>
            <InputForm submitHandler={this.runQuery} />
          </Section>

          {results &&
            results.map((result, i) => (
              <Section title="Results" key={i} gutters>
                <OutputTable columns={result.columns} values={result.values} />
              </Section>
            ))}
          <Feedback {...feedback} changeHandler={this.changeFeedback} />
        </main>
      </div>
    );
  }
}