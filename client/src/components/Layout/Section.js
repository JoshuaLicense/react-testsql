import React from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  seperator: {
    margin: theme.spacing(2)
  }
});

const Section = props => {
  const { classes, title, children, padding = 0, ...other } = props;

  const paperStyle = { padding };

  return (
    <div className={classes.seperator} {...other}>
      <Typography
        variant="body1"
        color="textSecondary"
        component="h3"
        gutterBottom
      >
        {title}
      </Typography>
      <Paper style={paperStyle} elevation={2} square>
        {children}
      </Paper>
    </div>
  );
};

export default withStyles(styles)(Section);
