import getTables from "./utils/getTables";

const selectAll = {
  set: "Easy",
  build: db => {
    let [table] = getTables(db, 1);

    return {
      question: `Display all **${table}**`,
      answer: `SELECT * FROM ${table}`
    };
  }
};

export default selectAll;
