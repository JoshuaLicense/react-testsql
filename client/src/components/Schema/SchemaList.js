import React from "react";

import Typography from "@material-ui/core/Typography";

import List from "@material-ui/core/List";

import SchemaItem from "./SchemaItem";

class SchemaList extends React.Component {
  render() {
    const { schema, classes, showSchemaHandler } = this.props;

    return (
      <React.Fragment>
        <Typography
          className={classes.heading}
          component="h3"
          variant="body2"
          color="textSecondary"
          align="center"
          gutterBottom
        >
          Database Schema
        </Typography>
        <List dense>
          {schema.map(({ name, count }) => (
            <SchemaItem
              key={name}
              name={name}
              count={count}
              showSchemaHandler={showSchemaHandler}
            />
          ))}
        </List>
      </React.Fragment>
    );
  }
}

export default SchemaList;
