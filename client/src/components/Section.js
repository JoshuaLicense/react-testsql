import React from "react";

import { withStyles } from "material-ui/styles";

import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";

const styles = theme => ({
  heading: {
    fontWeight: 500
  },
  seperator: {
    padding: theme.spacing.unit * 2
  },
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16
  })
});

const Section = props => {
  const { classes, title, children, ...other } = props;

  return (
    <div className={classes.seperator} {...other}>
      <Typography variant="title" color="textSecondary" component="h3">
        {title}
      </Typography>
      <Paper className={classes.paper} elevation={2}>
        {children}
      </Paper>
    </div>
  );
};

export default withStyles(styles)(Section);
