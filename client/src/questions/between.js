import getTables from "./utils/getTables";
import getColumns from "./utils/getColumns";
import getRows from "./utils/getRows";

const between = {
  title: "Between clause",
  set: "Hard",
  build: db => {
    const tables = getTables(db, 1);

    const [{ table, column }] = getColumns(db, tables, 1, "INT");

    let [row1, row2] = getRows(db, table, column, 2);

    let question = `Display all the ${table} where the ${column} is between ${row1} and ${row2}. Use the SQL condition \`BETWEEN()\`.`;
    let answer = `SELECT * FROM ${table} WHERE ${column} BETWEEN ${row1} && ${row2}`;

    return {
      question,
      answer
    };
  }
};

export default between;
