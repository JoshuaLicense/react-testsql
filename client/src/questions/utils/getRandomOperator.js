export const getRandomOperator = () => {
  const operators = [
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

  return operators[getRandomInt(operators.length)];
};

export default getRandomOperator;
