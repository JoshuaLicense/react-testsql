const buildQuestions = async database =>
  new Promise(resolve => {
    // Setup the caching.
    window.questionCache = {};

    return import("../").then(({ default: _questions }) => {
      const questions = _questions.map(questionConfig => {
        const { func } = questionConfig;

        try {
          const { question, answer } = func(database);

          return { ...questionConfig, question, answer };
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
