import getTables from "./utils/getTables";
import getColumns from "./utils/getColumns";
import getRows from "./utils/getRows";

import getRandomConjunction from "./utils/getRandomConjunction";

const whereConjunction = {
  set: "Easy",
  build: db => {
    const tables = getTables(db);

    const [{ table, column: column_1 }, { column: column_2 }] = getColumns(
      db,
      tables,
      3,
      "VARCHAR"
    );

    const [row_1] = getRows(db, table, column_1, 1);
    const [row_2] = getRows(db, table, column_2, 1);

    const { code: operator_code, text: operator_text } = getRandomConjunction();

    return {
      question: `Display the **${table}** where **${column_1}** is **${row_1}** ${operator_text} **${column_2}** is **${row_2}**`,
      answer: `SELECT * FROM ${table} WHERE ${column_1} = "${row_1}" ${operator_code} ${column_2} = "${row_2}"`
    };
  }
};

export default whereConjunction;
