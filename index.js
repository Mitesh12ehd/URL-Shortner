const express = require("express");
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const connect_MongoDb = require("./utils/connect");
const cookieParser = require("cookie-parser");
const { isLoggedIn } = require("./middlewares/isLogged_in");
const URL = require("./models/url");
require("dotenv").config();

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

connect_MongoDb();

//register route
app.use("/url", isLoggedIn, urlRoute);
app.use("/user",userRoute);
//this route here because it not work in url router,controller
app.get("/getAll",isLoggedIn, async(req,res) => {
    const allUrl = await URL.find({createdBy : req.user._id});
    return res.json({
        mag : "success",
        allUrl
    })
})

app.listen(PORT,() => {
    console.log(`Server started at ${PORT}`);
});