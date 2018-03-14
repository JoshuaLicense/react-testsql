import React, { Component } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from './components/Nav';
import Schema from './components/Schema';

import { DatabaseInput, DatabaseOutput, DatabaseImport, } from './components/Database';

import Alert from './components/Alert';

import SQL from 'sql.js';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            database: null,
            results: null,
            alert: null,
            history: [],
        };
    }

    componentDidMount() {
        this.getDatabase();
    }

    getDatabase() {
        fetch('default.sqlite')
            .then(response => response.arrayBuffer())
            .then(fileBuffer => {
                const typedArray = new Uint8Array(fileBuffer);
                const database = new SQL.Database(typedArray);

                this.setState({ database, });
            })
            .catch(e => console.log(e));
    }

    getAllTableNames() {
        const sql = 'SELECT `tbl_name` FROM `sqlite_master` WHERE `type` = "table" AND `tbl_name` NOT LIKE "__testSQL_Database_%"';

        // Destructure the response to get only the values (the real schema data)
        let [ { values : tableNames, } ] = this.state.database.exec(sql);

        // tableNames are returned as [[0] => "Tbl_name", [1] => "Tbl_name"]]
        tableNames = tableNames.map(([tableName]) => tableName);

        // Now they are in the format ["tbl_name", "tbl_name_2", ]
        return tableNames;
    }

    runStatement = (statement) => {
        // Run the current statement that is saved in the state
        this.runQuery(statement);
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

            // Remove the alert(s) if any
            this.setState({ alert: null, })
        } catch(error) {
            this.setState({
                alert: {
                    type: `danger`,
                    message: error.message,
                },
            });
        }
    }

    runTableQuery = (tableName) => {
        return this.runQuery(`SELECT * FROM ${tableName}`);
    }

    render() {
        if (this.state.database) {
            return (
                <div className="d-flex flex-row">
                    <nav className="d-flex flex-column bg-light border-right">
                        <DatabaseImport />
                    </nav>
                    <main className="d-flex flex-column p-4 pr-5" style={{flexGrow: 1, overflow: "hidden"}}>
                        <Alert data={this.state.alert} />
                        <section className="mb-3">
                            <h5>SQL Statement</h5>
                            <DatabaseInput submitHandler={this.runStatement} />
                        </section>
                        <section className="mb-3">
                            <h5>Result</h5>
                            <DatabaseOutput data={this.state.results} />
                        </section>
                    </main>
                    <Schema data={this.getAllTableNames()} clickHandler={this.runTableQuery} />
                </div>
            );
        }

        return null;
    }
}

export default App;
