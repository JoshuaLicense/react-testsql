import React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

class SchemaItem extends React.Component {
  handleClick = () => this.props.showSchemaHandler(this.props.name);

  render = () => (
    <ListItem onClick={this.handleClick} button>
      <ListItemText primary={this.props.name} />
      <ListItemSecondaryAction>
        <ListItemText secondary={this.props.count} />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default SchemaItem;
