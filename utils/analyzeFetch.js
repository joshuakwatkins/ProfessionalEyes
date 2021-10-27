const { response } = require("express");


const analyzeFetch = (toClean) => {
    const urlArr = [];
    const toCleanArr = toClean.split(" ");
    toCleanArr.forEach(element => urlArr.push("%20" + element));
    const urlString = urlArr.join("");
     fetch("https://twinword-sentiment-analysis.p.rapidapi.com/analyze/?text="+urlString, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "0c86673a91msh18102740756c84dp1c7dc9jsn4a761e4a08c1",
            "x-rapidapi-host": "twinword-sentiment-analysis.p.rapidapi.com"
        }
    })
    .then(response => response.json()).then(data => {
        return data;
    })

};

module.exports = analyzeFetch;