import getRandomInt from "lodash/random";

export const conjunctions = [
  {
    code: "&&",
    text: "and"
  },
  {
    code: "||",
    text: "or"
  }
];

const getRandomConjunction = () => {
  return conjunctions[getRandomInt(conjunctions.length - 1)];
};

export default getRandomConjunction;
