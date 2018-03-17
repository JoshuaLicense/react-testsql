import React from 'react';

import PropTypes from 'prop-types';

class Output extends React.Component {
    render() {
        if(!this.props.data) {
            return (
                <p className="lead small">Click "Run SQL" to execute the SQL statement above.</p>
            );
        }
    
        const [{ columns, values, }] = this.props.data;

        return (
            <div className="table-responsive">
                <table className="table table-sm table-bordered">
                    <thead className="thead-light">
                        <tr>
                            {columns.map((name, i) => <th key={i} scope="col">{name}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {values.map((row, i) => {
                            return (
                                <tr key={i}>
                                    {row.map((value, i) => <td key={i}>{value}</td>)}
                                </tr>
                            );    
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
  }
  
  export default Output;