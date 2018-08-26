import flatten from "lodash/flatten";

const getRows = (db, table, column, x = 1) => {
  const [{ values: rows }] = db.exec(
    `SELECT "${column}" FROM "${table}" ORDER BY RANDOM() LIMIT ${x}`
  );

  if (rows.length < x) {
    throw new Error(`The table doesn't contain enough rows.`);
  }

  // Flatten the array of tables.
  // Could use multiple flatten-ing methods;
  // however my (brief) tests show the lodash methods beats ES5 and ES6 flattens by over 100%.
  // [].concat(...rows);
  // rows.reduce((acc, val) => acc.concat(val), []);
  return flatten(rows);
};

export default getRows;
