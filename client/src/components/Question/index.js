import React from "react";

import Markdown from "markdown-to-jsx";

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
import { Hidden } from "@material-ui/core";

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
  completedStep: {
    color: "green !important"
  },
  divider: {
    marginBottom: `${theme.spacing.unit * 2}px`
  },
  previousButton: {
    marginRight: theme.spacing.unit
  },
  bottomActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing.unit * 2
  }
});

class QuestionManager extends React.Component {
  state = {
    allSetNames: [],
    activeSet: null,
    activeQuestionSet: null,
    activeQuestionIndex: null
  };

  componentDidMount = () => {
    const { allQuestions } = this.props;

    const allSetNames = [
      ...new Set(allQuestions.map(question => question.set))
    ];

    const activeSet = allSetNames[0];

    // Only get the questions in this set.
    const activeQuestionSet = [
      ...allQuestions.filter(question => question.set === activeSet)
    ];

    this.handleQuestionChange(0, activeQuestionSet[0])();

    this.setState({
      allSetNames,
      activeSet,
      activeQuestionSet
    });
  };

  /**
   * Required to update the "active question set".
   * The props passed is the full question set.
   */
  componentDidUpdate = prevProps => {
    // Only update if the current active queston isn't identical (meaning the question is now completed).
    if (!Object.is(prevProps.activeQuestion, this.props.activeQuestion)) {
      const { allQuestions, activeQuestion } = this.props;

      // Means that the component has to rebuild the active set, as we created a brand new completed question object.
      const activeQuestionSet = [
        ...allQuestions.filter(
          question => question.set === this.state.activeSet
        )
      ];

      this.setState({
        activeQuestionSet,
        activeQuestionIndex: activeQuestionSet.indexOf(activeQuestion)
      });
    }
  };

  handleNext = () => {
    // Allows the looping of questions so get a remainder of the total.
    const next =
      (this.state.activeQuestionIndex + 1) %
      this.state.activeQuestionSet.length;

    // Get the question from the active set.
    const question = this.state.activeQuestionSet[next];

    // Run the change question function, the function returns a callable, so immediately invoke.
    this.handleQuestionChange(next, question)();
  };

  handlePrev = () => {
    const prevIndex = this.state.activeQuestionIndex - 1;

    // Check for underflow
    const prev =
      prevIndex < 0 ? this.state.activeQuestionSet.length - 1 : prevIndex;

    // Get the question from the active set.
    const question = this.state.activeQuestionSet[prev];

    // Run the change question function, the function returns a callable, so immediately invoke.
    this.handleQuestionChange(prev, question)();
  };

  handleQuestionChange = (index, question) => () => {
    this.props.changeQuestionHandler(question);

    this.setState({ activeQuestionIndex: index });
  };

  handleSetChange = event => {
    const set = event.target.value;

    const { allQuestions } = this.props;

    // Extract only the questions in this set.
    const activeQuestionSet = [
      ...allQuestions.filter(question => question.set === set)
    ];

    // Set doesn't exist...
    if (activeQuestionSet.length === 0) return;

    // Set the active question to the first in the set.
    this.handleQuestionChange(0, activeQuestionSet[0])();

    const activeQuestionIndex = 0;
    const activeSet = set;

    this.setState({
      activeSet,
      activeQuestionSet,
      activeQuestionIndex
    });
  };

  render() {
    const { classes, activeQuestion } = this.props;

    const {
      activeQuestionSet,
      allSetNames,
      activeSet,
      activeQuestionIndex
    } = this.state;

    return (
      <React.Fragment>
        {activeQuestionSet && (
          <Stepper
            activeStep={activeQuestionIndex}
            className={classes.innerPadding}
            nonLinear
          >
            {activeQuestionSet.map((question, index) => (
              <Step key={index}>
                <StepButton
                  className={classes.stepperButton}
                  onClick={this.handleQuestionChange(index, question)}
                  completed={Boolean(question.completed)}
                >
                  <StepLabel
                    classes={{
                      iconContainer: classes.stepperLabel
                    }}
                    StepIconProps={{
                      classes: {
                        active: classes.activeStep,
                        completed: classes.completedStep
                      }
                    }}
                    error={Boolean(question.error)}
                  />
                </StepButton>
              </Step>
            ))}
          </Stepper>
        )}
        <Divider />
        <div className={classes.innerPadding}>
          {activeQuestion && (
            <Typography
              variant="subheading"
              component="span"
              color={activeQuestion.error ? "error" : "inherit"}
              gutterBottom
            >
              <Markdown>{activeQuestion.question}</Markdown>
            </Typography>
          )}
          <div className={classes.bottomActions}>
            {activeSet && (
              <Select value={activeSet} onChange={this.handleSetChange}>
                {allSetNames.map(name => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            )}
            <div>
              <Button
                className={classes.previousButton}
                variant="raised"
                size="small"
                onClick={this.handlePrev}
              >
                <PreviousIcon />
                <Hidden xsDown implementation="css">
                  Previous
                </Hidden>
              </Button>
              <Button
                className={classes.nextButton}
                variant="raised"
                size="small"
                color="primary"
                onClick={this.handleNext}
              >
                <Hidden xsDown implementation="css">
                  Next
                </Hidden>
                <NextIcon />
              </Button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(QuestionManager);
