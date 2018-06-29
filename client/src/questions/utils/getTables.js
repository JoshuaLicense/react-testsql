const getTables = (db, x = false) => {
  const [{ values: tables }] = db.exec(
    `SELECT "tbl_name" FROM "sqlite_master" WHERE "type" = 'table' AND "tbl_name" != "ts-questions" ORDER BY RANDOM() ${
      x ? `LIMIT ${x}` : ""
    }`
  );

  // Did we recieve the wanted number of tables back?
  if (x && tables.length !== x) {
    throw new Error(`Not enough tables found in the database.`);
  }

  // Flatten the array
  return [].concat(...tables);
};

export default getTables;
