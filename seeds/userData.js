const { User } = require("../models");

const userData = [
  {
    email: "jung@jung.com",
    password: "punchysnack"
  },
  {
    email: "kingta@jung.com",
    password: "clowneyshoes"
  },
  {
    email: "numberoneta@jung.com",
    password: "whispergreen"
  },
  {
    email: "dataGOAT@jung.com",
    password: "wealthydog"
  },
  {
    email: "white@house.com",
    password: "snackypunch"
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
