import React from "react";

import Section from "../Section";
import Question from "../Question";

import InputForm from "../Database/Input";
import OutputTable from "../Database/Output";

import Feedback from "../Feedback";

const containerStyle = {
  overflow: "auto",
  flexGrow: 1
};

export default class Main extends React.Component {
  state = {
    feedback: null,

    activeQuestion: 0,
    activeSet: 0,
    setNames: null,
    questions: null,
    activeQuestionSet: null,

    results: null
  };

  render() {
    const {
      allSets,
      allQuestons,
      activeQuestion,
      activeSet,
      activeQuestionSet,

      feedback,
      results
    } = this.state;

    return (
      <main style={containerStyle}>
        {activeQuestionSet && (
          <Section title="Questions">
            <Question
              activeSet={activeSet}
              questionSetNames={allSets}
              activeQuestion={activeQuestion}
              activeQuestionSet={activeQuestionSet}
              changeQuestionHandler={this.changeQuestion}
              changeQuestionSetHandler={this.changeQuestionSet}
            />
          </Section>
        )}

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
    );
  }
}
