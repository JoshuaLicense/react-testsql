import getTables from "./utils/getTables";
import getColumns from "./utils/getColumns";

import getRandomInt from "lodash/random";

const minMaxAvg = {
  set: "Intermediate",
  build: db => {
    const tables = getTables(db);

    const [{ table, column }] = getColumns(db, tables, 1, "INT");

    const { textual, func } = [
      { textual: "largest", func: "MAX" },
      { textual: "smallest", func: "MIN" },
      { textual: "average", func: "AVG" }
    ][getRandomInt(2)];

    return {
      question: `Return the ${textual} **${column}** in **${table}**. Use the function \`${func}()\`.`,
      answer: `SELECT ${func}(${column}) FROM ${table}`
    };
  }
};

export default minMaxAvg;
