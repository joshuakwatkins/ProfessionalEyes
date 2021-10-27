const textSyntaxArray = [];
const text = "Hello there mean head, I can't stand you and hope you trip and fall to your death.";
const textArray = text.split(" ");

textArray.forEach(element => textSyntaxArray.push("%20" + element));
const partialJoin = textSyntaxArray.join("");

console.log(partialJoin);

textSyntaxArray

fetch("https://twinword-sentiment-analysis.p.rapidapi.com/analyze/?text="+partialJoin, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "0c86673a91msh18102740756c84dp1c7dc9jsn4a761e4a08c1",
		"x-rapidapi-host": "twinword-sentiment-analysis.p.rapidapi.com"
	}
})
.then(response => response.json())
.then(data => console.log(data))
;