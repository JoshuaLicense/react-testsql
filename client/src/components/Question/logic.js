const COLUMN_ID = 0;
const COLUMN_NAME = 1;
const COLUMN_TYPE = 2;
const COLUMN_NOT_NULL = 3;
const DEFAULT = 4;
const PRIMARY_KEY = 5;

export const getTables = (db, x = false) => {
  const getTables = db.exec(
    `SELECT "tbl_name" FROM "sqlite_master" WHERE "type" = 'table' AND "tbl_name" != "ts-questions" ORDER BY RANDOM() ${
      x ? `LIMIT ${x}` : ""
    }`
  );

  // Did we recieve any tables back?
  if (getTables[0].values.length > 0) {
    // Flatten the array
    return [].concat(...getTables[0].values);
  }

  throw new Error(`No tables found in the database`);
};

export const getColumns = (
  db,
  { x = 1, type = "varchar", nullable = false, sameTable = true } = {}
) => {
  const tables = getTables(db);
  const result = [];

  for (let i = 0; i < tables.length && x > result.length; ++i) {
    const tableInfo = db.exec(`PRAGMA table_info(${tables[i]})`);
    // Shuffle?
    const columns = tableInfo[0].values;
    console.log(tableInfo);

    for (let j = 0; j < columns.length && x > result.length; ++j) {
      if (columns[j][COLUMN_NOT_NULL] !== +nullable) {
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

  return result;
};

export const getForeignColumns = (db, x = 1) => {
  const tables = getTables();
  const result = [];

  for (let i = 0; i < tables.length; ++i) {
    const foreignKeys = db.exec(`PRAGMA foreign_key_list(${tables[i]})`);

    if (foreignKeys.length > 0) {
      if (foreignKeys[0].values.length < x) {
        continue;
      }

      // shuffle
      const keys = foreignKeys[0].values;
      keys.length = x;

      for (let j = 0; j < x; ++j) {
        result.push({
          from: {
            table: keys[j][2],
            column: keys[j][3]
          },
          to: {
            table: getTables[i][0],
            column: keys[j][4]
          }
        });
      }
    }
  }

  if (result.length > 0) {
    return result;
  }

  throw new Error(`A foreign key was not found`);
};

export const getRowsFrom = (db, table, column, x = 1) => {
  const rows = db.exec(
    `SELECT "${column}" FROM "${table}" ORDER BY RANDOM() LIMIT ${x}`
  );

  if (rows[0].values.length < x) {
    throw new Error(`The table doesn't contain enough rows`);
  }

  return rows;
};
