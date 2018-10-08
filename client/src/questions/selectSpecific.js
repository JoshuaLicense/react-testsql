import getTables from "./utils/getTables";
import getColumns from "./utils/getColumns";

const selectSpecific = {
  set: "Easy",
  build: db => {
    const tables = getTables(db);

    const [{ table, column: column_1 }, { column: column_2 }] = getColumns(
      db,
      tables,
      2
    );

    return {
      question: `Display all **${table}** only displaying **${column_1}** and **${column_2}**.`,
      answer: `SELECT ${column_1}, ${column_2} FROM ${table}`
    };
  }
};

export default selectSpecific;
