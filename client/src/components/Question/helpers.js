const COLUMN_ID = 0;
const COLUMN_NAME = 1;
const COLUMN_TYPE = 2;
const COLUMN_NOT_NULL = 3;
const DEFAULT = 4;
const PRIMARY_KEY = 5;

export const getTables = (db, x = false) => {
  const [{ values: tables }] = db.exec(
    `SELECT "tbl_name" FROM "sqlite_master" WHERE "type" = 'table' AND "tbl_name" != "ts-questions" ORDER BY RANDOM() ${
      x ? `LIMIT ${x}` : ""
    }`
  );

  // Did we recieve the wanted number of tables back?
  if (x && tables.length !== x) {
    // Flatten the array
    throw new Error(`Not enough tables found in the database.`);
  }

  return [].concat(...tables);
};

export const getColumns = (
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

export const getRows = (db, table, column, x = 1) => {
  const [{ values }] = db.exec(
    `SELECT "${column}" FROM "${table}" ORDER BY RANDOM() LIMIT ${x}`
  );

  if (values.length < x) {
    throw new Error(`The table doesn't contain enough rows.`);
  }

  return [].concat(...values);
};
