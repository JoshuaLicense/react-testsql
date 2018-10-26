import React from "react";

import Main from "./Main";
import Sidebar from "./Sidebar";

import UserContext from "../Auth/Context";

const containerStyle = {
  display: "flex",
  flexDirection: "row",
  zIndex: 0, // The header shadow will overlap.
  height: "100%"
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

    this.handleUpdateResults(results);

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
        <UserContext.Consumer>
          {({ isLoaded, user }) =>
            isLoaded && (
              <Main
                user={user}
                results={results}
                updateResultsHandler={this.handleUpdateResults}
                currentDatabase={currentDatabase}
                loadDatabase={loadDatabase}
              />
            )
          }
        </UserContext.Consumer>
      </div>
    );
  }
}
