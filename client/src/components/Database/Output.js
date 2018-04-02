import React from 'react';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

import { withStyles } from 'material-ui/styles';

import PropTypes from 'prop-types';

const styles = theme => ({
  customTable: {
    padding: theme.spacing.unit,
  },
  customRow: {
    height: '2rem',
  },
});

const DatabaseOutput = ({ classes, columns, values }) => (
  <Table>
    <TableHead>
      <TableRow className={classes.customRow}>
        {columns.map((name, i) => <TableCell padding="none" key={i}>{name}</TableCell>)}
      </TableRow>
    </TableHead>
    <TableBody>
      {values.map((row, i) => {
        return (
          <TableRow key={i} className={classes.customRow}>
            {row.map((value, i) => <TableCell padding="none" key={i}>{value}</TableCell>)}
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);

DatabaseOutput.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  values: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
};

export default withStyles(styles)(DatabaseOutput);
