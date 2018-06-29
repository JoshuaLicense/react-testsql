const COLUMN_ID = 0; // eslint-disable-line no-unused-vars
const COLUMN_NAME = 1;
const COLUMN_TYPE = 2; // eslint-disable-line no-unused-vars
const COLUMN_NOT_NULL = 3;
const DEFAULT = 4; // eslint-disable-line no-unused-vars
const PRIMARY_KEY = 5; // eslint-disable-line no-unused-vars

const getColumns = (
  db,
  tables,
  { x = 1, type = "varchar", notnull = null, sameTable = true } = {}
) => {
  const result = [];

  for (let i = 0; i < tables.length && x > result.length; ++i) {
    const [{ values: columns }] = db.exec(`PRAGMA table_info(${tables[i]})`);

    for (let j = 0; j < columns.length && x > result.length; ++j) {
      if (notnull !== null && columns[j][COLUMN_NOT_NULL] !== +notnull) {
        continue;
      }

      if (columns[j][COLUMN_NAME].indexOf(type) !== -1) {
        result.push({ table: tables[i], column: columns[j][COLUMN_NAME] });

        continue;
      }

      result.push({ table: tables[i], column: columns[j][COLUMN_NAME] });
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
