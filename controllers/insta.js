const instaC = require("../models/instaCModel.js");
const instaP = require("../models/instaPModel.js");
const instaS = require("../models/instaSModel.js");
// const instaPNew = require('../models/instaPModelNew.js');
// const instaCNew = require('../models/instaPModelNew.js');
const jwt = require("jsonwebtoken");
const variable = require("../variables.js");
const axios = require("axios");
const constant = require("../common/constant.js");
const fs = require('fs');
const path = require('path');

exports.trackCreator = async (req, res) => {
    try {
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
            postCountPast: req.body.stats.post_count.vs_previous,
        });
        const instav = await creators.save();
        res.send({ instav, status: 200 });
    } catch (error) {
        res.status(500).send({ error: error, sms: "error while adding data" });
    }
};

const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY0NmNhOTExZWY5ZTcwNWM3ODc1Nzk0NyIsIm5hbWUiOiJjcmVhdGl2ZWZ1ZWwiLCJleHAiOjE3Mjc0ODg3MzAsInJvbGUiOiJDTElFTlQiLCJwZXJtaXNzaW9ucyI6W10sInNlc3Npb24iOiJhNjUwNDg1MS00ZTgwLTRiZjQtODBkZC02YzgxYWYxNjU2MzAifQ.EP0JfWCsLxaFdCLr6MizEeltnJ4h3s9PLi-GuoCUops";

exports.trackCreatorY = async (req, res) => {
    try {
        const trackCreatorParams = {
            connector: req.body.connector,
            handle: req.body.handle,
            cron_expression: req.body.cron_expression,
            tracking_expiry_at: req.body.tracking_expiry_at,
        };

        const response = await axios.post(
            "https://app.ylytic.com/ylytic/api/v1/rt_tracking/creators",
            trackCreatorParams,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        res.status(response.status).json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err, sms: "These creators cant be sent" });
    }
};

exports.trackCreatorPutY = async (req, res) => {
    try {
        const trackCreatorParams = {
            cron_expression: req.body.cron_expression,
            tracking_expiry_at: req.body.tracking_expiry_at,
            tracking: req.body.tracking,
            // tracking: true,
        };

        const response = await axios.put(
            `https://app.ylytic.com/ylytic/api/v1/rt_tracking/creators/${req.params.pagename}`,
            trackCreatorParams,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        res.status(response.status).json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err, sms: "These creators cron expression cant be edited" });
    }
};

exports.getCreators = async (req, res) => {
    try {
        const getcreators = await instaC.find();
        if (!getcreators) {
            res.status(500).send({ success: false });
        }
        res.status(200).send(getcreators);
    } catch (err) {
        res.status(500).send({ error: err, sms: "Error getting all creators" });
    }
};

