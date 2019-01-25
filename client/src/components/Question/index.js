import React from "react";

import marked from "marked";

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
import Hidden from "@material-ui/core/Hidden";

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
    alignItems: "center",
    marginTop: theme.spacing.unit * 2
  }
});

class QuestionManager extends React.Component {
  state = {
    allSetNames: [],
    activeSet: null,
    activeQuestionSet: null
  };

  componentDidMount() {
    const { allQuestions } = this.props;

    const allSetNames = [
      ...new Set(allQuestions.map(question => question.set))
    ];

    const activeSet = allSetNames[0];

    // Only get the questions in this set.
    const activeQuestionSet = [
      ...allQuestions.filter(question => question.set === activeSet)
    ];

    this.setState({
      allSetNames,
      activeSet,
      activeQuestionSet
    });
  }

  /**
   * Required to update the "active question set".
   * The props passed is the full question set.
   */
  componentDidUpdate = prevProps => {
    const { allQuestions, activeQuestionIndex } = this.props;

    const activeQuestion = allQuestions[activeQuestionIndex];

    if (
      activeQuestionIndex === prevProps.activeQuestionIndex &&
      activeQuestion.completed !==
        prevProps.allQuestions[activeQuestionIndex].completed
    ) {
      // Means that the component has to rebuild the active set, as we created a brand new completed question object.
      const activeQuestionSet = [
        ...allQuestions.filter(
          question => question.set === this.state.activeSet
        )
      ];

      // Yes, setState is called twice; it's batched.
      this.setState({
        activeQuestionSet
      });
    }

    if (
      this.props.allQuestions &&
      this.state.activeSet !== activeQuestion.set
    ) {
      // Or, if the set has changed, rebuild the available sets.
      // If this set doesn't exist, rebuilt the sets from the questions.
      // This signifies a new question set.
      if (this.state.allSetNames.includes(activeQuestion.set) === false) {
        const allSetNames = [
          ...new Set(allQuestions.map(question => question.set))
        ];

        this.setState({ allSetNames });
      }

      const activeSet = activeQuestion.set;

      // Means that the component has to rebuild the active set, as we created a brand new completed question object.
      const activeQuestionSet = [
        ...allQuestions.filter(
          question => question.set === this.state.activeSet
        )
      ];

      // Yes, setState is called twice; it's batched.
      this.setState({
        activeSet,
        activeQuestionSet
      });
    }
  };

  handleNext = () => {
    const activeQuestionIndex = this.props.allQuestions[
      this.props.activeQuestionIndex
    ].index;

    const next =
      (activeQuestionIndex + 1) % this.state.activeQuestionSet.length;

    // Translate the prev index of the active set to allQuestions.
    const allQuestionsIndex = this.state.activeQuestionSet[next].index;

    this.props.changeQuestionHandler(allQuestionsIndex);
  };

  handlePrev = () => {
    const activeQuestionIndex = this.props.allQuestions[
      this.props.activeQuestionIndex
    ].index;

    const prevIndex = activeQuestionIndex - 1;

    // Check for underflow.
    const prev =
      prevIndex < 0 ? this.state.activeQuestionSet.length - 1 : prevIndex;

    // Translate the prev index of the active set to allQuestions.
    const allQuestionsIndex = this.state.activeQuestionSet[prev].index;

    this.props.changeQuestionHandler(allQuestionsIndex);
  };

  handleQuestionChange = index => () => {
    this.props.changeQuestionHandler(index);
  };

  handleSetChange = event => {
    const set = event.target.value;

    // Don't do anything if nothing has changed.
    if (set === this.state.activeSet) return;

    const { allQuestions } = this.props;

    // Extract only the questions in this set.
    const activeQuestionSet = [
      ...allQuestions.filter(question => question.set === set)
    ];

    // Set doesn't exist...
    if (activeQuestionSet.length === 0) return;

    // Set the active question to the first in the set.
    this.props.changeQuestionHandler(activeQuestionSet[0].index);

    const activeSet = set;

    this.setState({
      activeSet,
      activeQuestionSet
    });
  };

  render() {
    const { activeQuestionSet, allSetNames, activeSet } = this.state;

    // Wait until we have the sets divided.
    if (!activeSet) {
      return <div>Dividing the questions by their sets.</div>;
    }

    const { classes, allQuestions, activeQuestionIndex } = this.props;

    const activeQuestion = allQuestions[activeQuestionIndex];

    const activeStep = activeQuestionSet.indexOf(activeQuestion);

    return (
      <React.Fragment>
        {activeQuestionSet && (
          <Stepper
            activeStep={activeStep}
            className={classes.innerPadding}
            nonLinear
          >
            {activeQuestionSet.map(question => (
              <Step key={question.index}>
                <StepButton
                  className={classes.stepperButton}
                  aria-label={`Question #${question.index}`}
                  onClick={this.handleQuestionChange(question.index)}
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
              component="div"
              color={activeQuestion.error ? "error" : "inherit"}
              dangerouslySetInnerHTML={{
                __html: marked(activeQuestion.question)
              }}
              gutterBottom
            />
          )}
          <div className={classes.bottomActions}>
            {activeSet && (
              <div>
                <Select value={activeSet} onChange={this.handleSetChange}>
                  {allSetNames.map(name => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            )}
            <div>
              <Button
                className={classes.previousButton}
                variant="contained"
                size="small"
                aria-label="Previous question"
                onClick={this.handlePrev}
              >
                <PreviousIcon />
                <Hidden xsDown implementation="css">
                  Previous
                </Hidden>
              </Button>
              <Button
                className={classes.nextButton}
                variant="contained"
                size="small"
                color="primary"
                aria-label="Next question"
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
