import React from 'react';

import PropTypes from 'prop-types';

import ImportIcon from '../Icons/Import';

class Import extends React.Component {
  handleChange = (e) => {
    const files = e.target.files;

    // No file selected, return
    if (files.length === 0) return false;

    const [file] = files;

    const fileReader = new FileReader();

    fileReader.onload = () => {
      const typedArray = new Uint8Array(fileReader.result);

      // Run the submit handler from the parent component
      this.props.changeHandler(typedArray);
    }

    // Tell the file reader to read the selected file as an array buffer
    fileReader.readAsArrayBuffer(file);

    // Reset the import back to blank so in theory could re-upload the same file
    e.target.value = '';
  }

  render() {
    return (
      <div>
        <input type="file" className="d-none" id="ts-import" onChange={this.handleChange} />
        <label htmlFor="ts-import" className="btn btn-light btn-block rounded-0 border-bottom">
          <ImportIcon />
        </label>
      </div>
    );
  }
}

export default Import;