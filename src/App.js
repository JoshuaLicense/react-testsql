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
