import getTables from "./utils/getTables";
import getColumns from "./utils/getColumns";
import getRows from "./utils/getRows";

const whereIn = {
  set: "Easy",
  func: db => {
    const tables = getTables(db);

    const [{ table, column: column_1 }] = getColumns(db, tables);

    const [row_1, row_2] = getRows(db, table, column_1, 2);

    return {
      question: `Display all the **${table}** where **${column_1}** is **${row_1}** or **${row_2}**, using the \`IN()\` operator`,
      answer: `SELECT * FROM ${table} WHERE ${column_1} IN("${row_1}", "${row_2}")`
    };
  }
};

export default whereIn;
