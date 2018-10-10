import React from "react";

import IconButton from "@material-ui/core/IconButton";
import GroupIcon from "@material-ui/icons/GroupWorkTwoTone";

import Tooltip from "@material-ui/core/Tooltip";

import Loadable from "react-loadable";

const LoadableGroupManager = Loadable({
  loader: () => import("./GroupManager" /* webpackChunkName: "groups" */),
  loading: () => <div>Loading...</div>
});

export default class Group extends React.Component {
  state = {
    open: false
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  handleMouseOver = () => LoadableGroupManager.preload();

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
          <LoadableGroupManager
            closeHandler={this.handleClose}
            currentGroup={currentGroup}
            loadDatabaseHandler={loadDatabaseHandler}
            joinGroupHandler={joinGroupHandler}
            leaveGroupHandler={leaveGroupHandler}
          />
        )}
      </React.Fragment>
    );
  }
}
