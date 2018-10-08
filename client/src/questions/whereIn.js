import getTables from "./utils/getTables";
import getColumns from "./utils/getColumns";
import getRows from "./utils/getRows";

const whereIn = {
  set: "Easy",
  build: db => {
    const tables = getTables(db);

    const [{ table, column: column_1 }] = getColumns(db, tables);

    const [row_1, row_2, row_3] = getRows(db, table, column_1, 3);

    return {
      question: `Display all the **${table}** where **${column_1}** is **${row_1}** or **${row_2}** or **${row_3}**, using the \`IN()\` operator`,
      answer: `SELECT * FROM ${table} WHERE ${column_1} IN("${row_1}", "${row_2}", "${row_3}")`
    };
  }
};

export default whereIn;
