import React from "react";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import UploadIcon from "@material-ui/icons/FileUpload";

import UserContext from "../Auth/Context";

const displayNone = { display: "none" };

class UploadDatabase extends React.Component {
  handleUpload = e => {
    const files = e.target.files;

    // No file selected, return
    if (files.length === 0) return false;

    const [file] = files;

    const fileReader = new FileReader();

    fileReader.onload = () => {
      const typedArray = new Uint8Array(fileReader.result);

      // Run the submit handler from the parent component
      this.props.uploadDatabaseHandler(typedArray);

      this.toggleSidebar();
    };

    // Tell the file reader to read the selected file as an array buffer
    fileReader.readAsArrayBuffer(file);

    // Reset the import back to blank so in theory could re-upload the same file
    e.target.value = "";
  };

  render() {
    return (
      <UserContext.Consumer>
        {({ user }) =>
          user && user.group ? (
            <IconButton component="span" aria-label="Upload Database" disabled>
              <UploadIcon />
            </IconButton>
          ) : (
            <React.Fragment>
              <input
                accept=".db,.sqlite"
                onChange={this.uploadDatabase}
                style={displayNone}
                id="uploadfile"
                type="file"
              />

              <Tooltip title="Upload Database">
                <label htmlFor="uploadfile">
                  <IconButton component="span" aria-label="Upload Database">
                    <UploadIcon />
                  </IconButton>
                </label>
              </Tooltip>
            </React.Fragment>
          )
        }
      </UserContext.Consumer>
    );
  }
}

export default UploadDatabase;
