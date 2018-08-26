import shuffle from "lodash/shuffle";
import flatten from "lodash/flatten";

const getTables = (db, x = null) => {
  const [{ values: tables }] = db.exec(
    `SELECT "tbl_name" FROM "sqlite_master" WHERE "type" = 'table' AND "tbl_name" != "ts-questions" ORDER BY RANDOM() ${
      x ? `LIMIT ${x}` : ""
    }`
  );

  // Did we recieve the wanted number of tables back?
  if (x && tables.length !== x) {
    throw new Error(`Not enough tables found in the database.`);
  }

  // Flatten the array of tables.
  // Could use multiple flatten-ing methods;
  // however my (brief) tests show the lodash methods beats ES5 and ES6 flattens by over 100%.
  // [].concat(...rows);
  // rows.reduce((acc, val) => acc.concat(val), []);
  const flattenedTables = flatten(tables);

  return shuffle(flattenedTables);
};

export default getTables;
