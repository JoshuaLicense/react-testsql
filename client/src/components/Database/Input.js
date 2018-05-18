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
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  codemirror: {
    border: `1px solid ${theme.palette.grey[100]}`
  }
});

class Form extends React.Component {
  state = {
    statement: null
  };

  handleSubmit = e => {
    // Don't submit the form
    e.preventDefault();

    // Run the submit handler from the parent component
    this.props.submitHandler(this.state.statement);
  };

  render() {
    const { classes } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <CodeMirror
          value={this.state.statement}
          options={{
            mode: "text/x-sql",
            theme: "mdn-like",
            lineNumbers: true
          }}
          onBeforeChange={(editor, data, statement) =>
            this.setState({ statement })
          }
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
          onClick={() => this.setState({ statement: null })}
        >
          Clear
          <ClearIcon className={classes.rightIcon} />
        </Button>
      </form>
    );
  }
}

Form.propTypes = {
  submitHandler: PropTypes.func
};

export default withStyles(styles)(Form);
