import React from "react";

import Drawer from "@material-ui/core/Drawer";

import Typography from "@material-ui/core/Typography";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

import Hidden from "@material-ui/core/Hidden";

import DownloadIcon from "@material-ui/icons/FileDownload";
import UploadIcon from "@material-ui/icons/FileUpload";

import IconButton from "@material-ui/core/IconButton";

import UserContext from "../Auth/Context";

import { withStyles } from "@material-ui/core/styles";

import SQL from "sql.js";

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
    marginTop: theme.spacing.unit * 2
  },
  drawerBottomActions: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "auto",
    marginBottom: theme.spacing.unit
  },
  uploadDatabaseFile: {
    display: "none"
  }
});

class Schema extends React.Component {
  state = {
    schema: []
  };

  componentDidMount = () => this.load();

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

    const sql =
      'SELECT `tbl_name` FROM `sqlite_master` WHERE `type` = "table" AND `tbl_name` NOT LIKE "__testSQL_Database_%"';

    // Destructure the response to get only the values (the real schema data)
    let [{ values: tableNames }] = currentDatabase.exec(sql);

    // tableNames are returned as [[0] => "Tbl_name", [1] => "Tbl_name"]]
    const schema = tableNames.map(([tableName]) => {
      const count = currentDatabase.exec(`SELECT COUNT(*) FROM ${tableName}`)[0]
        .values[0];

      return {
        name: tableName,
        count
      };
    });

    // Now they are in the format ["tbl_name", "tbl_name_2", ]
    this.setState({ schema });
  };

  downloadDatabase = () => {
    const { currentDatabase } = this.props;

    const blob = new Blob([currentDatabase.export()], {
      type: `application/x-sqlite-3`
    });

    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "testSQL.sqlite";
    a.onclick = () => {
      setTimeout(() => {
        window.URL.revokeObjectURL(a.href);
      }, 1500);
    };
    a.click();

    this.toggleSidebar();
  };

  handleUpload = e => {
    const files = e.target.files;

    // No file selected, return
    if (files.length === 0) return false;

    const [file] = files;

    const fileReader = new FileReader();

    fileReader.onload = () => {
      const typedArray = new Uint8Array(fileReader.result);

      const database = new SQL.Database(typedArray);

      // Run the submit handler from the parent component
      this.props.uploadDatabaseHandler(database);

      this.toggleSidebar();
    };

    // Tell the file reader to read the selected file as an array buffer
    fileReader.readAsArrayBuffer(file);

    // Reset the import back to blank so in theory could re-upload the same file
    e.target.value = "";
  };

  toggleSidebar = () => this.props.sidebarHandler();

  render() {
    const { classes, open, showSchemaHandler } = this.props;

    const { schema } = this.state;

    return (
      <div className={classes.container}>
        <Hidden mdUp>
          <Drawer
            classes={{
              docked: classes.drawerDocked,
              paper: classes.drawerPaper
            }}
            anchor="left"
            open={open}
            onClose={this.toggleSidebar}
          >
            {schema && (
              <SchemaList
                classes={classes}
                schema={schema}
                uploadDatabaseHandler={this.handleUpload}
                downloadDatabaseHandler={this.downloadDatabase}
                showSchemaHandler={showSchemaHandler}
              />
            )}
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
            {schema && (
              <SchemaList
                classes={classes}
                schema={schema}
                uploadDatabaseHandler={this.handleUpload}
                downloadDatabaseHandler={this.downloadDatabase}
                showSchemaHandler={showSchemaHandler}
              />
            )}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

class SchemaList extends React.Component {
  handleDownloadDatabase = () => this.props.downloadDatabaseHandler();

  render() {
    const {
      schema,
      classes,
      showSchemaHandler,
      uploadDatabaseHandler,
      downloadDatabaseHandler
    } = this.props;

    return (
      <React.Fragment>
        <Typography
          className={classes.heading}
          component="h3"
          variant="body2"
          color="textSecondary"
          align="center"
          gutterBottom
        >
          Database Schema
        </Typography>
        <List dense>
          {schema.map(({ name, count }) => (
            <SchemaItem
              key={name}
              name={name}
              count={count}
              showSchemaHandler={showSchemaHandler}
            />
          ))}
        </List>
        <div className={classes.drawerBottomActions}>
          <UserContext.Consumer>
            {({ user }) =>
              user && user.group ? (
                <IconButton
                  className={classes.button}
                  component="span"
                  aria-label="Upload Database"
                  disabled
                >
                  <UploadIcon />
                </IconButton>
              ) : (
                <React.Fragment>
                  <input
                    accept=".db,.sqlite"
                    onChange={uploadDatabaseHandler}
                    className={classes.uploadDatabaseFile}
                    id="uploadfile"
                    type="file"
                  />
                  <label htmlFor="uploadfile">
                    <IconButton
                      className={classes.button}
                      component="span"
                      aria-label="Upload Database"
                    >
                      <UploadIcon />
                    </IconButton>
                  </label>
                </React.Fragment>
              )
            }
          </UserContext.Consumer>
          <IconButton
            className={classes.button}
            onClick={downloadDatabaseHandler}
            aria-label="Download Database"
          >
            <DownloadIcon />
          </IconButton>
        </div>
      </React.Fragment>
    );
  }
}

class SchemaItem extends React.Component {
  handleClick = () => this.props.showSchemaHandler(this.props.name);

  render = () => (
    <ListItem onClick={this.handleClick} button>
      <ListItemText primary={this.props.name} />
      <ListItemSecondaryAction>
        <ListItemText secondary={this.props.count} />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default withStyles(styles)(Schema);
