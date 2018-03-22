import React, { Component } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from './components/Nav';
import Schema from './components/Schema';

import { 
  DatabaseInput, 
  DatabaseOutput, 
  DatabaseImport, 
  DatabaseExport 
} from './components/Database';

import Alert from './components/Alert';

import SQL from 'sql.js';

import defaultDatabase from './default.sqlite';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      database: null,
      statement: null,
      results: null,
      alert: null,
      history: [],
      schema: []
    };
  }

  componentDidMount = () => {
    this.getDatabase();
  }

  loadDatabase = (typedArray) => {
    // Provide a confirmation dialog to warn the user of potential dataloss  
    if(this.state.database !== null && !window.confirm('Are you sure you want to import a new database? This will overwrite your existing one.')) {
      return;
    }

    const database = new SQL.Database(typedArray);

    this.setState({ database }, () => this.getAllTableNames());
  }

  getDatabase = () => {
    const savedDatabase = localStorage.getItem('__testSQL_Database__');

    if (savedDatabase) {
      const typedArray = toBinArray(savedDatabase);

      this.loadDatabase(typedArray);

      return Promise.resolve();
    } else {
      return fetch(defaultDatabase)
        .then(response => response.arrayBuffer())
        .then((fileBuffer) => {
          const typedArray = new Uint8Array(fileBuffer);

          this.loadDatabase(typedArray);
        },
        (error) => {
          this.setState({
            alert: {
              type: `danger`,
              message: error.message,
            },
          });
        });
    }
  }

  downloadDatabase = () => {
    const blob = new Blob(
      [
        this.state.database.export()
      ], 
      {
        type: `application/x-sqlite-3`
      }
    );

    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'testSQL.sqlite';
    a.onclick = () => {
      setTimeout(() => {
        window.URL.revokeObjectURL(a.href);
      }, 1500);
    }
    a.click();
  }

  saveDatabase() {
    // Convert the current database (ArrayBuffer) to a binary string
    //const string = new Uint8Array().reduce((data, byte) => data + String.fromCharCode(byte), '');

    localStorage.setItem('__testSQL_Database__', toBinString(this.state.database.export()));
  }

  getAllTableNames = () => {
    const sql = 'SELECT `tbl_name` FROM `sqlite_master` WHERE `type` = "table" AND `tbl_name` NOT LIKE "__testSQL_Database_%"';

    // Destructure the response to get only the values (the real schema data)
    let [{ values: tableNames, }] = this.state.database.exec(sql);

    // tableNames are returned as [[0] => "Tbl_name", [1] => "Tbl_name"]]
    tableNames = tableNames.map(([tableName]) => tableName);

    // Now they are in the format ["tbl_name", "tbl_name_2", ]
    this.setState({ schema: tableNames, });
  }

  runStatement = () => {
    // Run the current statement that is saved in the state
    this.runQuery(this.state.statement);
  }

  changeStatement = (statement) => {
    this.setState({ statement });
  }

  runQuery = (sql) => {
    try {  
      const results = this.state.database.exec(sql);

      this.setState(
        {
          results,
          history: [...this.state.history, sql],
        }
      );

      // Only save the database if a query has altered the dataset
      if (this.state.database.getRowsModified(sql)) {
        this.getAllTableNames();

        this.saveDatabase();
      }

      // Remove the alert(s) if any
      this.setState({ alert: null, });
    } catch (error) {
      this.setState({
        alert: {
          type: `danger`,
          message: error.message,
        },
      });
    }
  }

  runTableQuery = (tableName) => {
    const sql = `SELECT * FROM ${tableName}`;

    return this.runQuery(sql);
  }

  render() {
      return (
        <div className="d-flex flex-row text-dark">
          <nav className="ts-nav d-flex flex-column bg-light border-right">
            <DatabaseImport changeHandler={this.loadDatabase} />
            <DatabaseExport clickHandler={this.downloadDatabase} />
          </nav>
          <main className="ts-main d-flex flex-column p-4 pr-5">
            <Alert data={this.state.alert} />
            <h5>SQL Statement</h5>
            <section className="mb-3">
              <DatabaseInput statement={this.state.statement} submitHandler={this.runStatement} changeHandler={this.changeStatement} clearHandler={() => this.setState({ statement: null })} />
            </section>
            <h5>Result</h5>
            <section className="mb-3" style={{ overflow: 'auto' }}>
              <DatabaseOutput data={this.state.results} />
            </section>
          </main>
          <aside className="ts-schema-container">
            <Schema data={this.state.schema} clickHandler={this.runTableQuery} />
          </aside>
        </div>
      );
  }
}

function toBinArray(str) {
  var l = str.length,
    arr = new Uint8Array(l);
  for (var i = 0; i < l; i++) arr[i] = str.charCodeAt(i);
  return arr;
}

function toBinString(arr) {
  return arr.reduce((data, byte) => data + String.fromCharCode(byte), '');
}

export default App;
