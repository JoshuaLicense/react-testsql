import getRandomConjunction, { conjunctions } from "../getRandomConjunction";

it("returns a random operator code and textual array", () => {
  expect(conjunctions).toContain(getRandomConjunction());
});
