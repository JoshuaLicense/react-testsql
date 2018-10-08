import getTables from "./utils/getTables";

const count = {
  set: "Intermediate",
  build: db => {
    const table = getTables(db, 1);

    return {
      question: `How many **${table}** are there?`,
      answer: `SELECT COUNT(*) FROM ${table}`
    };
  }
};

export default count;
