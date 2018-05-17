import React from "react";

import Drawer from "material-ui/Drawer";

import Typography from "material-ui/Typography";

import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from "material-ui/List";

import Hidden from "material-ui/Hidden";

import BottomNavigation, {
  BottomNavigationAction
} from "material-ui/BottomNavigation";
import DownloadIcon from "material-ui-icons/FileDownload";
import UploadIcon from "material-ui-icons/FileUpload";
import RestoreIcon from "material-ui-icons/Restore";

import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";

import { withStyles } from "material-ui/styles";
import UserContext from "../Auth/Context";

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
  }
});

class Schema extends React.Component {
  state = {
    schema: []
  };

  handleUpload = e => {
    const files = e.target.files;

    // No file selected, return
    if (files.length === 0) return false;

    const [file] = files;

    const fileReader = new FileReader();

    fileReader.onload = () => {
      const typedArray = new Uint8Array(fileReader.result);

      // Run the submit handler from the parent component
      this.props.uploadHandler(typedArray);
    };

    // Tell the file reader to read the selected file as an array buffer
    fileReader.readAsArrayBuffer(file);

    // Reset the import back to blank so in theory could re-upload the same file
    e.target.value = "";
  };

  render() {
    const {
      classes,
      open,
      sidebarHandler,
      clickHandler,
      restoreHandler,
      downloadHandler
    } = this.props;

    const { schema } = this.state;

    const tables = schema.map(({ name, count }, i) => (
      <ListItem key={i} onClick={() => clickHandler(name)} button>
        <ListItemText primary={name} />
        <ListItemSecondaryAction>
          <ListItemText secondary={count} />
        </ListItemSecondaryAction>
      </ListItem>
    ));

    const bottomActions = (
      <div className={classes.drawerBottomActions}>
        <IconButton className={classes.button} aria-label="Upload Database">
          <UploadIcon />
        </IconButton>
        <IconButton className={classes.button} aria-label="Download Database">
          <DownloadIcon />
        </IconButton>
        <IconButton className={classes.button} aria-label="Restore Database">
          <RestoreIcon />
        </IconButton>
      </div>
    );

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
            onClose={() => sidebarHandler(false)}
          >
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
            <List dense>{tables}</List>
            {bottomActions}
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
            <List dense>{tables}</List>
            {bottomActions}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

export default withStyles(styles)(Schema);
