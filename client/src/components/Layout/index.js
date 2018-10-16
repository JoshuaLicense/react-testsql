import React from "react";

import Header from "../Auth";
import DatabaseContext from "../Database/Context";

import Container from "./Container";

const containerStyle = {
  height: "100vh",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column"
};

export default class Layout extends React.Component {
  state = {
    openSidebar: false
  };

  handleToggleSidebar = open =>
    // If the open parameter is not passed it will toggle the previous state.
    this.setState(prevState => ({
      openSidebar:
        typeof open === "undefined" ? !prevState.openSidebar : Boolean(open)
    }));

  render() {
    const { openSidebar } = this.state;

    return (
      <div style={containerStyle}>
        <Header sidebarToggleHandler={this.handleToggleSidebar} />

        <DatabaseContext.Consumer>
          {({ database, loadDatabase }) =>
            database ? (
              <Container
                currentDatabase={database}
                loadDatabase={loadDatabase}
                sidebarToggleHandler={this.handleToggleSidebar}
                openSidebar={openSidebar}
              />
            ) : (
              <div>Loading...</div>
            )
          }
        </DatabaseContext.Consumer>
      </div>
    );
  }
}
