import sampleSize from "lodash/sampleSize";

const getTables = (db, x = null) => {
  // If no cache currently exists, populate one.
  if (Object.keys(window.questionCache).length === 0) {
    const [{ values: tables }] = db.exec(
      `SELECT "tbl_name" FROM "sqlite_master" WHERE "type" = 'table' AND "tbl_name" != "ts-questions"`
    );

    tables.forEach(([table]) => (window.questionCache[table] = []));
  }

  const tableArray = Object.keys(window.questionCache);

  // If no count is specified just return all the tables.
  if (!x) {
    return tableArray;
  }

  // Did we recieve the wanted number of tables back?
  if (tableArray.length < x) {
    throw new Error(`Not enough tables found in the database.`);
  }

  // If only 1 table was requested, return a random element.
  if (x === 1) {
    return [tableArray[Math.floor(Math.random() * tableArray.length)]];
  }

  return sampleSize(tableArray, x);
};

export default getTables;
