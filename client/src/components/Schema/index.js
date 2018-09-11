import React from "react";

import Drawer from "@material-ui/core/Drawer";

import Hidden from "@material-ui/core/Hidden";

import { withStyles } from "@material-ui/core/styles";

import SchemaList from "../Schema/SchemaList";
import UploadDatabase from "./UploadDatabase";
import DownloadDatabase from "./DownloadDatabase";

const styles = theme => ({
  drawerDocked: {
    height: "100%"
  },
  drawerPaper: {
    height: "100%", // Overwrite the 100vh default!
    width: "16rem",
    [theme.breakpoints.up("md")]: {
      position: "relative"
    }
  },
  container: {
    display: "flex"
  },
  heading: {
    marginTop: "16px"
  },
  drawerBottomActions: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "auto",
    marginBottom: "8px"
  }
});

class Schema extends React.Component {
  state = {
    schema: []
  };

  componentDidMount() {
    this.load();
  }

  componentDidUpdate(prevProps) {
    const { currentDatabase } = this.props;

    // Don't check if the database hasn't been passed yet.
    if (!currentDatabase) return;

    // If the database has changed, reconstruct the questions
    if (
      prevProps.currentDatabase &&
      prevProps.currentDatabase.lastModified !== currentDatabase.lastModified
    ) {
      this.load();
    }
  }

  load = () => {
    const { currentDatabase } = this.props;

    const sql = 'SELECT `tbl_name` FROM `sqlite_master` WHERE `type` = "table"';

    // Destructure the response to get only the values (the real schema data)
    let [{ values: tableNames }] = currentDatabase.exec(sql);

    this.setState({ schema: [] });

    // tableNames are returned as [[0] => "Tbl_name", [1] => "Tbl_name"]]
    // Promisify it in an attempt to make this faster.
    tableNames.map(([tableName]) =>
      new Promise(resolve => {
        const [
          {
            values: [[count]]
          }
        ] = currentDatabase.exec(`SELECT COUNT(*) FROM ${tableName}`);

        return resolve({
          name: tableName,
          count
        });
      }).then(schemaObj =>
        this.setState(prevState => ({
          schema: [schemaObj, ...prevState.schema]
        }))
      )
    );
  };

  handleToggleSidebar = () => this.props.toggleSidebarHandler(false);

  render() {
    const { schema } = this.state;

    if (!schema) {
      return <div>Loading...</div>;
    }

    const {
      classes,
      open,
      showSchemaHandler,
      uploadDatabaseHandler,
      currentDatabase
    } = this.props;

    const schemaList = (
      <SchemaList
        classes={classes}
        schema={schema}
        showSchemaHandler={showSchemaHandler}
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
            {schemaList}
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
            {schemaList}
            {schemaActions}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

export default withStyles(styles)(Schema);