exports.trackPost = async (req, res) => {
    try {
        // const imageUrl = req.body.data.display_url[0];
        // const savePath = path.join(__dirname, '../uploads/instaImages');

        // if (!fs.existsSync(savePath)) {
        //     fs.mkdirSync(savePath, { recursive: true });
        // }

        // const fileExtension = path.extname(imageUrl);
        // const fileName = `image-${Date.now()}${fileExtension}`;
        // var filePath = path.join(savePath, fileName);

        // axios({
        //     method: 'get',
        //     url: imageUrl,
        //     responseType: 'stream',
        // })
        // .then(async (response) => {
        //     response.data.pipe(fs.createWriteStream(filePath));
            
        //     const creators = new instaP({
        //         postType: req.body.data.post_type,
        //         creatorName: req.body.data.creator.username,
        //         allComments: req.body.data.comments_count.overall,
        //         todayComment: req.body.data.comments_count.today,
        //         pastComment: req.body.data.comments_count.vs_previous,
        //         allLike: req.body.data.likes_count.overall,
        //         todayLike: req.body.data.likes_count.today,
        //         pastLike: req.body.data.likes_count.vs_previous,
        //         allView: req.body.data.views_count.overall,
        //         todayView: req.body.data.views_count.today,
        //         pastView: req.body.data.views_count.vs_previous,
        //         title: req.body.data.title,
        //         postedOn: req.body.data.posted_at,
        //         postUrl: req.body.data.post_url,
        //         postImage: filePath,
        //         shortCode: req.body.shortcode,
        //         posttype_decision: req.body.posttype_decision,
        //         selector_name: req.body.selector_name,
        //         interpretor_name: req.body.interpretor_name,
        //         auditor_name: req.body.auditor_name,
        //         auditor_decision: req.body.auditor_decision,
        //         interpretor_decision: req.body.interpretor_decision,
        //         selector_decision: req.body.selector_decision,
        //     });
        //     const instav = await creators.save();
        //     res.send({ instav, status: 200 });
        // })

        const creators = new instaP({
            postType: req.body.data.post_type,
            creatorName: req.body.data.creator.username,
            allComments: req.body.data.comments_count.overall,
            todayComment: req.body.data.comments_count.today,
            pastComment: req.body.data.comments_count.vs_previous,
            allLike: req.body.data.likes_count.overall,
            todayLike: req.body.data.likes_count.today,
            pastLike: req.body.data.likes_count.vs_previous,
            allView: req.body.data.views_count.overall,
            todayView: req.body.data.views_count.today,
            pastView: req.body.data.views_count.vs_previous,
            title: req.body.data.title,
            postedOn: req.body.data.posted_at,
            postUrl: req.body.data.post_url,
            postImage: req.body.data.display_url[0],
            shortCode: req.body.shortcode,
            posttype_decision: req.body.posttype_decision,
            selector_name: req.body.selector_name,
            interpretor_name: req.body.interpretor_name,
            auditor_name: req.body.auditor_name,
            auditor_decision: req.body.auditor_decision,
            interpretor_decision: req.body.interpretor_decision,
            selector_decision: req.body.selector_decision,
        });
        const instav = await creators.save();
        res.send({ instav, status: 200 });

    } catch (error) {
        res.status(500).send({ error: error, sms: "error while adding data" });
    }
};

exports.trackPostY = async (req, res) => {
    try {
        const trackCreatorParams = {
            connector: req.body.connector,
            shortcode: req.body.handle,
            cron_expression: req.body.cron_expression,
        };

        const response = await axios.post(
            "https://app.ylytic.com/ylytic/admin/api/v1/track_post",
            trackCreatorParams,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        res.status(response.status).json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err, sms: "These post cant be sent" });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const distinctPosts = await instaP.aggregate([
            {
                $sort: { postedOn: -1 },
            },
            {
                $group: {
                    _id: "$postUrl",
                    data: { $first: "$$ROOT" },
                },
            },
            {
                $replaceRoot: { newRoot: "$data" },
            },
        ]);

        if (!distinctPosts || distinctPosts.length === 0) {
            res.status(404).send({ success: false, message: "No posts found" });
        } else {
            res.status(200).send(distinctPosts);
        }
    } catch (err) {
        res.status(500).send({ error: err, message: "Error getting posts" });
    }
};

exports.editInsta = async (req, res) => {
    try {
        const editinsta = await instaP.findByIdAndUpdate(
            req.body._id,
            {
                posttype_decision: req.body.posttype_decision,
                postImage: req.body.postImage,
                selector_name: req.body.selector_name,
                interpretor_name: req.body.interpretor_name,
                auditor_name: req.body.auditor_name,
                auditor_decision: req.body.auditor_decision,
                interpretor_decision: req.body.interpretor_decision,
                selector_decision: req.body.selector_decision,
                todayComment: req.body.todayComment,
                todayLike: req.body.todayLike,
                todayView: req.body.todayView,
                pastComment: req.body.pastComment,
                pastLike: req.body.pastLike,
                pastView: req.body.pastView,
                hashTag: req.body.hashTag,
                mentions: req.body.mentions
            },
            { new: true }
        );
        if (!editinsta) {
            res.status(500).send({ success: false });
        }
        res.status(200).send({ success: true, data: editinsta });
    } catch (err) {
        res.status(500).send({ error: err, sms: "Error updating insta post" });
    }
};

