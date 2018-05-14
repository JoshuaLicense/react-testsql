import {
  getTables,
  getColumns,
  getRows,
  // eslint-disable-next-line
  getForeignColumns,
  getRandomConjunction,
  getRandomElement
} from "./helpers";

const selectAll = {
  set: "Easy",
  func: db => {
    let [table] = getTables(db, 1);

    return {
      question: `Display all **${table}**`,
      answer: `SELECT * FROM ${table}`
    };
  }
};

const selectSpecific = {
  set: "Easy",
  func: db => {
    const tables = getTables(db);

    const [{ table, column: column_1 }, { column: column_2 }] = getColumns(
      db,
      tables,
      {
        x: 2
      }
    );

    return {
      question: `Display all **${table}** only displaying **${column_1}** and **${column_2}**.`,
      answer: `SELECT ${column_1}, ${column_2} FROM ${table}`
    };
  }
};

const selectUnique = {
  set: "Easy",
  func: db => {
    const tables = getTables(db, 1);

    const [{ table, column }] = getColumns(db, tables);

    return {
      question: `Display all the unique **${column}**'s that exist in **${table}**`,
      answer: `SELECT DISTINCT ${column} FROM ${table}`
    };
  }
};

const basicWhere = {
  set: "Easy",
  func: db => {
    const tables = getTables(db);

    const [
      { table, column: column_1 },
      { column: column_2 },
      { column: column_3 }
    ] = getColumns(db, tables, {
      x: 3
    });

    const [row] = getRows(db, table, column_3, 1);

    return {
      question: `Display the **${column_1}**'s and **${column_2}**'s from **${table}** that have a **${column_3}** of **${row}**`,
      answer: `SELECT ${column_1}, ${column_2} FROM ${table} WHERE ${column_3} = "${row}"`
    };
  }
};

const whereConjunction = {
  set: "Easy",
  func: db => {
    const tables = getTables(db);

    const [{ table, column: column_1 }, { column: column_2 }] = getColumns(
      db,
      tables,
      {
        x: 3,
        type: "varchar"
      }
    );

    const [row_1] = getRows(db, table, column_1, 1);
    const [row_2] = getRows(db, table, column_2, 1);

    const { code: operator_code, text: operator_text } = getRandomConjunction();

    return {
      question: `Display all the **${table}** where **${column_1}** is **${row_1}** ${operator_text} **${column_2}** is **${row_2}**`,
      answer: `SELECT * FROM ${table} WHERE ${column_1} = "${row_1}" ${operator_code} ${column_2} = ${row_2}`
    };
  }
};

const orderBy = {
  set: "Intermediate",
  func: db => {
    const tables = getTables(db);

    const [{ table, column: column_1 }] = getColumns(db, tables, {
      x: 1,
      type: "int"
    });

    return {
      question: `Display the **${table}** showing the largest **${column_1}** first.`,
      answer: `SELECT * FROM ${table} ORDER BY ${column_1} DESC`
    };
  }
};

const orderByMultiple = {
  set: "Intermediate",
  func: db => {
    const tables = getTables(db);

    const [{ table, column: column_1 }, { column: column_2 }] = getColumns(
      db,
      tables,
      {
        x: 2
      }
    );

    return {
      question: `Display the **${table}** showing the **${table}** with the highest **${column_1}** first, secondly sorting by the lowest **${column_2}**`,
      answer: `SELECT * FROM ${table} ORDER BY ${column_1} DESC, ${column_2} ASC`
    };
  }
};

const selectNull = {
  set: "Intermediate",
  func: db => {
    // Random "NOT". Otherwise blank.
    const [null_code, null_text] = getRandomElement([["NOT", "not"], ["", ""]]);

    const tables = getTables(db);

    const [{ table, column: column_1 }] = getColumns(db, tables, {
      x: 1,
      notnull: false
    });

    return {
      question: `Get a list of all the **${table}** where the **${column_1}** is **${null_text}** a null value`,
      answer: `SELECT * FROM ${table} WHERE ${column_1} IS ${null_code} NULL`
    };
  }
};

export default [
  selectAll,
  selectSpecific,
  selectUnique,
  basicWhere,
  whereConjunction,
  orderBy,
  orderByMultiple,
  selectNull
];
