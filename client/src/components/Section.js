import React from "react";

import { withStyles } from "material-ui/styles";
import classNames from "classnames";

import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";

const styles = theme => ({
  heading: {
    fontWeight: 500
  },
  seperator: { 
    margin: theme.spacing.unit * 2
  },
  paper: {
    overflow: "auto",
  },
  gutters: {
    padding: theme.spacing.unit * 2,
  },
});

const Section = props => {
  const { classes, title, children, gutters, ...other } = props;

  return (
    <div className={classes.seperator} {...other}>
      <Typography variant="body2" color="textSecondary" component="h3" gutterBottom>
        {title}
      </Typography>
      <Paper className={classNames((gutters && classes.gutters), classes.paper)} elevation={2}>
        {children}
      </Paper>
    </div>
  );
};

export default withStyles(styles)(Section);
