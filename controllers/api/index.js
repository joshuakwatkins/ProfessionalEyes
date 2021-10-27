<<<<<<< HEAD
const router = require('express').Router();

const emailRoutes = require("./emailRoutes");
const userRoutes = require("./userRoutes");
=======
const router = require("express").Router();

const emailRoutes = require("./emailRoutes");
const userRoutes = require("./userRoutes");
const keySentiment = "0c86673a91msh18102740756c84dp1c7dc9jsn4a761e4a08c1";

fetch(
  "https://twinword-sentiment-analysis.p.rapidapi.com/analyze/?text=great%20value%20in%20its%20price%20range!&apikey=0c86673a91msh18102740756c84dp1c7dc9jsn4a761e4a08c1"
)
  .then((response) => response.json())
  .then((data) => console.log(data));
>>>>>>> df03085594e1e741d9e052cc86a6436db7e6742c
