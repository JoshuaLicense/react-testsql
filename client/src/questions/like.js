import getTables from "./utils/getTables";
import getColumns from "./utils/getColumns";
import getRows from "./utils/getRows";

import getRandomInt from "lodash/random";

const like = {
  set: "Hard",
  build: db => {
    const tables = getTables(db, 3);

    const [{ table, column }] = getColumns(db, tables, 1, "VARCHAR");

    let [row] = getRows(db, table, column, 1);

    // Three options get a random number between 0 and 2.
    let random = getRandomInt(2);

    let question = `Display all the **${table}** where the **${column}** `;
    let answer = `SELECT * FROM ${table} WHERE ${column} LIKE `;

    if (random === 1) {
      // Starts with...
      const truncatedRow = row.substring(
        0,
        getRandomInt(1, Math.round(row.length / 1.5))
      );

      answer += `"${truncatedRow}%"`;
      question += `starts with **${truncatedRow}**`;
    } else if (random === 2) {
      // Ends with...
      const truncatedRow = row.substring(
        row.length - getRandomInt(2, Math.round(row.length / 1.5))
      );

      answer += `"%${truncatedRow}"`;
      question += `ends with **${truncatedRow}**`;
    } else {
      // Contains...
      const firstRandomInt = getRandomInt(0, Math.round(row.length / 1.5));
      const secondRandomInt = getRandomInt(firstRandomInt + 1, row.length);

      const truncatedRow = row.substring(firstRandomInt, secondRandomInt);

      answer += `"%${truncatedRow}%"`;
      question += `contains **${truncatedRow}**`;
    }

    return {
      question,
      answer
    };
  }
};

export default like;
