import getTables from "./utils/getTables";
import getColumns from "./utils/getColumns";
import getRows from "./utils/getRows";

const between = {
  title: "Between clause",
  set: "Hard",
  build: db => {
    const tables = getTables(db, 1);

    const [{ table, column }] = getColumns(db, tables, 1, "INT");

    const rows = getRows(db, table, column, 2);

    // Sort them into largest to smallest number.
    // Just so the between clause actually reads better.
    rows.sort();

    const [row1, row2] = rows;

    let question = `Display all the **${table}** where the **${column}** is between **${row1}** and **${row2}**. Use the SQL condition \`BETWEEN()\`.`;
    let answer = `SELECT * FROM ${table} WHERE ${column} BETWEEN "${row1}" AND "${row2}"`;

    return {
      question,
      answer
    };
  }
};

export default between;
