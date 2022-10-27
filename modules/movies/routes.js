const express = require("express");
const router = express.Router();

const verifyAuthentication = require("./helper").verifyToken;

const controller = require("./controller");

router.get("/movies", verifyAuthentication, controller.getMovies);

module.exports = router;
