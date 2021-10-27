const router = require("express").Router();
const { Email, User } = require("../models");
const withAuth = require("../utils/auth");

router.get('/cleanse', withAuth, async (req, res) => {
    const toClean = req.body.body; //logic here for the fetch call?


    res.render('homepage', toClean)
})