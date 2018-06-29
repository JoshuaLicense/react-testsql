const getForeignColumns = (db, tables, x = 1) => {
  const result = [];

  for (let i = 0; i < tables.length && x > result.length; ++i) {
    // Will be unable to destructure if no foreign keys exist, continue to the next table
    try {
      const [{ values: foreignKeys }] = db.exec(
        `PRAGMA foreign_key_list(${tables[i]})`
      );

      for (let j = 0; j < foreignKeys.length && x > result.length; ++j) {
        result.push({
          from: {
            table: foreignKeys[j][2],
            column: foreignKeys[j][3]
          },
          to: {
            table: tables[i],
            column: foreignKeys[j][4]
          }
        });
      }
    } catch (e) {
      continue;
    }
  }

  if (x && result.length !== x) {
    throw new Error(`Not enough foreign keys were found in the database.`);
  }

  return result;
};

export default getForeignColumns;
