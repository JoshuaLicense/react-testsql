import buildQuestions from "../buildQuestions";

describe("buildQuestions function", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("renders the question", async () => {
    jest.mock("../../index", () => {
      return [
        {
          build: jest.fn(() => ({
            question: "Question string",
            answer: "Answer string"
          }))
        }
      ];
    });

    const [response] = await buildQuestions(jest.fn());

    expect(response.question).toEqual("Question string");
    expect(response.answer).toEqual("Answer string");
  });

  it("encounters an error while building a question", async () => {
    jest.mock("../../index", () => ({
      default: [
        {
          build: jest.fn(() => {
            throw new Error("An error occurred while building this question.");
          })
        }
      ]
    }));
    jest.mock("../../index", () => {
      return [
        {
          build: jest.fn(() => {
            throw new Error("An error occurred while building this question.");
          })
        }
      ];
    });

    const [response] = await buildQuestions(jest.fn());

    expect(response.question).toEqual(
      "Error: An error occurred while building this question."
    );
    expect(response.error).toBeTruthy();
  });
});
