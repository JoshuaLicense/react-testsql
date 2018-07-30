import getTables from "./utils/getTables";

const count = {
  set: "Intermediate",
  func: db => {
    const table = getTables(db);

    return {
      question: `How many ${table}'s are there?`,
      answer: `SELECT COUNT(*) FROM ${table}`
    };
  }
};

export default count;
