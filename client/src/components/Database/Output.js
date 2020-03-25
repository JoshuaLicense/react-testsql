import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import PropTypes from "prop-types";

const DatabaseOutput = ({ columns, values }) => (
  <Table size="small">
    <TableHead>
      <TableRow>
        {columns.map((name, i) => (
          <TableCell key={i}>{name}</TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {values.map((row, i) => (
        <TableRow key={i}>
          {row.map((value, i) => (
            <TableCell key={i}>{value}</TableCell>
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
