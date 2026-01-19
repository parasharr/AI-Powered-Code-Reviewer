const express = require("express");
const router = express.Router();
const AIcontroller = require("../controllers/ai.controller");

router.post("/get-review", AIcontroller.getReview);

module.exports = router;
