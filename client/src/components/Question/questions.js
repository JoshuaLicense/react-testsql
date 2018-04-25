import { getTables, getColumns, getRows, getForeignColumns } from "./helpers";

const _questions = [
  {
    set: "Easy",
    question: "Display all the contents of {table}",
    answer: "SELECT * FROM {table}",
    func: db => {
      let [table] = getTables(db, 1);

      if (!table) {
        throw new Error("Cannot get two unique tables from the database");
      }

      return {
        table
      };
    }
  },
  {
    set: "Easy",
    answer: "SELECT `{column1}`, `{column2}` FROM {table}",
    question: "Display all the {column1}'s and {column2}'s from {table}",
    func: db => {
      const tables = getTables(db);

      const [{ table, column: column1 }, { column: column2 }] = getColumns(
        db,
        tables,
        {
          x: 2
        }
      );

      return {
        table,
        column1,
        column2
      };
    }
  },
  {
    set: "Easy",
    question: "Display all the different {column}'s that exist in {table}",
    answer: "SELECT DISTINCT {column} FROM {table}",
    func: db => {
      const tables = getTables(db, 1);

      const [{ table, column }] = getColumns(db, tables);

      return {
        table,
        column
      };
    },
    completed: true
  },
  {
    set: "Easy",
    question: "Display the {column1}'s and {column2}'s from {table} that have a {column3} of {row}",
    answer: "SELECT `{column1}`, `{column2}` FROM {table}",
    func: db => {
      const tables = getTables(db);
  
      const [{ table, column: column1 }, { column: column2 }, { column: column3 }] = getColumns(
        db,
        tables,
        {
          x: 3
        }
      );

      const [row] = getRows(db, table, column3, 1);

      return {
        table,
        column1,
        column2,
        column3,
        row,
      };
    }
  },

  {
    set: "Intermediate",
    func: db => {
      //let [[table]] = this.getXTables(1);

      return {
        table: "apple",
        column: "orange"
      };
    },
    answer: "SELECT * FROM {table}",
    question: "Display all the different %column% that exist in %table%"
  }
];

export default _questions;
