const COLUMN_ID = 0;
const COLUMN_NAME = 1;
const COLUMN_TYPE = 2;
const COLUMN_NOT_NULL = 3;
const DEFAULT = 4;
const PRIMARY_KEY = 5;

export const getTables = (db, x = false) => {
  const getTables = db.exec(
    `SELECT "tbl_name" FROM "sqlite_master" WHERE "type" = 'table' AND "tbl_name" != "ts-questions" ORDER BY RANDOM() ${x ? `LIMIT ${x}` : ""}`
  );

  // Did we recieve any tables back?
  if (getTables[0].values.length > 0) {
    // Flatten the array
    return [].concat(...getTables[0].values);
  }

  throw new Error(`No tables found in the database`);
};

export const getColumns = (db, { x = 1, type = "varchar", nullable = false, sameTable = true } = {}) => {
  const tables = getTables(db);
  const result = [];
  
  for(let i = 0; i < tables.length && x > result.length; ++i) {
    const tableInfo = db.exec(`PRAGMA table_info(${tables[i]})`);
    const columns = tableInfo[0].values;
    console.log(tableInfo);

    for(let j = 0; j < columns.length && x > result.length; ++j) {
      if(columns[j][COLUMN_NOT_NULL] !== +nullable) {
        continue;
      }

      if(columns[j][COLUMN_NAME].indexOf(type) !== -1) {
        result.push({ table: tables[i], column: columns[j][COLUMN_NAME] });
        continue;
      }

      result.push({ table: tables[i], column: columns[j][COLUMN_NAME]})
    }

    // If we need 'x' columns from this table, but it doesn't have that many, remove all and try again
    if(sameTable && result.length < x) result.length = 0;
  }

  return result;
}