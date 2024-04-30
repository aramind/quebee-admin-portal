export const getKeyOfCorrectAnswer = (obj) => {
  for (const key in obj) {
    if (key !== "correctAnswer" && obj[key] === obj?.correctAnswer) {
      return key;
    }
  }
};
