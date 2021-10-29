const router = require("express").Router();
const { User, Email } = require("../../models");

router.post("/", async (req, res) => {
  console.log('something')
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    console.log(newUser);
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.name = newUser.name;
      req.session.logged_in = true;
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
        email: req.body.email,
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
      req.session.logged_in = true;

      res.json({ message: "User is logged in!" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
