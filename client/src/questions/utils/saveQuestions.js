const saveQuestions = allQuestions =>
  localStorage.setItem("__testSQL_Questions__", JSON.stringify(allQuestions));

export default saveQuestions;
