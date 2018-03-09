import React, { Component } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from './components/Nav';

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

    render() {
        if (this.state.database) {
            return (
                <div className="d-flex flex-row">
                    <Nav />
                    <main className="d-flex flex-column p-4 pr-5" style={{flexGrow: 1, overflow: "hidden"}}>
                        <Alert data={this.state.alert} />
                        <section className="mb-3">
                        </section>
                        <section className="mb-3">
                        </section>
                    </main>
                </div>
            );
        }

        return null;
    }
}

export default App;
