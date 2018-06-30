import getRandomOperator, { operators } from "../getRandomOperator";

it("returns a random operator code and textual array", () => {
  expect(operators).toContain(getRandomOperator());
});
