let negSentiment = [];
const getNegWords = (data) => {
  for (var i = 0; i < data.keywords.length; i++) {
    if (data.keywords[i].score <= 0) {
      negSentiment.push(data.keywords[i].word);
    }
  }
  return negSentiment;
}
module.exports = getNegWords;