exports.postTypeDecCount = async (req, res) => {
    try {
        const pipeline = [
            {
                $match: { posttype_decision: 1 },
            },
            {
                $group: {
                    _id: "$creatorName",
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    name: "$_id",
                    count: 1,
                },
            },
        ];
        const query = await instaP.aggregate(pipeline);
        res.status(200).send({ success: true, data: query });
    } catch (error) {
        res.status(500).send({ error: error, sms: "Something went wrong" });
    }
};

exports.creatorNameCount = async (req, res) => {
    try {
        const query = await instaP.aggregate([
            {
                $group: {
                    _id: "$creatorName",
                    index: { $first: "$_id" },
                    decision_11_count: {
                        $sum: {
                            $cond: { if: { $eq: ["$posttype_decision", 11] }, then: 1, else: 0 }
                        }
                    },
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
        const sortOrder = req.body.sortOrder;
        // const distinctPosts = await instaP.aggregate([
        //     {
        //         $group: {
        //             _id: "$postUrl",
        //             data: { $first: "$$ROOT" },
        //         },
        //     },
        //     {
        //         $replaceRoot: { newRoot: "$data" },
        //     },
        // ]);

        // const result = {};
        // distinctPosts.forEach((item) => {
        //     const { creatorName, posttype_decision } = item;

        //     if (!result[creatorName]) {
        //         result[creatorName] = {
        //             _id: creatorName,
        //             decision_2_count: 0,
        //             decision_1_count: 0,
        //             decision_0_count: 0,
        //         };
        //     }

        //     switch (posttype_decision) {
        //         case 0:
        //             result[creatorName]["decision_0_count"]++;
        //             break;
        //         case 1:
        //             result[creatorName]["decision_1_count"]++;
        //             break;
        //         case 2:
        //             result[creatorName]["decision_2_count"]++;
        //             break;
        //         default:
        //             break;
        //     }
        // });

        // const finalResult = Object.values(result);

        switch (sortOrder) {
            case 0:
                query.sort((a, b) => b.decision_0_count - a.decision_0_count);
                break;
            case 1:
                query.sort((a, b) => b.decision_1_count - a.decision_1_count);
                break;
            case 2:
                query.sort((a, b) => b.decision_2_count - a.decision_2_count);
                break;
            case 3:
                query.sort((a, b) => b.decision_0_count - a.decision_0_count);
                break;
            default:
                break;
        }

        res.status(200).send({ success: true, data: query });
    } catch (error) {
        res.status(500).send({ error: error.message, sms: "something went wrong" });
    }
};

exports.getPostsFromName = async (req, res) => {
    try {
        const creatorName = req.body.creatorName;
        const getPosts = await instaP
            .find({ creatorName: creatorName })
            .sort({ postedOn: -1 });
        if (!getPosts || getPosts.length == 0) {
            res.status(404).send({
                success: false,
                message: "No posts found from this creatorName",
            });
        } else {
            const newMap = new Map();
            getPosts.forEach((item) => newMap.set(item.postUrl, item));
            res.status(200).send([...newMap.values()]);
        }
    } catch (error) {
        res
            .status(500)
            .send({ error: error, sms: "error getting posts from name" });
    }
};

exports.getPostsByDecNum = async (req, res) => {
    try {
        const getPosts = await instaP.find({ posttype_decision: parseInt(req.body.posttype_decision) });
        res.status(200).send(getPosts);
    } catch (error) {
        res
            .status(500)
            .send({ error: error, sms: "error getting posts from name" });
    }
};

exports.trackStory = async (req, res) => {
    try {
        // console.log("story api", req.body);
        if (req.body) {
              for (const data of req.body?.story_data?.stories) {
                const creators = new instaS({
                    creatorName : req.body?.handle,
                    mediaCont : req.body?.story_data?.media_count,
                    expiredAt: req.body?.story_data?.expiry_at,
                    savedOn: data?.taken_at,
                    shortcode: data?.shortcode,
                    links: data?.links,
                    hashtags: data?.hashtags,
                    mentions:data?.mentions,
                    locations:data?.locations,
                    music: data?.music
                })
                 await creators.save();
              }  
              return res.send({status:200,sms:"Stories created successfully."})
          }else{
          return  res.send({status:200,sms:"Please provide request body."})
          }
       
    } catch (error) {
        res.status(500).send({ error: error.message, sms: "error while adding data" });
    }
};

exports.getStories = async (req, res) => {
    try {
        const getPosts = await instaS.find({});
        return res.status(200).send(getPosts);
    } catch (error) {
        res.status(500).send({ error: error, sms: "error getting stories" });
    }
};

exports.creatorInsights = async (req, res) => {
    try {
        const response = await axios.get(
            constant.CREATOR_INSIGHTS,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        const resObj = {
            status: response.status,
            data: { ...response.data?.insights?.creator_insights?.creators, posts: response.data?.insights?.post_insights?.posts },
            // data: response.data?.insights?.creator_insights?.creators,
            message: "Success",
        };
        res.status(response.status).json(resObj);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err, sms: "These creators cant be sent" });
    }
};
exports.cfInstaApi = async (req, res) => {
    try {
        const response = await axios.get(
            constant.CF_INSTA_API,
            {
                headers: {
                    Authorization: `Bearer ${req.headers.authorization}`,
                    "Content-Type": "application/json",
                },
            }
        );
        const dataobj = {
            biography: response.data?.graphql?.user?.biography
        }
        const resObj = {
            status: response.status,
            data: dataobj,
            message: "Success",
        };
        res.status(response.status).json(resObj);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err, sms: "Something went wrong..." });
    }
};

exports.countInstaCPModels = async (req, res) => {
    try {
        const flag = req.body.flag
        let resObj = { status: 200 }
        if (parseInt(flag) === constant.INSTA_C_MODELS) {
            const response = await instaC.countDocuments({})
            resObj.data = {
                instac_count: response
            }
        } else if (parseInt(flag) === constant.INSTA_P_MODELS) {
            const response = await instaP.countDocuments({})
            resObj.data = {
                instap_count: response
            }
        }else{
            resObj.message = "Provide valid flag"
            return res.status(200).json(resObj); 
        }
        return res.status(200).json(resObj);

    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err, sms: "Something went wrong..." });
    }
};

exports.getDynamicReqAndRes = async (req, res) => {
    try {
        const ReqKey = req.body.request_key;
        const ReqValue = req.body.request_value;
        const getPosts = await instaP.find({ [ReqKey]: parseInt(ReqValue) });
        res.status(200).send(getPosts);
    } catch (error) {
        res.send({ status:500, error: error, sms: "error getting posts from name" });
    }
};

exports.getAvgFrqOfPost = async (req, res) => {
    try {
    //underworing-----------------------------------------------------
  
    const query = await instaP.aggregate([
    //   {
    //     $match: {
    //       postedOn: {
    //         $gte: startOfCurrentDate, // Match documents with "postedOn" greater than or equal to the start of the current date
    //         $lt: endOfCurrentDate,     // Match documents with "postedOn" less than the end of the current date
    //       }
    //     }
    //   },
            {
                $group: {
                    _id: "$creatorName",
                    index: { $first: "$_id" },
                    maxPostedOn: { $max: "$postedOn" }, 
      minPostedOn: { $min: "$postedOn" },
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
        res.status(200).send(query);
    } catch (error) {
        res.send({ status:500, error: error.message, sms: "error getting posts from name" });
    }
};