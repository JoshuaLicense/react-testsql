import React from "react";

import "./input.css";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/mdn-like.css";

import "codemirror/mode/sql/sql.js";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import RunIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";

import { Controlled as CodeMirror } from "react-codemirror2";

const styles = theme => ({
  button: {
    marginRight: 8,
    marginTop: 8
  },
  leftIcon: {
    marginRight: 8
  },
  rightIcon: {
    marginLeft: 8
  },
  iconSmall: {
    fontSize: 20
  },
  codemirror: {
    border: `1px solid ${theme.palette.grey[100]}`
  }
});

const codeMirrorOptions = {
  mode: "text/x-sql",
  theme: "mdn-like",
  lineNumbers: true
};

class DatabaseInput extends React.Component {
  state = {
    statement: null
  };

  handleChange = (editor, data, statement) => this.setState({ statement });

  handleClear = () => this.setState({ statement: null });

  handleSubmit = () => this.props.submitHandler(this.state.statement);

  render() {
    const { classes } = this.props;

    const { statement } = this.state;

    return (
      <React.Fragment>
        <CodeMirror
          value={statement}
          options={codeMirrorOptions}
          onBeforeChange={this.handleChange}
          className={classes.codemirror}
        />

        <Button
          className={classes.button}
          size="small"
          variant="raised"
          color="primary"
          onClick={this.handleSubmit}
        >
          Run
          <RunIcon className={classes.rightIcon} />
        </Button>
        <Button
          className={classes.button}
          size="small"
          variant="raised"
          color="secondary"
          onClick={this.handleClear}
        >
          Clear
          <ClearIcon className={classes.rightIcon} />
        </Button>
      </React.Fragment>
    );
  }
}

DatabaseInput.propTypes = {
  submitHandler: PropTypes.func
};

export default withStyles(styles)(DatabaseInput);
