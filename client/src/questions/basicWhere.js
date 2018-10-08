import getTables from "./utils/getTables";
import getColumns from "./utils/getColumns";
import getRows from "./utils/getRows";

const basicWhere = {
  set: "Easy",
  title: "Basic WHERE clause",
  build: db => {
    const tables = getTables(db);

    const [
      { table, column: column_1 },
      { column: column_2 },
      { column: column_3 }
    ] = getColumns(db, tables, 3);

    const [row] = getRows(db, table, column_3, 1);

    return {
      question: `Display the **${column_1}**'s and **${column_2}**'s from **${table}** that have a **${column_3}** of **${row}**`,
      answer: `SELECT ${column_1}, ${column_2} FROM ${table} WHERE ${column_3} = "${row}"`
    };
  }
};

export default basicWhere;
