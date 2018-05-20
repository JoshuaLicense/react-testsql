import React from "react";

import getDatabase, { saveDatabase } from "./helpers";

import DatabaseContext from "./Context";

export default class Provider extends React.Component {
  loadDatabase = database => {
    const newDatabase = Object.create(database.__proto__);

    Object.assign(newDatabase, database, { lastModified: Date.now() });

    saveDatabase(newDatabase);

    this.setState(state => ({ database: newDatabase }));
  };

  updateDatabase = database => {
    const newDatabase = Object.create(database.__proto__);

    Object.assign(newDatabase, database, { lastModified: Date.now() });

    saveDatabase(newDatabase);

    this.setState(state => ({ database: newDatabase }));
  };

  state = {
    database: null,
    loadDatabase: this.loadDatabase,
    updateDatabase: this.updateDatabase
  };

  componentDidMount() {
    return getDatabase().then(database => {
      this.updateDatabase(database);
    });
  }

  render() {
    return (
      <DatabaseContext.Provider value={this.state}>
        {this.props.children}
      </DatabaseContext.Provider>
    );
  }
}
