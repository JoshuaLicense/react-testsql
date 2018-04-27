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
    }
  },
  {
    set: "Easy",
    question:
      "Display the {column1}'s and {column2}'s from {table} that have a {column3} of {row}",
    answer:
      "SELECT `{column1}`, `{column2}` FROM {table} WHERE {column3} = '{row}'",
    func: db => {
      const tables = getTables(db);

      const [
        { table, column: column1 },
        { column: column2 },
        { column: column3 }
      ] = getColumns(db, tables, {
        x: 3
      });

      const [row] = getRows(db, table, column3, 1);

      /*

      const fkTables = getTables(db);

      let fk = getForeignColumns(db, fkTables, 1);

      //console.log(fk);

      //console.log(rows);*/

      return {
        table,
        column1,
        column2,
        column3,
        row
      };
    }
  },
  {
    set: "Easy",
    question:
      "Display the rows from {table} showing the highest {column1} first.",
    answer: "SELECT * FROM {table} ORDER BY {column1} DESC",
    func: db => {
      const tables = getTables(db);

      const [{ table, column: column1 }] = getColumns(db, tables, {
        x: 1,
        type: "int"
      });

      return {
        table,
        column1
      };
    }
  },
  {
    set: "Easy",
    question:
      "Display the rows from {table} showing the highest {column1} first, using {column2} as a secondary ascending sort",
    answer: "SELECT * FROM {table} ORDER BY {column1} DESC, {column2} ASC",
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
    question:
      "Get a list of all the {table} where the {column} is {random} null",
    answer: "SELECT * FROM {table} WHERE {column} IS {random} NULL",
    func: db => {
      const random = Math.random() >= 0.5 ? "not" : "";

      const tables = getTables(db);

      const [{ table, column: column }] = getColumns(db, tables, {
        x: 1,
        notnull: false
      });

      return {
        table,
        column,
        random
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
