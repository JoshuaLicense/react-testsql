import checkAnswer from "../answer";

const mockDB = {
  exec: jest.fn()
};

const mockQuestion = {
  answer: ""
};

const mockAnswer = [
  {
    columns: ["ID", "FirstName", "LastName", "Phone"],
    values: [[2, "Jane", "Doe", "021312"], [3, "John", "Doe", "123233"]]
  }
];

describe("test checkAnswer passes", () => {
  it("fails on missing keywords", () => {
    const mockKeywordQuestion = {
      ...mockQuestion,
      keywords: ["ThE", "QuiCK", "RED"]
    };

    const input = "The quick brown fox jumps over the lazy dog";

    expect(() => checkAnswer(mockDB, input, mockKeywordQuestion)).toThrowError(
      /^Looking for the incursion of the keyword: RED, but not found or found in the wrong position!$/
    );
  });

  it("fails on keyword in wrong order", () => {
    const mockKeywordQuestion = {
      ...mockQuestion,
      keywords: ["ThE", "BrowN", "QuiCK"]
    };

    const input = "The quick brown fox jumps over the lazy dog";

    expect(() => checkAnswer(mockDB, input, mockKeywordQuestion)).toThrowError(
      /^Looking for the incursion of the keyword: QuiCK, but not found or found in the wrong position!$/
    );
  });

  it("fails on lack of results returned if the model answer doesn't", () => {
    mockDB.exec.mockReturnValueOnce([]);
    // The model result, returns an example dataset.
    mockDB.exec.mockReturnValueOnce([
      {
        columns: ["ID", "FirstName", "LastName"],
        values: [
          [1, "Joe", "Bloggs"],
          [2, "Jane", "Doe"],
          [3, "John", "Doe"],
          [4, "Josh", "Bloggs"]
        ]
      }
    ]);

    expect(() => checkAnswer(mockDB, "", mockQuestion)).toThrowError(
      /^No rows returned!$/
    );
  });

  it("fails on incorrect column number", () => {
    mockDB.exec.mockReturnValueOnce([
      {
        columns: ["ID", "FirstName", "LastName"],
        values: [
          [1, "Joe", "Bloggs"],
          [2, "Jane", "Doe"],
          [3, "John", "Doe"],
          [4, "Josh", "Bloggs"]
        ]
      }
    ]);

    mockDB.exec.mockReturnValueOnce(mockAnswer);

    expect(() => checkAnswer(mockDB, "", mockQuestion)).toThrowError(
      /^Expected only the following column\(s\) to be selected: ID, FirstName, LastName, Phone!$/
    );
  });

  it("fails on incorrect result number", () => {
    mockDB.exec.mockReturnValueOnce([
      {
        columns: ["ID", "FirstName", "LastName", "Phone"],
        values: [
          [1, "Joe", "Bloggs"],
          [2, "Jane", "Doe", "021312"],
          [3, "John", "Doe", "123233"]
        ]
      }
    ]);

    mockDB.exec.mockReturnValueOnce(mockAnswer);

    expect(() => checkAnswer(mockDB, "", mockQuestion)).toThrowError(
      /^Expected a total of 2 row\(s\) to be returned, instead got 3!$/
    );
  });

  it("fails on wrong column selection", () => {
    mockDB.exec.mockReturnValueOnce([
      {
        columns: ["ID", "FirstName", "LastName", "City"],
        values: [[2, "Jane", "Doe", "Manchester"], [3, "John", "Doe", "Leeds"]]
      }
    ]);

    mockDB.exec.mockReturnValueOnce(mockAnswer);

    expect(() => checkAnswer(mockDB, "", mockQuestion)).toThrowError(
      /^Expected only the following column\(s\) to be selected: ID, FirstName, LastName, Phone!$/
    );
  });

  it("fails on non-exact match", () => {
    mockDB.exec.mockReturnValueOnce([
      {
        columns: ["ID", "FirstName", "LastName", "Phone"],
        values: [[1, "Joe", "Bloggs"], [3, "John", "Doe", "123233"]]
      }
    ]);

    mockDB.exec.mockReturnValueOnce(mockAnswer);

    expect(() => checkAnswer(mockDB, "", mockQuestion)).toThrowError(
      /^The column value 2 was not found in the column ID!$/
    );

    mockDB.exec.mockReturnValueOnce([
      {
        columns: ["ID", "FirStName", "LastName", "PhoNE"],
        values: [[2, "Jane", "Doe", "0213120"], [3, "John", "Doe", "123233"]]
      }
    ]);

    mockDB.exec.mockReturnValueOnce(mockAnswer);

    expect(() => checkAnswer(mockDB, "", mockQuestion)).toThrowError(
      /^The column value 021312 was not found in the column Phone!$/
    );
  });

  it("marked as correct answer", () => {
    mockDB.exec.mockReturnValueOnce([
      {
        columns: ["id", "FiRStName", "LastNAme", "PhOne"],
        values: [[2, "Jane", "Doe", "021312"], [3, "John", "Doe", "123233"]]
      }
    ]);

    mockDB.exec.mockReturnValueOnce(mockAnswer);

    expect(checkAnswer(mockDB, "", mockQuestion)).toBe(true);
  });
});
