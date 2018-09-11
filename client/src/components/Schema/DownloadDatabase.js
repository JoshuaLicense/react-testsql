import React from "react";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import DownloadIcon from "@material-ui/icons/CloudDownloadTwoTone";

import FileSaver from "file-saver";

class DownloadDatabase extends React.Component {
  handleDownload = () => {
    const { currentDatabase } = this.props;

    const blob = new Blob([currentDatabase.export()], {
      type: `application/x-sqlite-3`
    });

    FileSaver.saveAs(blob, "testSQL.sqlite");
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
