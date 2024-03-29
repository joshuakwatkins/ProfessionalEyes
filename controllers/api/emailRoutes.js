const router = require("express").Router();
const analyzeFetch = require("../../utils/analyzeFetch");
const { Email, User } = require("../../models");
const withAuth = require("../../utils/auth");
// const { format_color } = require("../../utils/helpers");
const profanityFetch = require("../../utils/profanity");
const getNegWords = require("../../utils/negativeWords");
// const indexOfAll = require("../../utils/indexArr");
// const fetch = require("node-fetch");
const sequelize = require("sequelize");

router.put("/emails", withAuth, async (req, res) => {
  try {
    console.log(
      "\n\n trying to update \n\n",
      req.body.coloredText,
      req.session
    );
    const cleanseEdit = await User.update(
      {
        cleansed_input: req.body.coloredText,
      },
      {
        where: {
          id: req.session.user_id,
        },
      }
    );
    let coloredText = req.body.coloredText;
    // res.redirect("homepage2", coloredText);
    if (!cleanseEdit) {
      res.status(404).json({ message: "Err: something else broke" });
    }
    console.log(cleanseEdit);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  console.log(req.session);
  var newEmail = null;

  try {
    newEmail = Email.create({
      name: req.body.name,
      body: req.body.emailInput,
      user_id: req.session.user_id,
    });

    console.log(newEmail);

    if (!newEmail) {
      res.status(500).json({ message: "Failed to analyze or save your text." });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
    return;
  }
  const toClean = req.body.emailInput;
  //   console.log(toClean);

  console.log(
    "TO CLEAN ---------------------------------------------------------------"
  );
  console.log(toClean);

  var my_profanity = await profanityFetch(toClean);

  // res.render("homepage2");
  var analysis = await analyzeFetch(my_profanity.result);

  const cleanseEdit = await User.update(
    {
      cleansed_input: analysis,
    },
    {
      where: {
        id: req.session.user_id,
      },
    }
  );

  res.status(200).json(analysis);

  //   const wordAnalysis = await analyzeFetch(toClean);
  //   const colorSpans = await format_color(wordAnalysis);
  //   const negWords = await getNegWords(wordAnalysis);

  //   for (var i = 0; i > compArr.length; i++) {
  //     if (compArr[i].includes("#")) {
  //       let curse = compArr[i];
  //       compArr.splice(i, 1, `<span class='score' id='bg-red'>${curse}</span>`);
  //     }
  //   }

  //   for (var i = 0; i > wordAnalysis.keywords.length; i++) {
  //     // compArr.find(wordAnalysis.keywords[i].word)
  //     let indexArray = indexOfAll(compArr, wordAnalysis.keywords[i].word);
  //     for (var j = 0; j > indexArray.length; j++) {
  //       compArr.splice(indexArray[j], 1, colorSpans[i]);
  //     }
  //   }

  //   const profaneArray = compArr.reduce(indexArr, value, i);
  //   <span class='score' id='bg-red'>${data.keywords[i].word}</span>
  //   const coloredText = compArr.join(" ");
  //   debugger;
  //   console.log(coloredText);

  // moved into utils/analyze.fetch
  //   const urlArr = [];
  //   const toCleanArr = toClean.split(" ");
  //   toCleanArr.forEach((element) => urlArr.push("%20" + element));
  //   const urlString = urlArr.join("");
  //   fetch(
  //     "https://twinword-sentiment-analysis.p.rapidapi.com/analyze/?text=" +
  //       urlString,
  //     {
  //       method: "GET",
  //       headers: {
  //         "x-rapidapi-key": "0c86673a91msh18102740756c84dp1c7dc9jsn4a761e4a08c1",
  //         "x-rapidapi-host": "twinword-sentiment-analysis.p.rapidapi.com",
  //       },
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       function getNegWords(data) {
  //         for (var i = 0; i < data.keywords.length; i++) {
  //           if (data.keywords[i].score <= 0) {
  //             negWords.push(data.keywords[i].word);
  //           }
  //         }
  //       }
  //       wordValues = data.keywords;

  //       for (var i = 0; i < wordValues.length; i++) {}
  //     });

  const negFetchURL = [];
  // Set the API keys

  const thesKey = "0d6cde76-d8a1-48cd-9a08-41859be0f16f";

  // Make the thesaurus fetch call.

  const thesaurusCall = (element) => {
    fetch(element)
      .then((response) => response.json())
      .then((data) => switchWords(data));
  };
  //   negWords.forEach((element) =>
  //     negFetchURL.push(
  //       "https://www.dictionaryapi.com/api/v3/references/thesaurus/json/" +
  //         element +
  //         "?key=" +
  //         thesKey
  //     )
  //   );
  negFetchURL.forEach((element) => thesaurusCall(element));

  // Setting up arrays for two different spliced text arrays and empty arrays for the synonyms and antonyms.

  const toCleanSynonyms = toClean.split(" ");
  const toCleanAntonynms = toClean.split(" ");
  const cleanSynonyms = [];
  const cleanAntonyms = [];

  const switchWords = (data) => {
    if (data[0].meta.syns.length > 0 && data[0].meta.ants.length > 0) {
      const randomArray = Math.floor(Math.random() * data[0].meta.syns.length);
      const randomWord = Math.floor(
        Math.random() * data[0].meta.syns[randomArray].length
      );
      const randomArrayA = Math.floor(Math.random() * data[0].meta.ants.length);
      const randomWordA = Math.floor(
        Math.random() * data[0].meta.ants[randomArrayA].length
      );

      const switchingWords = {
        hwi: data[0].hwi.hw,
        synonym: data[0].meta.syns[randomArray][randomWord],
        antonym: data[0].meta.ants[randomArrayA][randomWordA],
      };

      const replaceTheText = (element) => {
        if (element === switchingWords.hwi) {
          const indexNum = toCleanSynonyms.indexOf(element);
          toCleanSynonyms.splice(indexNum, 1, switchingWords.synonym);
        }
      };
      toCleanSynonyms.forEach((element) => replaceTheText(element));

      const replaceTheTextA = (element) => {
        if (element === switchingWords.hwi) {
          const indexNum = toCleanAntonynms.indexOf(element);
          toCleanAntonynms.splice(indexNum, 1, switchingWords.antonym);
        }
      };
      toCleanAntonynms.forEach((element) => replaceTheTextA(element));
    } else if (data[0].meta.syns.length > 0 && data[0].meta.ants.length <= 0) {
      const randomArray = Math.floor(Math.random() * data[0].meta.syns.length);
      const randomWord = Math.floor(
        Math.random() * data[0].meta.syns[randomArray].length
      );

      const switchingWords = {
        hwi: data[0].hwi.hw,
        synonym: data[0].meta.syns[randomArray][randomWord],
        antonym: "There are no antonyms for this word",
      };
      const replaceTheText = (element) => {
        if (element === switchingWords.hwi) {
          const indexNum = toCleanSynonyms.indexOf(element);
          toCleanSynonyms.splice(indexNum, 1, switchingWords.synonym);
        }
      };
      toCleanSynonyms.forEach((element) => replaceTheText(element));

      const replaceTheTextA = (element) => {
        if (element === switchingWords.hwi) {
          const indexNum = toCleanAntonynms.indexOf(element);
          toCleanAntonynms.splice(indexNum, 1, switchingWords.antonym);
        }
      };
      toCleanAntonynms.forEach((element) => replaceTheTextA(element));
    } else if (data[0].meta.syns.length <= 0 && data[0].meta.ants.length > 0) {
      const randomArrayA = Math.floor(Math.random() * data[0].meta.ants.length);
      const randomWordA = Math.floor(
        Math.random() * data[0].meta.ants[randomArrayA].length
      );

      const switchingWords = {
        hwi: data[0].hwi.hw,
        synonym: "There are no synonyms for this word.",
        antonym: data[0].meta.ants[randomArrayA][randomWordA],
      };
      const replaceTheText = (element) => {
        if (element === switchingWords.hwi) {
          const indexNum = toCleanSynonyms.indexOf(element);
          toCleanSynonyms.splice(indexNum, 1, switchingWords.synonym);
        }
      };
      toCleanSynonyms.forEach((element) => replaceTheText(element));

      const replaceTheTextA = (element) => {
        if (element === switchingWords.hwi) {
          const indexNum = toCleanAntonynms.indexOf(element);
          toCleanAntonynms.splice(indexNum, 1, switchingWords.antonym);
        }
      };
      toCleanAntonynms.forEach((element) => replaceTheTextA(element));
    } else if (data[0].meta.syns.length <= 0 && data[0].meta.ants.length <= 0) {
      console.log("There are no synonyms or antonyms.");
    }

    cleanSynonyms.push = toCleanSynonyms.join(" ");
    cleanAntonyms.push = toCleanAntonynms.join(" ");
  };

  console.log(cleanSynonyms);
  console.log(cleanAntonyms);
});

module.exports = router;
