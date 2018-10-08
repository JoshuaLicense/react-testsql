import getRandomInt from "lodash/random";
import getTables from "./utils/getTables";
import getColumns from "./utils/getColumns";

const selectNull = {
  set: "Intermediate",
  build: db => {
    const nullOrNot = [["NOT", "not"], ["", ""]];
    // Random "NOT". Otherwise blank.
    const [null_code, null_text] = nullOrNot[getRandomInt(nullOrNot.lenth)];

    const tables = getTables(db);

    const [{ table, column: column_1 }] = getColumns(
      db,
      tables,
      1,
      undefined,
      false
    );

    return {
      question: `Get a list of all the **${table}** where the **${column_1}** is ${null_text} a null value`,
      answer: `SELECT * FROM ${table} WHERE ${column_1} IS ${null_code} NULL`
    };
  }
};

export default selectNull;
