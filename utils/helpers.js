module.exports = {
  format_color: (email) => {
    let textArray = [];
    for (let i = 0; i < email.keywords.length; i++) {
      let selectedWord = email.keywords.word[i];
      selectedWord.wrap("<span class='score'></span>");
      
      textArray.push(selectedWord[i])

      if (email.keywords.score >= 0.75) {

      }
      else if ()
      switch (email.keywords) {
        case email.keywords.score >= 0.66:
          break;
        case email.keywords.score >= 0.33 && email.keywords.score < 0.66:
          break;
        case email.keywords.score >= 0 && email.keywords.score < 0.33:
          break;
        case email.keywords.score >= -0.33 && email.keywords.score < 0:
          break;
        case email.keywords.score >= -0.66 && email.keywords.score < -0.33:
          break;
        case email.keywords.score >= -1 && email.keywords.score < -0.66:
          break;
      }
    }
    return textArray;
  },
  format_profanity: (email) => {},
};

// need array with words with span around it
