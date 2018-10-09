import React from "react";

import SQL from "sql.js";

import getDatabase from "./utils/getDatabase";
import saveDatabase from "./utils/saveDatabase";

import DatabaseContext from "./Context";

export default class Provider extends React.Component {
  loadDatabase = typedArray => {
    // Create a new SQL object
    const database = new SQL.Database(typedArray);

    database.lastModified = Date.now();

    // Save the database in the cache, for persistence without reliance of the server.
    saveDatabase(database);

    return this.setState({ database });
  };

  state = {
    database: null,
    loadDatabase: this.loadDatabase
  };

  async componentDidMount() {
    // Get a database from "somewhere"; localStorage or the default server-side.
    const database = await getDatabase();

    this.loadDatabase(database);
  }

  render() {
    return (
      <DatabaseContext.Provider value={this.state}>
        {this.props.children}
      </DatabaseContext.Provider>
    );
  }
}
