import React, { Component } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from './components/Nav';

import { DatabaseInput, DatabaseOutput, } from './components/Database';

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

    }

    render() {
        if (this.state.database) {
            return (
                <div className="d-flex flex-row">
                    <Nav />
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
                </div>
            );
        }

        return null;
    }
}

export default App;
