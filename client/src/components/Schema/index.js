import React from 'react';

import Drawer from 'material-ui/Drawer';

import Typography from 'material-ui/Typography';

import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';

import Hidden from 'material-ui/Hidden';

import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import DownloadIcon from 'material-ui-icons/FileDownload';
import UploadIcon from 'material-ui-icons/FileUpload';
import RestoreIcon from 'material-ui-icons/Restore';

import { withStyles } from 'material-ui/styles';

const drawerWidth = 240;

const styles = theme => ({
  schemaButton: {
    position: 'absolute',
    bottom: theme.spacing.unit,
    right: theme.spacing.unit,
    transition: theme.transitions.create('right', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  schemaButtonShift: {
    right: theme.spacing.unit + drawerWidth,
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard,
    }),
    transform: 'rotate(180deg)',
  },
  heading: {
    marginTop: theme.spacing.unit * 2,
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  toolbar: theme.mixins.toolbar,
  pinToBottom: {
    marginTop: 'auto',
  }
});

class Schema extends React.Component {
  state = {
    open: this.props.open,
  }

  handleUpload = (e) => {
    const files = e.target.files;

    // No file selected, return
    if (files.length === 0) return false;

    const [file] = files;

    const fileReader = new FileReader();

    fileReader.onload = () => {
      const typedArray = new Uint8Array(fileReader.result);

      // Run the submit handler from the parent component
      this.props.uploadHandler(typedArray);
    }

    // Tell the file reader to read the selected file as an array buffer
    fileReader.readAsArrayBuffer(file);

    // Reset the import back to blank so in theory could re-upload the same file
    e.target.value = '';
  }

  render() {
    const { 
      classes, 
      schema, 
      open, 
      sidebarHandler,
      clickHandler,
      restoreHandler,
      downloadHandler
    } = this.props;

    const tables = schema.map(({ name, count}, i) => 
      <ListItem key={i} onClick={() => clickHandler(name)} button>
        <ListItemText primary={name} />
        <ListItemSecondaryAction>
          <ListItemText secondary={count} />
        </ListItemSecondaryAction>
      </ListItem>
    );

    const actions = (
      <BottomNavigation
        value="1"
        className={classes.pinToBottom}
        showLabels
      >
        <BottomNavigationAction 
          label={
            <span>Upload
              <input type="file" 
                style={{display: 'none'}} 
                onChange={(e) => this.handleUpload(e)} 
              />
            </span>
          } 
          icon={<UploadIcon />} 
          component="label" 
          style={{boxSizing: 'border-box'}} 
        />
        <BottomNavigationAction label="Download" icon={<DownloadIcon />} onClick={() => downloadHandler()} />
        <BottomNavigationAction label="Restore" icon={<RestoreIcon />} onClick={() => restoreHandler()} />
      </BottomNavigation>
    );

    return (
      <div>
        <Hidden mdUp>
          <Drawer
            classes={{ paper: classes.drawerPaper}}
            anchor="left" 
            open={open} 
            onClose={() => sidebarHandler(false)}
          >
            <Typography variant="body2" color="textSecondary" component="h3" className={classes.heading} gutterBottom align="center">
              Database Schema
            </Typography>
            <List dense>{tables}</List>
            {actions}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
          variant="permanent" 
          classes={{ paper: classes.drawerPaper}}
          open>
            <div className={classes.toolbar} />
            <Typography variant="body2" color="textSecondary" component="h3" className={classes.heading} gutterBottom align="center">
              Database Schema
            </Typography>
            <List dense>{tables}</List>
            {actions}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

export default withStyles(styles)(Schema);
