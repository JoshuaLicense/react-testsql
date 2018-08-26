import shuffle from "lodash/shuffle";

const COLUMN_ID = 0; // eslint-disable-line no-unused-vars
const COLUMN_NAME = 1;
const COLUMN_TYPE = 2; // eslint-disable-line no-unused-vars
const COLUMN_NOT_NULL = 3;
const DEFAULT = 4; // eslint-disable-line no-unused-vars
const PRIMARY_KEY = 5; // eslint-disable-line no-unused-vars

const getColumns = (db, tables, x = 1, type, notnull, sameTable = true) => {
  const result = [];

  for (let i = 0; i < tables.length && x > result.length; ++i) {
    // Check if we have a column cache for this table.
    if (
      !window.questionCache[tables[i]] ||
      window.questionCache[tables[i]].length === 0
    ) {
      const [{ values: columns }] = db.exec(`PRAGMA table_info(${tables[i]})`);

      // If not set one.
      window.questionCache[tables[i]] = columns;
    }

    // Shuffle the columns for improved randomness.
    const shuffledColumns = shuffle(window.questionCache[tables[i]]);

    for (let j = 0; j < shuffledColumns.length && x > result.length; ++j) {
      // Strict undefined check as "not null" can be false.
      if (
        typeof notnull !== "undefined" &&
        shuffledColumns[j][COLUMN_NOT_NULL] !== +notnull
      ) {
        continue;
      }

      if (type && shuffledColumns[j][COLUMN_TYPE].indexOf(type) === -1) {
        continue;
      }

      result.push({
        table: tables[i],
        column: shuffledColumns[j][COLUMN_NAME]
      });
    }

    // If we need 'x' columns from this table, but it doesn't have that many, remove all and try again
    if (sameTable && result.length < x) result.length = 0;
  }

  if (x && result.length !== x) {
    throw new Error(`Not enough columns found in the database.`);
  }

  return result;
};

export default getColumns;
