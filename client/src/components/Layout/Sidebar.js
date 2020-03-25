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
    width: "16rem",
    [theme.breakpoints.up("md")]: {
      position: "relative"
    }
  },
  gutterTop: {
    marginTop: theme.spacing(2)
  },
  container: {
    display: "flex"
  },
  drawerBottomActions: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "auto",
    marginBottom: "8px"
  },
  // Necessary for content to be below app bar.
  toolbar: theme.mixins.toolbar
});

class Sidebar extends React.Component {
  handleToggleSidebar = () => this.props.toggleSidebarHandler(false);

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
            <div className={classes.gutterTop}>{schema}</div>
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
            <div className={classes.toolbar} />
            <div className={classes.gutterTop}>{schema}</div>
            {schemaActions}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

export default withStyles(styles)(Sidebar);
