import React from "react";

import PropTypes from "prop-types"; // eslint-disable-line no-unused-vars
import { withStyles } from "@material-ui/core/styles";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import StepLabel from "@material-ui/core/StepLabel";

import Typography from "@material-ui/core/Typography";

import PreviousIcon from "@material-ui/icons/KeyboardArrowLeft";
import NextIcon from "@material-ui/icons/KeyboardArrowRight";

import Divider from "@material-ui/core/Divider";

import Button from "@material-ui/core/Button";

import MenuItem from "@material-ui/core/MenuItem";

import Select from "@material-ui/core/Select";

const styles = theme => ({
  innerPadding: {
    padding: theme.spacing.unit * 2,
    overflow: "auto"
  },
  stepperButton: {
    padding: theme.spacing.unit,
    margin: -theme.spacing.unit
  },
  stepperLabel: {
    padding: 0
  },
  divider: {
    marginBottom: `${theme.spacing.unit * 2}px`
  },
  previousButton: {
    marginRight: theme.spacing.unit
  }
});

class Question extends React.Component {
  handleNext = () => {
    const total = this.props.activeQuestionSet.length;

    // Allows the looping of questions
    const next = (this.props.activeQuestion + 1) % total;

    this.handleQuestionChange(next);
  };

  handlePrev = () => {
    const total = this.props.activeQuestionSet.length;

    // Allows the looping of questions (if it was allowed)
    const prev =
      this.props.activeQuestion - 1 >= 0
        ? this.props.activeQuestion - 1
        : total - 1;

    this.handleQuestionChange(prev);
  };

  handleQuestionChange = number => {
    this.props.changeQuestionHandler(number);
  };

  handleSetChange = event => {
    const set = event.target.value;

    this.props.changeQuestionSetHandler(set);
  };

  render() {
    const {
      classes,
      questionSetNames,
      activeSet,
      activeQuestionSet,
      activeQuestion
    } = this.props;

    return (
      <div>
        <Stepper
          nonLinear
          activeStep={activeQuestion}
          className={classes.innerPadding}
        >
          {activeQuestionSet.map((question, index) => {
            return (
              <Step key={index}>
                <StepButton
                  className={classes.stepperButton}
                  onClick={() => this.handleQuestionChange(index)}
                  completed={!!question.completed}
                >
                  <StepLabel
                    classes={{ iconContainer: classes.stepperLabel }}
                    error={!!question.error}
                  />
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
        <Divider />
        <div className={classes.innerPadding}>
          <Typography
            variant="subheading"
            component="span"
            color={
              activeQuestionSet[activeQuestion].error ? "error" : "inherit"
            }
            gutterBottom
          >
            {activeQuestionSet[activeQuestion].question}
          </Typography>
          <div style={{ display: "flex", marginTop: "16px" }}>
            <div style={{ marginRight: "auto" }}>
              <Select value={activeSet} onChange={this.handleSetChange}>
                {questionSetNames.map(name => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div>
              <Button
                style={{ marginRight: "8px" }}
                variant="raised"
                size="small"
                onClick={this.handlePrev}
              >
                <PreviousIcon /> Previous
              </Button>
              <Button
                variant="raised"
                size="small"
                color="primary"
                onClick={this.handleNext}
              >
                Next <NextIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Question);
