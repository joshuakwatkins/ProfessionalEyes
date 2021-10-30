const { response } = require("express");
const fetch = require("node-fetch");
const indexOfAll = require("./indexArr");
const analyzeFetch = async (toSent) => {
  let testArr = [];
  const urlArr = [];
  const toSentArr = toSent.split(" ");
  toSentArr.forEach((element) => urlArr.push("%20" + element));
  const urlString = urlArr.join("");
  console.log(toSentArr);
  await fetch(
    "https://twinword-sentiment-analysis.p.rapidapi.com/analyze/?text=" +
      urlString,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "0c86673a91msh18102740756c84dp1c7dc9jsn4a761e4a08c1",
        "x-rapidapi-host": "twinword-sentiment-analysis.p.rapidapi.com",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("this is the data from the sent fetch", data);
      format_color = (data) => {
        let textArray = [];
        for (let i = 0; i < data.keywords.length; i++) {
          if (data.keywords[i].score >= 0.66) {
            let coloredString = `<span class='score' id='bg-darkgreen'>${data.keywords[i].word}</span>`;
            textArray.push(coloredString);
          } else if (
            data.keywords[i].score >= 0.33 &&
            data.keywords[i].score < 0.66
          ) {
            let coloredString = `<span class='score' id='bg-green'>${data.keywords[i].word}</span>`;
            textArray.push(coloredString);
          } else if (
            data.keywords[i].score >= 0 &&
            data.keywords[i].score < 0.33
          ) {
            let coloredString = `<span class='score' id='bg-lightgreen'>${data.keywords[i].word}</span>`;
            textArray.push(coloredString);
          } else if (
            data.keywords[i].score >= -0.33 &&
            data.keywords[i].score < 0
          ) {
            let coloredString = `<span class='score' id='bg-yellow'>${data.keywords[i].word}</span>`;
            textArray.push(coloredString);
          } else if (
            data.keywords[i].score >= -0.66 &&
            data.keywords[i].score < -0.33
          ) {
            let coloredString = `<span class='score' id='bg-orange'>${data.keywords[i].word}</span>`;
            textArray.push(coloredString);
          } else if (
            data.keywords[i].score >= -1 &&
            data.keywords[i].score < -0.66
          ) {
            let coloredString = `<span class='score' id='bg-red'>${data.keywords[i].word}</span>`;
            textArray.push(coloredString);
          }
        }
        return textArray;
      };
      let colorizedArr = format_color(data);
      //   console.log(toSentArr);
      let compArr = toSent.split(" ");
      console.log(
        "this is directly above the for loop\n",
        compArr.length,
        "\n",
        compArr
      );
      console.log(
        "this is directly above the for loop",
        compArr[0].includes("*")
      );
      compArr.forEach((element, j) => {
        if (element.includes("*")) {
          let curse = element;
          compArr.splice(
            j,
            1,
            `<span class='score' id='bg-red'>${curse}</span>`
          );
        }
      });
      console.log("this is just after the foreach\n", compArr);
      //   for (let j = 0; j > compArr.length; j++) {
      //     console.log("is this working" + j);
      //     if (compArr[j].includes("*")) {
      //       let curse = compArr[j];
      //       compArr.splice(
      //         i,
      //         1,
      //         `<span class='score' id='bg-red'>${curse}</span>`
      //       );
      //   console.log(compArr);
      // }
      //   }

      for (var i = 0; i < data.keywords.length; i++) {
        let indexArray = indexOfAll(compArr, data.keywords[i].word);
        console.log(indexArray);
        for (var j = 0; j < indexArray.length; j++) {
          compArr.splice(indexArray[j], 1, colorizedArr[i]);
        }
      }
      console.log("This is just after the second for loop\n", compArr);
      let coloredText = compArr.join(" ");
      console.log(coloredText);
      console.log(data);
      console.log(format_color(data));
      console.log(toSentArr);

      fetch("http://localhost:3001/api/emails/emails", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coloredText,
        }),
      })
        .then((data) => {
          //   console.log(data);
        })
        .catch((err) => console.log(err));
      //   console.log(testArr);
    });
};

module.exports = analyzeFetch;
