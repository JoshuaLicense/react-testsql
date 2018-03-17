import React from 'react';

import PropTypes from 'prop-types';

class Table extends React.Component {
    handleClick = () => {
        this.props.clickHandler(this.props.name);
    }

    render() {
        return (
            <button 
                className="list-group-item list-group-item-action"
                onClick={this.handleClick}>
                {this.props.name}
            </button>
        );
    }
}

Table.propTypes = {
    name: PropTypes.string,
    clickHandler: PropTypes.func,
};

export default Table;