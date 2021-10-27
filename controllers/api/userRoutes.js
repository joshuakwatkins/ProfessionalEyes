const router = require("express").Router();
const { User, Email } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.name = newUser.name;
      req.session.loggedIn = true;
    });
    res.json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        name: req.body.name,
      },
    });
    if (!user) {
      res.status(400).json({ message: "We could not locate that user" });
      return;
    }

    const passCheck = user.checkPassword(req.body.password);

    if (!passCheck) {
      res
        .status(400)
        .json({ message: "Please check your password and try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.name = user.name;
      req.session.loggedIn = true;

      res.json({ message: "User is logged in!" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
