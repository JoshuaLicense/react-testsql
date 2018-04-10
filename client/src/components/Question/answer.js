export class IncorrectAnswer extends Error {}

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
      lastIndex = sqlUppercase.indexOf(keywords[i], lastIndex + 1);

      // If the keyword was not found
      if (lastIndex === -1) {
        //throw new IncorrectAnswer(`Looking for the incursion of the keyword: ${keywords[i]}, but not found in the correct position!`);
      }
    }
  }

  const modelResults = [];
  const userResults = [];

  const stmt = db.prepare(sql);
  const answerStmt = db.prepare(question.answer);

  while (answerStmt.step()) modelResults.push(answerStmt.getAsObject());
  while (stmt.step()) userResults.push(stmt.getAsObject());

  stmt.free();
  answerStmt.free();

  // 2. Check both objects are of equal length
  if (!userResults.length || modelResults.length !== userResults.length) {
    //throw new IncorrectAnswer(`Expected a total of ${modelResults.length} row(s) to be returned, instead got ${userResults.length}!`);
  }

  // Extract the column names from each object
  const userColumns = Object.keys(userResults[0]);
  const modelColumns = Object.keys(modelResults[0]);

  // 3. Check the same amount of columns exists in both the submitted query and the model query
  if (modelColumns.length !== userColumns.length) {
    //throw new IncorrectAnswer(`Expected only the following column(s) to be selected: ${modelColumns.join(", ")}`);
  }

  modelColumns.forEach((column) => {
    // 4. Does the model column appear in the user selected columns
    if(!userColumns[column]) {
      //throw new IncorrectAnswer(`Expected only the following column(s) to be selected: ${modelColumns.join(", ")}`)
    }

    // Retrieve an array from the model result object for this column only
    const modelColumnValues = modelResults.map(object => object[column]);

    // Retrieve an array from the model result object for this column only
    const userColumnValues = userResults.map(object => object[column]);

    // 5. Ensure every value appear in both set of values
    const leftoverValues = modelColumnValues.reduce((prev, value) => {
      console.log(prev, value);
      return ['a'];
    }, [])
    console.log(modelColumnValues, userColumnValues);

  });

  console.log(userColumns);

  console.log(modelColumns);

  console.log(userResults);

  console.log(modelResults);

  // loop through each column
  for (var i = 0; i < userColumns.length; i++) {
    // construct a variable containing the row values contained in this column
    var answerObj = modelResults
      .map(item => {
        return item[
          userColumns[i]
            // remove any unwanted punctuation
            .replace(/[^A-Za-z()*]+/g, "")
            // and capitalize aggregate functions
            .replace(/(COUNT|SUM|AVG|MIN|TOTAL|MAX|SUM)\(/gi, l =>
              l.toUpperCase()
            )
        ];
      })
      .filter(function(x) {
        return typeof x !== "undefined";
      });
    // filter out the undefined values, indication of mis-matched column names

    // do the same with the user's answer
    const userObj = userResults.map(item => item[userColumns[i]]);

    // checks that the columns selected are expected
    if (answerObj.length !== userObj.length) {
      return (
        "Expected only the following column(s) to be selected: " +
        modelColumns.join(", ")
      );
    }

    let lastItem;
    // checks every value in the users answer is included in the model answer
    const isPresent = answerObj.every(item => {
      lastItem = item;
      return userObj.indexOf(item) !== -1;
    });

    // if one column returns false, stop checking and return feedback
    if (!isPresent) {
      return (
        'The row containing "' +
        lastItem +
        '" in the column ' +
        userColumns[i] +
        " wasn't found within your result set"
      );
    }
  }

  // if the code executed to this point, the solution is valid
  return true;
};

export default checkAnswer;
