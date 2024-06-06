const express = require("express");
const emailRoutes = require("./email-route");

const router = express.Router();

router.use("/tickets", emailRoutes);

module.exports = router;
