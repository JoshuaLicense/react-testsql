const COLUMN_ID = 0; // eslint-disable-line no-unused-vars
const COLUMN_NAME = 1;
const COLUMN_TYPE = 2; // eslint-disable-line no-unused-vars
const COLUMN_NOT_NULL = 3;
const DEFAULT = 4; // eslint-disable-line no-unused-vars
const PRIMARY_KEY = 5; // eslint-disable-line no-unused-vars

const buildQuestion = (db, config) => {
  const { func } = config;

  // Try running the question callable
  try {
    const { question, answer } = func(db);

    return { ...config, question, answer };
  } catch (Error) {
    // Mark as error'd question
    return {
      ...config,
      question: `Error: ${Error.message}`,
      answer: null,
      error: true
    };
  }
};

const getQuestions = async (database, forceRebuild = false) =>
  new Promise((resolve, reject) => {
    // Check the localStorage for any cached question sets
    const cachedQuestions = localStorage.getItem("__testSQL_Questions__");

    if (cachedQuestions && !forceRebuild) {
      const decodedQuestions = JSON.parse(cachedQuestions);

      return resolve(decodedQuestions);
    }

    return import("../Question/questions.js").then(
      ({ default: _questions }) => {
        const questions = _questions.map(question =>
          buildQuestion(database, question)
        );

        // Cache the built questions.
        localStorage.setItem(
          "__testSQL_Questions__",
          JSON.stringify(questions)
        );

        return resolve(questions);
      }
    );
  });

export default getQuestions;

export const getTables = (db, x = false) => {
  const [{ values: tables }] = db.exec(
    `SELECT "tbl_name" FROM "sqlite_master" WHERE "type" = 'table' AND "tbl_name" != "ts-questions" ORDER BY RANDOM() ${
      x ? `LIMIT ${x}` : ""
    }`
  );

  // Did we recieve the wanted number of tables back?
  if (x && tables.length !== x) {
    throw new Error(`Not enough tables found in the database.`);
  }

  // Flatten the array
  return [].concat(...tables);
};

export const getColumns = (
  db,
  tables,
  { x = 1, type = "varchar", notnull = null, sameTable = true } = {}
) => {
  const result = [];

  for (let i = 0; i < tables.length && x > result.length; ++i) {
    const [{ values: columns }] = db.exec(`PRAGMA table_info(${tables[i]})`);

    for (let j = 0; j < columns.length && x > result.length; ++j) {
      if (notnull !== null && columns[j][COLUMN_NOT_NULL] !== +notnull) {
        continue;
      }

      if (columns[j][COLUMN_NAME].indexOf(type) !== -1) {
        result.push({ table: tables[i], column: columns[j][COLUMN_NAME] });

        continue;
      }

      result.push({ table: tables[i], column: columns[j][COLUMN_NAME] });
    }

    // If we need 'x' columns from this table, but it doesn't have that many, remove all and try again
    if (sameTable && result.length < x) result.length = 0;
  }

  if (x && result.length !== x) {
    throw new Error(`Not enough columns found in the database.`);
  }

  return result;
};

export const getForeignColumns = (db, tables, x = 1) => {
  const result = [];

  for (let i = 0; i < tables.length && x > result.length; ++i) {
    // Will be unable to destructure if no foreign keys exist, continue to the next table
    try {
      const [{ values: foreignKeys }] = db.exec(
        `PRAGMA foreign_key_list(${tables[i]})`
      );

      for (let j = 0; j < foreignKeys.length && x > result.length; ++j) {
        result.push({
          from: {
            table: foreignKeys[j][2],
            column: foreignKeys[j][3]
          },
          to: {
            table: tables[i],
            column: foreignKeys[j][4]
          }
        });
      }
    } catch (e) {
      continue;
    }
  }

  if (x && result.length !== x) {
    throw new Error(`Not enough foreign keys were found in the database.`);
  }

  return result;
};

export const getRows = (db, table, column, x = 1) => {
  const [{ values }] = db.exec(
    `SELECT "${column}" FROM "${table}" ORDER BY RANDOM() LIMIT ${x}`
  );

  if (values.length < x) {
    throw new Error(`The table doesn't contain enough rows.`);
  }

  return [].concat(...values);
};

export const getRandomOperator = () => {
  const operators = [
    {
      code: "=",
      text: "equal"
    },
    {
      code: ">=",
      text: "greater or equal"
    },
    {
      code: ">",
      text: "greater than"
    },
    {
      code: "<=",
      text: "less or equal"
    },
    {
      code: "<",
      text: "less than"
    }
  ];

  return operators[Math.floor(Math.random() * operators.length)];
};

export const getRandomConjunction = () => {
  const conjunctions = [
    {
      code: "&&",
      text: "and"
    },
    {
      code: "||",
      text: "or"
    }
  ];

  return conjunctions[Math.floor(Math.random() * conjunctions.length)];
};

export const getRandomElement = options => {
  return options[Math.floor(Math.random() * options.length)];
};
