const projectxRecordModel = require("../models/projectxRecord.js");

exports.getProjectxRecords = async (req, res) => {
    try{
        const simc = await projectxRecordModel.find();
        if(!simc){
            res.status(500).send({success:false})
        }
        res.status(200).send(simc)
    } catch(err){
        res.status(500).send({error:err,sms:'Error getting all projectxRecord'})
    }
};


exports.addProjectxRecord = async (req, res) =>{
    try{
        const projectxRecord = new ({
            page_id: req.body.page_id,
            page_name: req.body.page_name,
            page_user_id: req.body.page_user_id,
            followers: req.body.followers,
            profile_type: req.body.profile_type,
            page_category: req.body.page_category,
            posted_time: req.body.posted_time,
            category: req.body.category,
            subcategory: req.body.subcategory,
            cbname: req.body.cbname,
            campaign_id: req.body.campaign_id,
            major_category: req.body.major_category,
            igusername: req.body.igusername,
            website: req.body.website,
            remark: req.body.remark,
            whatsapp: req.body.whatsapp,
            type: req.body.type,
            postlink: req.body.postlink,
            post_video_path: req.body.post_video_path,
            post_title: req.body.post_title,
            post_type: req.body.post_type,
            storylink: req.body.storylink,
            agency: req.body.agency,
            hash_tag: req.body.hash_tag,
            post_content: req.body.post_content,
            story_content: req.body.story_content,
            added_by: req.body.added_by,
        })
        const result = await projectxRecord.save();
        res.send({result,status:200});
    } catch(err){
        res.status(500).send({error:err,sms:'This projectxRecord cannot be created'})
    }
};