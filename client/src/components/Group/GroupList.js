/**
 * TODO: Send isCurrentGroup with group API call.
 */

import React from "react";

import Button from "@material-ui/core/Button";

import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import { Link } from "react-router-dom";

import UserContext from "../Auth/Context";
import DatabaseContext from "../Database/Context";

import ActiveGroupList from "./ActiveGroupList";
import AllGroupList from "./AllGroupList";

const flexSpaceBetween = { display: "flex", justifyContent: "space-between" };

const GroupList = props => {
  return (
    <React.Fragment>
      <DialogTitle id="dialog-title">
        <div style={flexSpaceBetween}>
          Groups
          <Button
            component={Link}
            to="/group/create"
            color="primary"
            variant="raised"
            size="small"
          >
            Create &raquo;
          </Button>
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Groups allow you to customize the experience and track the progress of
          every user that joins your group.
        </DialogContentText>
      </DialogContent>
      <UserContext.Consumer>
        {({ refresh }) => (
          <DatabaseContext.Consumer>
            {({ loadDatabase }) => (
              <React.Fragment>
                <ActiveGroupList
                  refreshUserContext={refresh}
                  loadDatabaseHandler={loadDatabase}
                />
                <AllGroupList
                  refreshUserContext={refresh}
                  loadDatabaseHandler={loadDatabase}
                />
              </React.Fragment>
            )}
          </DatabaseContext.Consumer>
        )}
      </UserContext.Consumer>
      <DialogActions>
        <Button onClick={props.closeHandler} color="primary">
          Close
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};

export default GroupList;
