const sequelize = require("../config/connection");
const { User, Email } = require("../models");

const seedUser = require("./userData");
const seedEmail = require("./emailData");

const inputData = async () => {
  await sequelize.sync({ force: true });
  await seedUser();
  await seedEmail();
  process.exit(0);
};

inputData();
