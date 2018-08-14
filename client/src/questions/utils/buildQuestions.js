const buildQuestions = async database =>
  new Promise((resolve, reject) => {
    return import("../").then(({ default: _questions }) => {
      const questions = _questions.map(questionConfig => {
        const { func } = questionConfig;

        // Try running the question callable
        try {
          // Have two attempts at generating a question.
          try {
            const { question, answer } = func(database);

            return { ...questionConfig, question, answer };
          } catch (Error) {
            const { question, answer } = func(database);

            return { ...questionConfig, question, answer };
          }
        } catch (Error) {
          // Mark as error question, tried twice can't generate this question.
          return {
            ...questionConfig,
            question: `Error: ${Error.message}`,
            answer: null,
            error: true
          };
        }
      });

      return resolve(questions);
    });
  });

export default buildQuestions;
