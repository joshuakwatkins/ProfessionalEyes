const User = require("./User");
const Email = require("./Email");

User.hasMany(Email, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Email.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Email };
