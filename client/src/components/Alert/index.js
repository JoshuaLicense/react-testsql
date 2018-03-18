import React from 'react';

import PropTypes from 'prop-types';

class Alert extends React.Component {
    render() {
        // Check if we have an alert to display
        if(null === this.props.data) {
            return null;
        }

        const { type, message, } = this.props.data;

        return (
            <div className={`alert alert-${type}`} role="alert">
                {message}
            </div>
        );
    }
}

Alert.defaultProps = {
    data: {},
};

Alert.propTypes = {
    data: PropTypes.object,
};

export default Alert;