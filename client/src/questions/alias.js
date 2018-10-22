import getTables from "./utils/getTables";
import getColumns from "./utils/getColumns";

const columnAlias = {
  set: "Intermediate",
  title: "Basic WHERE clause",
  build: db => {
    const tables = getTables(db);

    const [{ table, column: column_1 }, { column: column_2 }] = getColumns(
      db,
      tables,
      2
    );

    // Create some example alias column names.
    // This is basically the first letter of the column names.
    // Accounting for column name clashes, in which case will result in "A" or "B".
    let alias_1 = column_1.substr(0, 1);
    let alias_2 = column_2.substr(0, 1);

    // Check that the aliases aren't the same.
    if (alias_1 === alias_2) {
      // Change them to "A" and "B".
      alias_1 = "A";
      alias_2 = "B";
    }

    return {
      question: `Select the columns ${column_1} and ${column_2} assigning them the following aliases: **${alias_1}** and **${alias_2}**, _respectively_.`,
      answer: `SELECT ${column_1} AS "${alias_1}", ${column_2} AS "${alias_2}" FROM ${table}`
    };
  }
};

export default columnAlias;
