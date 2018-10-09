import React from "react";

import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";

import Schema from "../Schema";
import UploadDatabase from "../Database/Upload";
import DownloadDatabase from "../Database/Download";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  drawerDocked: {
    height: "100%"
  },
  drawerPaper: {
    height: "100%", // Overwrite the 100vh default!
    width: "16rem",
    paddingTop: "16px",
    [theme.breakpoints.up("md")]: {
      position: "relative"
    }
  },
  container: {
    display: "flex"
  },
  drawerBottomActions: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "auto",
    marginBottom: "8px"
  }
});

class Sidebar extends React.Component {
  render() {
    const {
      classes,
      open,
      showSchemaHandler,
      uploadDatabaseHandler,
      currentDatabase,
      toggleSidebarHandler
    } = this.props;

    const schema = (
      <Schema
        currentDatabase={currentDatabase}
        showSchemaHandler={showSchemaHandler}
        toggleSidebarHandler={toggleSidebarHandler}
      />
    );

    const schemaActions = (
      <div className={classes.drawerBottomActions}>
        <UploadDatabase uploadDatabaseHandler={uploadDatabaseHandler} />
        <DownloadDatabase currentDatabase={currentDatabase} />
      </div>
    );

    return (
      <div className={classes.container}>
        <Hidden mdUp>
          <Drawer
            anchor="left"
            open={open}
            onClose={this.handleToggleSidebar}
            classes={{
              docked: classes.drawerDocked,
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {schema}
            {schemaActions}
          </Drawer>
        </Hidden>
        <Hidden implementation="css" smDown>
          <Drawer
            classes={{
              docked: classes.drawerDocked,
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {schema}
            {schemaActions}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

export default withStyles(styles)(Sidebar);
