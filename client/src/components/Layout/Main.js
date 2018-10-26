import React from "react";

import Section from "./Section";
import Question from "../Question";

import OutputTable from "../Database/Output";

import Feedback from "../Feedback";

import checkAnswer from "../Question/answer";

import { saveProgress } from "../Group/API";

import Loadable from "react-loadable";
import buildQuestions from "../../questions/utils/buildQuestions";
import saveQuestions from "../../questions/utils/saveQuestions";

const LoadableInputForm = Loadable({
  loader: () => import("../Database/Input" /* webpackChunkName: "inputForm" */),
  loading: () => <div>Loading...</div>
});

const innerContainerStyle = {
  overflow: "auto",
  flexGrow: 1
};

export default class Main extends React.Component {
  state = {
    feedback: null,

    allQuestions: null,
    activeQuestion: null
  };

  changeFeedback = feedback =>
    this.setState({
      feedback: { ...feedback, timestamp: new Date().getTime() }
    });

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = async () => {
    let allQuestions;

    const { user } = this.props;

    const group = (user && user.group) || null;

    // Has the group already have generated questions.
    // Joining a group SHOULD remove all questions so they are rebuilt with the new group database.
    if (group && group.questions && group.questions.length > 0) {
      console.log("Used group questions");
      allQuestions = group.questions;
    } else {
      // Check the localStorage for any cached question sets
      const cachedQuestions = localStorage.getItem("__testSQL_Questions__");

      if (cachedQuestions && !group) {
        console.log("Used cached questions");
        // Cached questions, and the user is not in a group.
        allQuestions = JSON.parse(cachedQuestions);
      } else {
        console.log("Built new questions");
        // Cached questions, but the user is in a group that doesn't have questions.
        // Rebuild the questions for this group.
        allQuestions = await buildQuestions(this.props.currentDatabase);

        // No group, no cache, so the questions got built, now save them locally.
        saveQuestions(allQuestions);
      }

      // If the user has no saved questions, then send all the generated questions up to the server.
      // If the user is in a group. Save the progress.
      if (group) {
        saveProgress(allQuestions);
      }
    }

    return this.setState({ allQuestions, activeQuestion: allQuestions[0] });
  };

  componentDidUpdate(prevProps) {
    // Update the questions if:
    // - The user is logged in, and they left a group;
    // - The database has changed.
    const hasLeftGroup =
      this.props.user &&
      prevProps.user &&
      Boolean(!this.props.user.group) &&
      prevProps.user.group;

    const hasDatabaseChanged =
      prevProps.currentDatabase &&
      prevProps.currentDatabase.filename !==
        this.props.currentDatabase.filename;

    if (hasLeftGroup || hasDatabaseChanged) {
      this.getQuestions();
    }
  }

  changeQuestion = question => this.setState({ activeQuestion: question });

  runQuery = async sql => {
    const { currentDatabase, loadDatabase } = this.props;

    const { activeQuestion, allQuestions } = this.state;

    let results = [];

    try {
      const output = currentDatabase.exec(sql);

      // Check if any database actions were ran, if so only update the database.
      if (currentDatabase.getRowsModified()) {
        // TODO: Make this function name a saveDatabase()...
        loadDatabase(currentDatabase);
      } else {
        results = output;
      }

      if (checkAnswer(currentDatabase, sql, activeQuestion)) {
        await this.completeCurrentQuestion(sql);

        // Only save progress if in a group.
        if (this.props.user && this.props.user.group) {
          saveProgress(allQuestions);
        } else {
          saveQuestions(allQuestions, this.props.user);
        }
      }
    } catch (Error) {
      this.changeFeedback({ message: Error.message, variant: "error" });
    }

    // Update the results array in the Container component.
    this.props.updateResultsHandler(results);
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

  render() {
    const {
      allQuestions,
      activeQuestion,

      feedback
    } = this.state;

    const { results } = this.props;

    return (
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

        {results.map((result, i) => (
          <Section title="Results" key={i} padding="16px">
            <OutputTable columns={result.columns} values={result.values} />
          </Section>
        ))}
        <Feedback {...feedback} changeHandler={this.changeFeedback} />
      </main>
    );
  }
}
