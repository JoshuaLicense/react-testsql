import getRandomInt from "lodash/random";

export const operators = [
  {
    code: "=",
    text: "equal"
  },
  {
    code: ">=",
    text: "greater or equal"
  },
  {
    code: ">",
    text: "greater than"
  },
  {
    code: "<=",
    text: "less or equal"
  },
  {
    code: "<",
    text: "less than"
  }
];

export const getRandomOperator = () => {
  return operators[getRandomInt(operators.length - 1)];
};

export default getRandomOperator;
