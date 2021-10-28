const textSyntaxArray = [];
const text = "Hello there mean head, I can't stand you and hope you trip and fall to your death. Fuck Shit Dick Bitch YES WEEEEE WOOP";
const textArray = text.split(" ");

textArray.forEach((element) => textSyntaxArray.push("%20" + element));
const partialJoin = textSyntaxArray.join("");

console.log(partialJoin);

// Fetch to retrieve a sentiment value for negative and positive words.

// const negSentiment = [];

// const getSentiment = (data) => {

// fetch("https://twinword-sentiment-analysis.p.rapidapi.com/analyze/?text="+partialJoin, {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "0c86673a91msh18102740756c84dp1c7dc9jsn4a761e4a08c1",
// 		"x-rapidapi-host": "twinword-sentiment-analysis.p.rapidapi.com"
// 	}
// })
// .then(response => response.json())
// .then(data => getNegWords(data))

// function getNegWords (data) { 
// for (var i=0; i<data.keywords.length; i++) {
//     if (data.keywords[i].score <= 0) {
//         negSentiment.push(data.keywords[i].word)
// }}};
// }
// getSentiment()
// console.log(negSentiment)
// Fetch to put astrics over any profane words.

// fetch("https://community-purgomalum.p.rapidapi.com/json?text="+partialJoin, {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "0c86673a91msh18102740756c84dp1c7dc9jsn4a761e4a08c1",
// 		"x-rapidapi-host": "community-purgomalum.p.rapidapi.com"
// 	}
// })
// .then(response => response.json())
// .then(data => console.log(data))

// Fetch to return a true or false value if the text contains any profanity or not.

// fetch("https://community-purgomalum.p.rapidapi.com/containsprofanity?text="+partialJoin, {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "0c86673a91msh18102740756c84dp1c7dc9jsn4a761e4a08c1",
// 		"x-rapidapi-host": "community-purgomalum.p.rapidapi.com"
// 	}
// })
// .then(response => response.json())
// .then(data => console.log(data))

// Function to detect if any words are in all caps.

// const atLeastOneCap = [];

// const isUpper = (str) => {
//     (/[A-Z]/.test(str))
//     if (/[A-Z]/.test(str)=== true) {
//         atLeastOneCap.push(str)
//         console.log(atLeastOneCap) 
//     }
// };

// textArray.forEach(element => isUpper(element));

// // Filter through the words with CAPS to pick out any with more than one capital letter.

// const moreThanOneCap = [];

// const isAllUpper = (str) => {
//     var howMany = (str.match(/[A-Z]/g) || []).length
//     if (howMany >= 2) {
//         moreThanOneCap.push(str)
//     }
// }

// atLeastOneCap.forEach(element => isAllUpper(element));

// console.log(moreThanOneCap)
// // Asking user if they want to change to lower case.

// const theCheckboxes = document.querySelector("#upperToLowerCase");

//Commented out for now so I can work with Griffin to push somewhere with bootstrap.

// const upperCaseToLowerCase = () => {
//     for (var i=0; i<moreThanOneCap.length; i++) {
//         var inputCheckbox = document.createElement("input")
//         inputCheckbox.setAttribute("type", "checkbox")
//         inputCheckbox.setAttribute("name", "accept")
//         inputCheckbox.setAttribute("id", "accept")
//         inputCheckbox.setAttribute("value", "yes")
//         inputCheckbox.setAttribute("style", "width:250px;")

//         var checkboxLabel = document.createElement("label")
//         checkboxLabel.setAttribute("for", "accept")
//         // checkboxLabel.innerHTML = moreThanOneCap[i].toString();
        
//         theCheckboxes.append(inputCheckbox);
//         inputCheckbox.append(checkboxLabel)
//     }
    
    
// }        
// if (moreThanOneCap.length >= 1) {
//     upperCaseToLowerCase();
// }


// Will need to show what words are true vs false for uppercase
// Will need to pick out words that are caps only if greater than one letter (to ignore "I")


// To supply the user with a positive twist on their email.

// Require the library to run sentence analysis.

// var WordPOS = require('wordpos'),
// wordpos = new WordPOS();

// wordpos.getAdjectives(text, function(result){
//     console.log(result);
// });

// wordpos.getNouns(text, function(result){
//     console.log(result);
// });

// wordpos.getVerbs(text, function(result){
//     console.log(result);
// });

// wordpos.getAdverbs(text, function(result){
//     console.log(result);
// });

// Testing negative word for synonym fetches.

const fakeText = ["I think you're bad and I want to hit you.  I hope you fail and die."]

const negTest = ["bad", "hit", "die", "fail"];
const negFetchURL = [];
// Set the API keys

const thesKey = "0d6cde76-d8a1-48cd-9a08-41859be0f16f";
const dictKey = "2868780d-1fe2-4f59-b567-ecb155bae7d1";

// Make the thesaurus fetch call.

const thesaurusCall = (element) => {
fetch(element)
.then(response => response.json())
.then(data => switchWords(data))
}
negTest.forEach((element) => negFetchURL.push("https://www.dictionaryapi.com/api/v3/references/thesaurus/json/" + element +"?key=" + thesKey));
negFetchURL.forEach((element) => thesaurusCall(element))



const wordsWeWillSwitch = [];
const switchWords = (data) => {
    const randomArray = Math.floor(Math.random()*data[0].meta.syns.length);
    const randomWord = Math.floor(Math.random()*data[0].meta.syns[randomArray].length);
    const switchingWords = 
    {
        hwi: data[0].hwi.hw,
        synonym: data[0].meta.syns[randomArray][randomWord]
    }
    wordsWeWillSwitch.push(switchingWords);
}

console.log(wordsWeWillSwitch);

// Pick a synonym out to replace a bad word with.

