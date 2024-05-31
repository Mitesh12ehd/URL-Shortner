const shortid = require("shortid");
const URL = require("../models/url");

async function GenerateNewShortURL(req,res){
    const body = req.body;

    if(!body){
        return res.status(400).json({
            msg : "url is required please enter"
        })
    }

    //generate random id
    const shortId = shortid(8);

    //create entry in db
    await URL.create({
        shortId : shortId,
        redirectUrl : body.original_url,
        visitHistory : [],
        createdBy: req.user._id //here in request object user is present because
                                //we added user in middleware
    });

    return res.status(201).json({
        id: shortId
    })
}

async function redirectUser(req,res){
    const shortId = req.params.short_id;

    //first maintain visithistory
    const entry = await URL.findOneAndUpdate(
        {shortId},
        {
            $push:{
                visitHistory : {
                    timestamp : Date.now()
                }
            }
        }
    )
    //redirect user
    res.redirect(entry.redirectUrl);
}

async function getAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    const totalclick = result.visitHistory.length;
    
    return res.status(200).json({
        msg : "success",
        Total_Click : totalclick,
        analytics : result.visitHistory
    })
}

module.exports = {
    GenerateNewShortURL,
    redirectUser,
    getAnalytics
}