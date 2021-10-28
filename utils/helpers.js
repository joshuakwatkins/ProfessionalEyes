module.exports = {
  format_color: (data) => {
    let textArray = [];
    for (let i = 0; i < data.keywords.length; i++) {
        if (data.keywords[i].score >= 0.66) {
            let coloredString = `<span class='score' id='bg-darkgreen'>${data.keywords[i].word}</span>`
            textArray.push(coloredString);
        } else if (data.keywords[i].score >= 0.33 && data.keywords[i].score < 0.66) {
            let coloredString = `<span class='score' id='bg-green'>${data.keywords[i].word}</span>`
            textArray.push(coloredString);
        } else if (data.keywords[i].score >= 0 && data.keywords[i].score < 0.33) {
            let coloredString = `<span class='score' id='bg-lightgreen'>${data.keywords[i].word}</span>`
            textArray.push(coloredString);
        } else if (data.keywords[i].score >= -0.33 && data.keywords[i].score < 0) {
            let coloredString = `<span class='score' id='bg-yellow'>${data.keywords[i].word}</span>`
            textArray.push(coloredString);
        } else if (data.keywords[i].score >= -0.66 && data.keywords[i].score < -0.33) {
            let coloredString = `<span class='score' id='bg-orange'>${data.keywords[i].word}</span>`
            textArray.push(coloredString);
        } else if (data.keywords[i].score >= -1 && data.keywords[i].score < -0.66) {
            let coloredString = `<span class='score' id='bg-red'>${data.keywords[i].word}</span>`
            textArray.push(coloredString);
        }
    } return textArray;
  },
};
