const User = require("../models/user");
const {v4:uuidv4} = require("uuid");
const bcrypt = require('bcrypt');
const {setUser, getUser} = require("../utils/auth");

async function userSignUp(req,res){
    const {name,email,password} = req.body;
    const existingUser = await User.findOne({email : email});
    if(existingUser){
        return res.json({
            msg : "user with given email already exist"
        })
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    console.log(hashedPassword);

    const newUser = await User.create({
        name,
        email,
        password : hashedPassword
    });
    return res.status(201).json({
        msg : "successfull signup",
        newUser
    })
}

async function userLogin(req,res){
    const{email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.json({
            msg : "user not found"
        })
    }

    //compare password using bcrypt
    if(!(await bcrypt.compare(password , user?.password))){
        return res.json({
            msg : "password is wrong"
        })
    }

    const token = setUser(user);

    res.cookie("sessionId",token);
    return res.status(200).json({
        msg: "successfull login",
    })
}

module.exports = {
    userSignUp,
    userLogin
}