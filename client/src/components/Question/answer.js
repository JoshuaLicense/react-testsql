export class IncorrectAnswer extends Error {}

const normalize = string => {
  return string.toLowerCase().replace(/[^\w]/g, "");
};

const checkAnswer = (db, sql, question) => {
  // 1. Check to make sure syntax includes certain keywords, if set
  if (question.keywords) {
    const keywords = question.keywords;
    // Change the sql to uppercase, String.includes is case sensitive
    const sqlUppercase = sql.toUpperCase();

    // Make sure all the keywords exist in the sql query
    let lastIndex = -1;

    for (let i = 0; i < keywords.length; i++) {
      // Search for the keyword, must come after the previous keyword
      lastIndex = sqlUppercase.indexOf(
        keywords[i].toUpperCase(),
        lastIndex + 1
      );

      // If the keyword was not found
      if (lastIndex === -1) {
        throw new IncorrectAnswer(
          `Looking for the incursion of the keyword: ${
            keywords[i]
          }, but not found or found in the wrong position!`
        );
      }
    }
  }

  const userResults = db.exec(sql);
  const modelResults = db.exec(question.answer);

  if (!userResults.length && modelResults.length) {
    throw new IncorrectAnswer(`No rows returned!`);
  }

  const [{ columns: userColumns, values: userValues }] = userResults;
  const [{ columns: modelColumns, values: modelValues }] = modelResults;

  // 2. Check the same amount of columns exists in both the submitted query and the model query
  if (modelColumns.length !== userColumns.length) {
    throw new IncorrectAnswer(
      `Expected only the following column(s) to be selected: ${modelColumns.join(
        ", "
      )}!`
    );
  }

  // 3. Check both result sets are of equal length
  if (modelValues.length !== userValues.length) {
    throw new IncorrectAnswer(
      `Expected a total of ${
        modelValues.length
      } row(s) to be returned, instead got ${userValues.length}!`
    );
  }

  const normalizedUserColumns = userColumns.map(column => normalize(column));
  const normalizedModelColumns = modelColumns.map(column => normalize(column));

  normalizedUserColumns.forEach((column, userColumnIndex) => {
    const modelColumnIndex = normalizedModelColumns.indexOf(column);

    // 4. Does the model column appear in the user selected columns
    if (modelColumnIndex === -1) {
      throw new IncorrectAnswer(
        `Expected only the following column(s) to be selected: ${modelColumns.join(
          ", "
        )}!`
      );
    }

    const userColumnValues = userValues.map(result => result[userColumnIndex]);
    const modelColumnValues = modelValues.map(
      result => result[modelColumnIndex]
    );

    // 5. Ensure every value appear in both set of values
    modelColumnValues.forEach(value => {
      // Check if this model value exists in the users result set
      const foundIndex = userColumnValues.indexOf(value);

      if (foundIndex === -1) {
        throw new IncorrectAnswer(
          `The column value ${value} was not found in the column ${
            modelColumns[modelColumnIndex]
          }!`
        );
      }

      // So it exists so remove it from the userColumnValues
      userColumnValues.splice(foundIndex, 1);
    });
  });

  // if the code executed to this point, the solution is valid
  return true;
};

export default checkAnswer;
