import React from "react";

import getDatabase, { saveDatabase } from "./helpers";

import DatabaseContext from "./Context";

export default class Provider extends React.Component {
  loadDatabase = database => {
    // Create a new object with a new lastModified date.
    // This ensures that when the database object is passed as props,
    // the old reference isn't updated and therefore the component is unable to detect change
    const newDatabase = Object.create(database.__proto__);

    Object.assign(newDatabase, database, { lastModified: Date.now() });

    saveDatabase(newDatabase);

    this.setState(state => ({ database: newDatabase }));

    return Promise.resolve();
  };

  updateDatabase = database => {
    // Create a new object with a new lastModified date.
    // This ensures that when the database object is passed as props,
    // the old reference isn't updated and therefore the component is unable to detect change
    const newDatabase = Object.create(database.__proto__);

    Object.assign(newDatabase, database, { lastModified: Date.now() });

    saveDatabase(newDatabase);

    this.setState(state => ({ database: newDatabase }));

    return Promise.resolve();
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
