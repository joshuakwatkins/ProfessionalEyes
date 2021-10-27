module.exports = {
  format_color: (email) => {
    let textArray = [];
    for (let i = 0; i < email.keywords.length; i++) {
      let analyzedWords = email.keywords[i];

      switch (analyzedWords) {
        case analyzedWords.score >= 0.66:
          let colorizedWord = analyzedWords.word.wrap(
            "<span class='score' id='bg-darkgreen'></span>"
          );
          textArray.push(colorizedWord);
          break;
        case email.keywords.score >= 0.33 && email.keywords.score < 0.66:
          let colorizedWord = analyzedWords.word.wrap(
            "<span class='score' id='bg-green'></span>"
          );
          textArray.push(colorizedWord);
          break;
        case email.keywords.score >= 0 && email.keywords.score < 0.33:
          let colorizedWord = analyzedWords.word.wrap(
            "<span class='score' id='bg-lightgreen'></span>"
          );
          textArray.push(colorizedWord);
          break;
        case email.keywords.score >= -0.33 && email.keywords.score < 0:
          let colorizedWord = analyzedWords.word.wrap(
            "<span class='score' id='bg-yellow'></span>"
          );
          textArray.push(colorizedWord);
          break;
        case email.keywords.score >= -0.66 && email.keywords.score < -0.33:
          let colorizedWord = analyzedWords.word.wrap(
            "<span class='score' id='bg-orange'></span>"
          );
          textArray.push(colorizedWord);
          break;
        case email.keywords.score >= -1 && email.keywords.score < -0.66:
          let colorizedWord = analyzedWords.word.wrap(
            "<span class='score' id='bg-red'></span>"
          );
          textArray.push(colorizedWord);
          break;
      }
    }
    return textArray;
  },
  format_profanity: (email) => {
    //hello
  },
};
