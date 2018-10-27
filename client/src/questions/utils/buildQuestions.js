const buildQuestions = async (database, availableQuestions) =>
  new Promise(resolve => {
    // Setup the caching.
    window.questionCache = {};

    return import("../index").then(({ default: allQuestions }) => {
      const questions = allQuestions.reduce((acc, cur, i) => {
        // If the current index is included in the array.
        if (availableQuestions && availableQuestions.indexOf(i) === -1) {
          return acc;
        }

        const { build } = cur;

        try {
          const { question, answer } = build(database);

          acc.push({ index: i, ...cur, question, answer });

          return acc;
        } catch (Error) {
          // Mark as error question, tried twice can't generate this question.
          acc.push({
            ...cur,
            question: `Error: ${Error.message}`,
            answer: null,
            error: true
          });

          return acc;
        }
      }, []);

      return resolve(questions);
    });
  });

export default buildQuestions;
