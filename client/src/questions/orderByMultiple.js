import getTables from "./utils/getTables";
import getColumns from "./utils/getColumns";

const orderByMultiple = {
  set: "Intermediate",
  build: db => {
    const tables = getTables(db);

    const [{ table, column: column_1 }, { column: column_2 }] = getColumns(
      db,
      tables,
      2,
      "INTEGER"
    );

    return {
      question: `Display the **${table}** showing the **${table}** with the highest **${column_1}** first, secondly sorting by the lowest **${column_2}**`,
      answer: `SELECT * FROM ${table} ORDER BY ${column_1} DESC, ${column_2} ASC`
    };
  }
};

export default orderByMultiple;
