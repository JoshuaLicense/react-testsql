import React from "react";

import Section from "./Section";
import Question from "../Question";

import OutputTable from "../Database/Output";

import Feedback from "../Feedback";

import checkAnswer from "../Question/answer";

import { saveProgress } from "../Group/API";

import Main from "./Main";
import Schema from "../Schema";
import Sidebar from "./Sidebar";

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

export default class Container extends React.Component {
  state = {
    results: []
  };

  handleUpdateResults = results => {
    this.setState({ results });
  };

  displaySchema = name => {
    const { currentDatabase } = this.props;

    const results = currentDatabase.exec(`SELECT * FROM ${name} LIMIT 10`);

    this.setState({ results });

    return this.props.sidebarToggleHandler();
  };

  render() {
    const {
      currentDatabase,
      loadDatabase,
      openSidebar,
      sidebarToggleHandler
    } = this.props;

    const { results } = this.state;

    return (
      <div style={containerStyle}>
        <Sidebar
          open={openSidebar}
          currentDatabase={currentDatabase}
          uploadDatabaseHandler={loadDatabase}
          showSchemaHandler={this.displaySchema}
          toggleSidebarHandler={sidebarToggleHandler}
        />
        <Main
          results={results}
          updateResultsHandler={this.handleUpdateResults}
          currentDatabase={currentDatabase}
          uploadDatabaseHandler={loadDatabase}
        />
      </div>
    );
  }
}
