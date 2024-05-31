const express = require("express");
const { 
    GenerateNewShortURL,
    redirectUser,
    getAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.post("/", GenerateNewShortURL);
router.get("/:short_id",redirectUser);
router.get("/analytic/:shortId",getAnalytics);

module.exports = router;