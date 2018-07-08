import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import PropTypes from "prop-types";

const styles = {
  padding: {
    padding: "0.5rem"
  },
  rowHeight: {
    height: "2rem"
  }
};

const DatabaseOutput = ({ columns, values }) => (
  <Table>
    <TableHead>
      <TableRow style={styles.rowHeight}>
        {columns.map((name, i) => (
          <TableCell padding="none" key={i}>
            {name}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {values.map((row, i) => (
        <TableRow key={i} style={styles.rowHeight}>
          {row.map((value, i) => (
            <TableCell padding="none" key={i}>
              {value}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

DatabaseOutput.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  values: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  ).isRequired
};

export default DatabaseOutput;
