import React from 'react';

import './input.css';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import 'codemirror/mode/sql/sql.js';

import PropTypes from 'prop-types';

import { Controlled as CodeMirror } from 'react-codemirror2';

class Form extends React.Component {
    handleSubmit = (e) => {
        // Don't submit the form
        e.preventDefault();

        // Run the submit handler from the parent component
        this.props.submitHandler();
    }

    handleChange = (editor, data, statement) => {
        this.props.changeHandler(statement);
    }

    handleClear = (e) => {
        e.preventDefault();

        this.props.clearHandler();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <CodeMirror
                    value={this.props.statement}
                    options={{
                        mode: 'text/x-sql',
                        theme: 'material',
                        lineNumbers: true,
                    }}
                    onBeforeChange={this.handleChange} 
                />
                <div className="mt-1">
                    <button type="submit" className="btn btn-success btn-sm">Run SQL</button>
                    <button type="button" className="ml-1 btn btn-outline-danger btn-sm" onClick={this.handleClear}>Clear</button>
                </div>
            </form>
        );
    }
}

Form.propTypes = {
    submitHandler: PropTypes.func,
};

export default Form;