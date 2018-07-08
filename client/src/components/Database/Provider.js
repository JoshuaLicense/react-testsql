import React from "react";

import SQL from "sql.js";

import getDatabase, { saveDatabase } from "./helpers";

import DatabaseContext from "./Context";

export default class Provider extends React.Component {
  loadDatabase = typedArray => {
    // Create a new SQL object
    const database = new SQL.Database(typedArray);

    // Create a new object with a new lastModified date.
    // This ensures that when the database object is passed as props,
    // the old reference isn't updated and therefore the component is unable to detect change
    const newDatabase = Object.create(database.__proto__);

    Object.assign(newDatabase, database, { lastModified: Date.now() });

    // Save the database in the cache, for persistence without reliance of the server.
    saveDatabase(newDatabase);

    this.setState({ database: newDatabase });

    // Allow promise chaining.
    return Promise.resolve();
  };

  state = {
    database: null,
    loadDatabase: this.loadDatabase
  };

  componentDidMount = () =>
    getDatabase().then(database => this.loadDatabase(database));

  render() {
    return (
      <DatabaseContext.Provider value={this.state}>
        {this.props.children}
      </DatabaseContext.Provider>
    );
  }
}
