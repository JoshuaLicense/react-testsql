import getTables from "./utils/getTables";
import getColumns from "./utils/getColumns";
import getRows from "./utils/getRows";

import getRandomInt from "lodash/random";

const like = {
  set: "Hard",
  func: db => {
    const tables = getTables(db, 1);

    const [{ table, column }] = getColumns(db, tables, { type: "VARCHAR" });

    let [row] = getRows(db, table, column, 1);

    // Three options get a random number between 0 and 2.
    const random = getRandomInt(0);

    let question = `Display all the ${table}'s where the ${column} `;
    let answer = `SELECT * FROM ${table} WHERE ${column} LIKE `;

    if (random === 1) {
      // Starts with...
      const truncatedRow = row.substring(
        0,
        getRandomInt(1, row.length / 2, false)
      );

      answer += `"${truncatedRow}%"`;
      question += `starts with **${truncatedRow}**`;
    } else if (random === 2) {
      // Ends with...
      const truncatedRow = row.substring(
        row.length - getRandomInt(2, row.length / 1.5, false)
      );

      answer += `"%${truncatedRow}"`;
      question += `ends with **${truncatedRow}**`;
    } else {
      // Contains...
      const firstRandomInt = getRandomInt(0, row.length - 2);
      const secondRandomInt = getRandomInt(
        firstRandomInt + 1,
        row.length - firstRandomInt
      );

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
