import React from "react";

import SnackBar from "@material-ui/core/Snackbar";
import SnackBarContent from "@material-ui/core/SnackbarContent";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";

import WarningIcon from "@material-ui/icons/Warning";
import { withStyles } from "@material-ui/core/styles";

import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";

import classNames from "classnames";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const style = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});

class Feedback extends React.Component {
  queue = [];

  state = {
    message: null,
    variant: null,
    timestamp: null,
    open: false
  };

  componentDidUpdate(prevProps) {
    // If the message has changed, open the feedback!
    // If a new message is recieved.
    if (prevProps.timestamp || this.props.timestamp !== prevProps.timestamp) {
      this.queue.push({
        message: this.props.message,
        variant: this.props.variant,
        timestamp: this.props.timestamp
      });

      if (this.state.open) {
        // immediately begin dismissing current message
        // to start showing new one
        this.setState({ open: false });
      } else {
        this.processQueue();
      }
    }
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  processQueue = () => {
    if (this.queue.length > 0) {
      const { message, variant, timestamp } = this.queue.shift();

      this.setState({
        message,
        variant,
        timestamp,
        open: true
      });
    }
  };

  handleExited = () => this.processQueue();

  render() {
    const { classes } = this.props;

    const { message, variant, timestamp, open } = this.state;

    // Return nothing if no message is set yet.
    if (!message) return null;

    const Icon = variantIcon[variant];

    return (
      <SnackBar
        key={timestamp}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={open}
        autoHideDuration={5000}
        onClose={this.handleClose}
        onExited={this.handleExited}
      >
        <SnackBarContent
          className={classes[variant]}
          aria-describedby="feedback-message"
          message={
            <span id="feedback-message" className={classes.message}>
              <Icon className={classNames(classes.icon, classes.iconVariant)} />
              {message}
            </span>
          }
          action={
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>
          }
        />
      </SnackBar>
    );
  }
}

export default withStyles(style)(Feedback);
