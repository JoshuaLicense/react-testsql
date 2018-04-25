import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import Snackbar from "material-ui/Snackbar";
import IconButton from "material-ui/IconButton";
import CloseIcon from "material-ui-icons/Close";

import Typography from "material-ui/Typography";

class Feedback extends React.Component {
  render() {
    const { message, error, changeHandler } = this.props;

    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={!!message}
        autoHideDuration={6000}
        onClose={() => changeHandler(null)}
        SnackbarContentProps={{
          "aria-describedby": "message-id"
        }}
        message={
          <Typography color={error ? "error" : "inherit"} id="message-id">
            {message}
          </Typography>
        }
        action={
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => changeHandler(null)}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    );
  }
}

export default Feedback;
