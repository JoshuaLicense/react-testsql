const getRows = (db, table, column, x = 1) => {
  const [{ values }] = db.exec(
    `SELECT "${column}" FROM "${table}" ORDER BY RANDOM() LIMIT ${x}`
  );

  if (values.length < x) {
    throw new Error(`The table doesn't contain enough rows.`);
  }

  return [].concat(...values);
};

export default getRows;
