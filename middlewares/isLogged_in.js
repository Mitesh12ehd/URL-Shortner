const {setUser, getUser} = require("../utils/auth");

async function isLoggedIn(req,res,next){
    const sessionId = req.cookies?.sessionId;
    if(!sessionId){
        return res.json({
            msg: "please login first"
        })
    }
    
    const user = getUser(sessionId);
    if(!user){
        return res.json({
            msg: "please login first"
        })
    }

    //add user in request object and proceed next
    req.user = user;
    next();
}

module.exports = {isLoggedIn};