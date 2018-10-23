import getTables from "./utils/getTables";
import getColumns from "./utils/getColumns";

const orderBy = {
  set: "Intermediate",
  build: db => {
    const tables = getTables(db);

    const [{ table, column: column_1 }] = getColumns(db, tables, 1, "INTEGER");

    return {
      question: `Display the **${table}** showing the largest **${column_1}** first.`,
      answer: `SELECT * FROM ${table} ORDER BY ${column_1} DESC`
    };
  }
};

export default orderBy;
