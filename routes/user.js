const express = require("express");
const {
    userSignUp,userLogin
} = require("../controllers/user");

const router = express.Router();

router.post("/signup",userSignUp);
router.get("/login",userLogin);

module.exports = router;