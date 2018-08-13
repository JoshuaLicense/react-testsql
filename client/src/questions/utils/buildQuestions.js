const buildQuestions = async (database, forceRebuild = false) =>
  new Promise((resolve, reject) => {
    // Check the localStorage for any cached question sets
    const cachedQuestions = localStorage.getItem("__testSQL_Questions__");

    if (cachedQuestions && !forceRebuild && false) {
      const decodedQuestions = JSON.parse(cachedQuestions);

      return resolve(decodedQuestions);
    }

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

      // Cache the built questions.
      localStorage.setItem("__testSQL_Questions__", JSON.stringify(questions));

      return resolve(questions);
    });
  });

export default buildQuestions;
