import getRandomInt from "lodash/random";
import getTables from "./utils/getTables";
import getColumns from "./utils/getColumns";

const limitAndOrder = {
  set: "Intermediate",
  build: db => {
    // Get a random limit number between 5-10
    const randomInt = getRandomInt(5, 10);

    const tables = getTables(db);

    const [{ table, column: column_1 }] = getColumns(db, tables, 1, "INTEGER");

    const [{ column: column_2 }, { column: column_3 }] = getColumns(
      db,
      [table],
      2
    );

    return {
      question: `Find the top ${randomInt} **${table}** with the highest **${column_1}**, showing the **${column_1}**, **${column_2}**, and **${column_3}** of each ${table}.`,
      answer: `SELECT ${column_1}, ${column_2}, ${column_3} FROM ${table} ORDER BY ${column_1} DESC LIMIT ${randomInt}`
    };
  }
};

export default limitAndOrder;
