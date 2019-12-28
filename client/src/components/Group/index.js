import React, { Suspense } from "react";

import IconButton from "@material-ui/core/IconButton";
import GroupIcon from "@material-ui/icons/GroupWorkTwoTone";

import Tooltip from "@material-ui/core/Tooltip";

const LoadableGroupManager = React.lazy(() =>
  import("./GroupManager" /* webpackChunkName: "groups" */)
);

export default class Group extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  render() {
    const { open } = this.state;

    const {
      currentGroup,
      joinGroupHandler,
      leaveGroupHandler,
      loadDatabaseHandler
    } = this.props;

    return (
      <React.Fragment>
        <Tooltip title="Groups">
          <IconButton
            color={currentGroup ? "secondary" : "inherit"}
            aria-label="Group List"
            onClick={this.handleOpen}
            onMouseOver={this.handleMouseOver}
          >
            <GroupIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        {open && (
          <Suspense fallback={<div>Loading...</div>}>
            <LoadableGroupManager
              closeHandler={this.handleClose}
              currentGroup={currentGroup}
              loadDatabaseHandler={loadDatabaseHandler}
              joinGroupHandler={joinGroupHandler}
              leaveGroupHandler={leaveGroupHandler}
            />
          </Suspense>
        )}
      </React.Fragment>
    );
  }
}
