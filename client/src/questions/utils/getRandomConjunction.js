import getRandomInt from "lodash/random";

export const conjunctions = [
  {
    code: "and",
    text: "and"
  },
  {
    code: "or",
    text: "or"
  }
];

const getRandomConjunction = () => {
  return conjunctions[getRandomInt(conjunctions.length - 1)];
};

export default getRandomConjunction;
