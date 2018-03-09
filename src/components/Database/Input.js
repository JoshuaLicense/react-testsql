import React from 'react';

import PropTypes from 'prop-types';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import 'codemirror/mode/sql/sql.js';

import { Controlled as CodeMirror } from 'react-codemirror2';

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            statement: null,
        };
    }

    handleSubmit = (e) => {
        // Don't submit the form
        e.preventDefault();

        // Run the submit handler from the parent component
        this.props.submitHandler(this.state.statement);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <CodeMirror
                    value={this.state.statement}
                    options={{
                        mode: 'text/x-sql',
                        theme: 'material',
                        lineNumbers: true,
                    }}
                    onBeforeChange={(editor, data, statement) => {
                        this.setState({ statement, });
                    }} />
                <div className="mt-1">
                    <button type="submit" className="btn btn-success btn-sm">Run SQL</button>
                    <button type="button" className="ml-1 btn btn-outline-danger btn-sm" onClick={() => this.setState({ statement: null, })}>Clear</button>
                </div>
            </form>
        );
    }
  }
  
  export default Form;