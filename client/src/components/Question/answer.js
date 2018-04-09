export class KeywordError extends Error {}

const checkAnswer = (db, sql, question) => {
  console.log(sql, question);
  // Check to make sure syntax includes certain keywords, if set
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
        throw new KeywordError(
          `Looking for the incursion of the keyword: ${
            keywords[i]
          }, but not found in the correct position!`
        );
      }
    }
  }

  console.log(db.exec(sql))
  console.log(db.exec(question.answer))

  // set the blank arrays
  const modelResults = [];
  const userResults = [];

  // prepare both queries
  var stmt = db.prepare(sql);
  var answerStmt = db.prepare(question.answer);

  // run the statements in steps to loop each row
  while (answerStmt.step()) modelResults.push(answerStmt.getAsObject());
  while (stmt.step()) userResults.push(stmt.getAsObject());

  console.log(modelResults)
  console.log(userResults)

  // free the statements to prevent memory leaks
  stmt.free();
  answerStmt.free();

  // check both result objects are of equal length
  if (modelResults.length !== userResults.length || !userResults.length) {
    return (
      "Expected a total of " +
      modelResults.length +
      " row(s) to be returned" +
      ", instead got " +
      userResults.length +
      "!"
    );
  }

  // extract the column names via the object keys
  var userColumns = Object.keys(userResults[0]);
  var modelColumns = Object.keys(modelResults[0]);

  // check if the columns selected is the same LENGTH as the model answer
  if (modelColumns.length != userColumns.length) {
    return (
      "Expected only the following column(s) to be selected: " +
      modelColumns.join(", ")
    );
  }

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
