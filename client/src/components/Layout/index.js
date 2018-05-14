import React from "react";

import Header from "../Header";
import Main from "./Main";
import DatabaseContext from "../Database/Context";

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

  toggleSidebar = () => {
    this.setState(state => ({ openSidebar: !state.openSidebar }));
  };

  render() {
    const { openSidebar } = this.state;

    return (
      <div style={containerStyle}>
        <Header sidebarToggleHandler={this.toggleSidebar} />

        <DatabaseContext.Consumer>
          {({ database, loadDatabase, updateDatabase }) =>
            database ? (
              <Main
                currentDatabase={database}
                loadDatabase={loadDatabase}
                updateDatabase={updateDatabase}
                sidebarToggleHandler={this.toggleSidebar}
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