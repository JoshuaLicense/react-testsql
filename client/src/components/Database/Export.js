import React from 'react';

import PropTypes from 'prop-types';

import DownloadIcon from '../Icons/Download';

class Import extends React.Component {
  render() {
    return (
      <button type="button" className="btn btn-light btn-block rounded-0 border-bottom p-2" onClick={this.props.clickHandler}>
        <DownloadIcon />
      </button>
    );
  }
}

export default Import;