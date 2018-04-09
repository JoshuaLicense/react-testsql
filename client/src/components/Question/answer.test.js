import { checkAnswer, KeywordError } from "./answer";

const mockDB = {
  exec: jest.fn(() => {
    return {
      columns: [],
      values: []
    };
  }),
  prepare: jest.fn(() => {
    return {
      step: jest.fn(() => false),
      getAsObject: jest.fn(),
      free: jest.fn()
    };
  }),
};

it("fails on any missing keywords", () => {
  const question = {
    set: "Easy",
    keywords: ["COUNT", "WHERE"],
    question:
      "Display all the orders that were made on the dates: 01/04/2012, 29/10/2012 and 13/09/2012",
    answer:
      "SELECT * FROM Orders WHERE OrderDate IN('01/04/2012', '29/10/2012', '13/09/2012')"
  };

  const missingKeywordsSQL =
    "SELECT * FROM Orders WHERE OrderDate = '01/04/2012' OR OrderDate = '29/10/2012' OR OrderDate = '13/09/2012'";

  expect(() => checkAnswer(mockDB, missingKeywordsSQL, question)).toThrowError(
    KeywordError
  );
});

it("fails on keywords order", () => {
  const question = {
    set: "Easy",
    keywords: ["COUNT", "WHERE"],
    question:
      "Display the number of orders that have a freight charge above the average freight charge",
    answer:
      "SELECT COUNT(*) FROM Orders WHERE FreightCharge >= (SELECT AVG(FrieghtCharge) FROM Orders)"
  };

  const incorrectOrderingOfKeywordsSQL = "SELECT 25 WHERE 1 = COUNT(1)";

  expect(() => checkAnswer(mockDB, incorrectOrderingOfKeywordsSQL, question)).toThrowError(KeywordError);
});
