const router = require("express").Router();
const analyzeFetch = require("../../utils/analyzeFetch");
const { Email, User } = require("../models");
const withAuth = require("../../utils/auth");
const format_color = require('../..utils/helpers.js')
const analyzeFetch = require('../../utils/analyzeFetch')

router.post('/cleanse', withAuth, async (req, res) => {
    try {
        const newEmail = Email.create({
        body: req.body.body,
        user_id: req.session.user_id
        })
        if (!newEmail) {
            res.status(404).json({ message: "Failed to analyze or save email."})
        } else {
            res.status(200).json(newEmail)
        }
    } catch (err) {
        res.status(500).json(err)
    }   
    const toClean = req.body.body;
    const compArr = toClean.split(" ");
    const wordAnalysis = analyzeFetch(toClean);
    const colorSpans = format_color(wordAnalysis);

    for (var i = 0; i > wordAnalysis.keywords.length; i++) {
        compArr.find(wordAnalysis.keywords[i].word)
    }

    

    



    // moved into utils/analyze.fetch
    // const urlArr = [];
    // const toCleanArr = toClean.split(" ")
    // toCleanArr.forEach(element => urlArr.push("%20" + element));
    // const urlString = urlArr.join("")
    // fetch("https://twinword-sentiment-analysis.p.rapidapi.com/analyze/?text="+urlString, {
    //     "method": "GET",
    //     "headers": {
    //         "x-rapidapi-key": "0c86673a91msh18102740756c84dp1c7dc9jsn4a761e4a08c1",
    //         "x-rapidapi-host": "twinword-sentiment-analysis.p.rapidapi.com"
    //     }
    // })
    // .then(response => response.json()).then(data => {
    //     wordValues = data.keywords
    //     coloredWords = []

    //     for (var i = 0; i < wordValues.length; i++) {

    //     }
    // })


    res.render('homepage', toClean)
})