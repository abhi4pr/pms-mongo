const instaC = require('../models/instaCModel.js');
const instaP = require('../models/instaPModel.js');
// const instaPNew = require('../models/instaPModelNew.js');
// const instaCNew = require('../models/instaPModelNew.js');
const jwt = require('jsonwebtoken');
const variable = require('../variables.js');
const axios = require('axios');

exports.trackCreator = async(req, res) => {
    try{
        const creators = new instaC({
            groupName: req.body.groupName,
            creatorName: req.body.handle,
            followersCount: req.body.stats.followers_count.overall,
            followersToday: req.body.stats.followers_count.today,
            followersPast: req.body.stats.followers_count.vs_previous,
            followingCount: req.body.stats.following_count.overall,
            followingToday: req.body.stats.following_count.today,
            followingPast: req.body.stats.following_count.vs_previous,
            postCount: req.body.stats.post_count.overall,
            postCountToday: req.body.stats.post_count.today,
            postCountPast: req.body.stats.post_count.vs_previous
        })
        const instav = await creators.save();
        res.send({instav,status:200})
    }catch(error){
        res.status(500).send({error:error, sms:'error while adding data'})
    }
}

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY0NmNhOTExZWY5ZTcwNWM3ODc1Nzk0NyIsIm5hbWUiOiJjcmVhdGl2ZWZ1ZWwiLCJleHAiOjE3Mjc0ODg3MzAsInJvbGUiOiJDTElFTlQiLCJwZXJtaXNzaW9ucyI6W10sInNlc3Npb24iOiJhNjUwNDg1MS00ZTgwLTRiZjQtODBkZC02YzgxYWYxNjU2MzAifQ.EP0JfWCsLxaFdCLr6MizEeltnJ4h3s9PLi-GuoCUops";

exports.trackCreatorY = async (req, res) => {
    try {
        const trackCreatorParams = {
            connector: req.body.connector,
            handle: req.body.handle,
            cron_expression: req.body.cron_expression,
            tracking_expiry_at: req.body.tracking_expiry_at
        };

        const response = await axios.post(
            "https://app.ylytic.com/ylytic/api/v1/rt_tracking/creators",
            trackCreatorParams,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        res.status(response.status).json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err, sms: 'These creators cant be sent' });
    }
};

exports.getCreators = async (req, res) => {
    try{
        const getcreators = await instaC.find();
        if(!getcreators){
            res.status(500).send({success:false})
        }
        res.status(200).send(getcreators)
    } catch(err){
        res.status(500).send({error:err,sms:'Error getting all creators'})
    }
};

exports.trackPost = async(req, res) => {
    try{
        const creators = new instaP({
            postType: req.body.data.post_type,
            creatorName : req.body.data.creator.username,
            allComments : req.body.data.comments_count.overall,
            todayComment : req.body.data.comments_count.today,
            pastComment : req.body.data.comments_count.vs_previous,
            allLike : req.body.data.likes_count.overall,
            todayLike : req.body.data.likes_count.today,
            pastLike : req.body.data.likes_count.vs_previous,
            allView : req.body.data.views_count.overall,
            todayView : req.body.data.views_count.today,
            pastView : req.body.data.views_count.vs_previous,
            title : req.body.data.title,
            postedOn : req.body.data.posted_at,
            postUrl : req.body.data.post_url,
            postImage : req.body.data.display_url[0],
            shortCode : req.body.shortcode,
            posttype_decision : req.body.posttype_decision,
            selector_name : req.body.selector_name,
            interpretor_name : req.body.interpretor_name,
            auditor_name : req.body.auditor_name,
            auditor_decision : req.body.auditor_decision,
            interpretor_decision : req.body.interpretor_decision,
            selector_decision : req.body.selector_decision
        })
        const instav = await creators.save();
        res.send({instav,status:200})
    }catch(error){
        res.status(500).send({error:error, sms:'error while adding data'})
    }
}

exports.trackPostY = async (req, res) =>{
    try {
        const trackCreatorParams = {
            connector: req.body.connector,
            shortcode: req.body.handle,
            cron_expression: req.body.cron_expression
        };

        const response = await axios.post(
            "https://app.ylytic.com/ylytic/admin/api/v1/track_post",
            trackCreatorParams,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        res.status(response.status).json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err, sms: 'These post cant be sent' });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const getcreators = await instaP.find().sort({ postedOn: -1 });
        if (!getcreators) {
            res.status(500).send({ success: false });
        }
        res.status(200).send(getcreators);
    } catch (err) {
        res.status(500).send({ error: err, sms: 'Error getting all posts' });
    }
};

exports.editInsta = async (req, res) => {
    try{
        const editinsta = await instaP.findByIdAndUpdate(req.body._id,{
            posttype_decision : req.body.posttype_decision,
            selector_name : req.body.selector_name,
            interpretor_name : req.body.interpretor_name,
            auditor_name : req.body.auditor_name,
            auditor_decision : req.body.auditor_decision,
            interpretor_decision : req.body.interpretor_decision,
            selector_decision : req.body.selector_decision
        }, { new: true })
        if(!editinsta){
            res.status(500).send({success:false})
        }
        res.status(200).send({success:true,data:editinsta})
    } catch(err){
        res.status(500).send({error:err,sms:'Error updating insta post'})
    }
};

exports.postTypeDecCount = async (req, res) => {
    try {
        const pipeline = [
            {
                $match: { posttype_decision: 1 }
            },
            {
                $group: {
                    _id: "$creatorName",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0, 
                    name: "$_id",
                    count: 1
                }
            }
        ];
        const query = await instaP.aggregate(pipeline);
        res.status(200).send({ success: true, data: query });
    } catch (error) {
        res.status(500).send({ error: error, sms: 'Something went wrong' });
    }
}

exports.creatorNameCount = async (req, res) => {
    try {
        const query = await instaP.aggregate([
            {
                $group: {
                    _id: "$creatorName",
                    index: { $first: "$_id" },
                    decision_2_count: {
                        $sum: {
                            $cond: { if: { $eq: ["$posttype_decision", 2] }, then: 1, else: 0}
                        }
                    },
                    decision_1_count: {
                        $sum: {
                            $cond: { if: { $eq: ["$posttype_decision", 1] }, then: 1, else: 0 }
                        }
                    },
                    decision_0_count: {
                        $sum: {
                            $cond: { if: { $eq: ["$posttype_decision", 0] }, then: 1, else: 0 }
                        }
                    }
                }
            }
        ]).exec();
        res.status(200).send({ success: true, data: query });
    } catch (error) {
        res.status(500).send({ error: error.message, sms: 'something went wrong' });
    }
}

exports.getPostsFromName = async(req, res) => {
    try{
        const creatorName = req.body.creatorName;
        const getPosts = await instaP.find({creatorName: creatorName}).sort({ postedOn: -1 });
        if (!getPosts || getPosts.length == 0) {
            res.status(404).send({ success: false, message: 'No posts found from this creatorName' });
        } else {
            res.status(200).send(getPosts);
        }
    }catch(error){
        res.status(500).send({error:error, sms:'error getting posts from name'})
    }
}

exports.trackStory = async(req, res) => {
    try{
        console.log('story api',req.body)
        // const creators = new instaP({
        //     creatorName : req.body.data.creator.username
        // })
        // const instav = await creators.save();
        // res.send({instav,status:200})
    }catch(error){
        res.status(500).send({error:error, sms:'error while adding data'})
    }
}