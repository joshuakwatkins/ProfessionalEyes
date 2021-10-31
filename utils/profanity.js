const { response } = require("express");
const analyzeFetch = require('./analyzeFetch')
const fetch = require("node-fetch");
const profaneArray = [];
const profanityFetch = async (toClean) => {
    const urlArr = [];
    const toCleanArr = toClean.split(" ");

    var thing_to_return = null;

    toCleanArr.forEach((element) => urlArr.push("%20" + element));
    const urlString = urlArr.join("");
    const analysis = await fetch("https://community-purgomalum.p.rapidapi.com/json?text=" + urlString, {
            method: "GET",
            headers: {
                "x-rapidapi-key": "0c86673a91msh18102740756c84dp1c7dc9jsn4a761e4a08c1",
                "x-rapidapi-host": "community-purgomalum.p.rapidapi.com",
            },
        })
        .then((response) => response.json())
        .then((data) => {
            thing_to_return = data;
            console.log(data);


            return data;
        });

        console.log("******************************** DO IT");
    console.log(analysis);

    return analysis;
};

module.exports = profanityFetch;