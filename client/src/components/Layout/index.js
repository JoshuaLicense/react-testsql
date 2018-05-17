import React from "react";

import Header from "../Header";
import Schema from "../Schema";
import Main from "./Main";

const containerStyle = {
  height: "100vh",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column"
};

const innerContainerStyle = {
  display: "flex",
  flexDirection: "row",
  zIndex: 0, // The header shadow will overlap.
  height: "100%"
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
        <div style={innerContainerStyle}>
          <Schema open={openSidebar} sidebarHandler={this.toggleSidebar} />
          <Main />
        </div>
      </div>
    );
  }
}
