import React from "react";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import RunIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";

import brace from "brace";
import AceEditor from "react-ace";

import "brace/mode/sql";
import "brace/theme/tomorrow";

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

class DatabaseInput extends React.Component {
  state = {
    statement: ""
  };

  handleChange = statement => this.setState({ statement });

  handleClear = () => this.setState({ statement: "" });

  handleSubmit = () => this.props.submitHandler(this.state.statement);

  render() {
    const { classes } = this.props;

    const { statement } = this.state;

    return (
      <React.Fragment>
        <AceEditor
          mode="sql"
          theme="tomorrow"
          showPrintMargin={false}
          focus
          height="9rem"
          width="100%"
          onChange={this.handleChange}
          value={statement}
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
