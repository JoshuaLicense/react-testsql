import React from "react";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import DownloadIcon from "@material-ui/icons/FileDownload";

class DownloadDatabase extends React.Component {
  handleDownload = () => {
    const { currentDatabase } = this.props;

    const blob = new Blob([currentDatabase.export()], {
      type: `application/x-sqlite-3`
    });

    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "testSQL.sqlite";
    a.onclick = () => {
      setTimeout(() => {
        window.URL.revokeObjectURL(a.href);
      }, 1500);
    };
    a.click();
  };

  render() {
    return (
      <Tooltip title="Download Database">
        <IconButton
          onClick={this.handleDownload}
          aria-label="Download Database"
        >
          <DownloadIcon />
        </IconButton>
      </Tooltip>
    );
  }
}

export default DownloadDatabase;
