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
    fontSize: 20,
    opacity: 0.9,
    marginRight: "8px"
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});

class Feedback extends React.Component {
  state = {
    open: false
  };

  componentDidUpdate(prevProps) {
    // If the message has changed, open the feedback!
    if (this.props.message !== prevProps.message) {
      this.setState({ open: true });
    }
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { message, variant, classes } = this.props;

    if (!this.state.open) {
      return null;
    }

    const Icon = variantIcon[variant];

    console.log(Icon, variant, variantIcon);

    return (
      <SnackBar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={this.state.open}
        autoHideDuration={6000}
        onClose={this.handleClear}
      >
        <SnackBarContent
          className={classes[variant]}
          aria-describedby="feedback-message"
          message={
            <span id="feedback-message" className={classes.message}>
              <Icon className={classes.icon} />
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
