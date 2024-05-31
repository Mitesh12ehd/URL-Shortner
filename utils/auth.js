const jwt = require("jsonwebtoken");

function setUser(user){
    const payload = {
        _id : user._id,
        email : user.email
    }
    const token = jwt.sign(payload,process.env.JWT_SECRET);
    return token;
}

function getUser(token){
    return jwt.verify(token,process.env.JWT_SECRET);
}

module.exports = {setUser, getUser};


//state less
// const sessionId_to_User_Map = new Map();

// function setUser(id,user){
//     sessionId_to_User_Map.set(id,user);
// }

// function getUser(id){
//     sessionId_to_User_Map.set(id,user);
// }