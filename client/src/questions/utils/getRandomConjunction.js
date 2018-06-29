import getRandomInt from "lodash/random";

const getRandomConjunction = () => {
  const conjunctions = [
    {
      code: "&&",
      text: "and"
    },
    {
      code: "||",
      text: "or"
    }
  ];

  return conjunctions[getRandomInt(conjunctions.length)];
};

export default getRandomConjunction;
