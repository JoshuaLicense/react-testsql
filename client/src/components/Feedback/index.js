import React from "react";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import Typography from "@material-ui/core/Typography";

class Feedback extends React.Component {
  handleClear = () => this.props.changeHandler(null);

  render() {
    const { message, error } = this.props;

    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={!!message}
        autoHideDuration={6000}
        onClose={this.handleClear}
        ContentProps={{
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
            onClick={this.handleClear}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    );
  }
}

export default Feedback;
