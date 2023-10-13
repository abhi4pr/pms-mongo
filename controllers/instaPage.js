const instaPageModel = require("../models/instaPageModel.js");
const instaPageCountModel = require("../models/instaPageCountModel.js");
const platformModel = require("../models/platformModel.js")
const instaTypeModel = require("../models/instaTypeModel.js");
const instaStatsModel = require("../models/instaStatsModel.js");

exports.addIp = async (req, res) =>{
    try{
        const simc = new instaPageModel({
            ip_type: req.body.ip_type,
            platform: req.body.platform,
            ip_name: req.body.ip_name,
            password: req.body.password,
            backup_code: req.body.backup_code,
            contact_no: req.body.contact_no,
            email: req.body.email,
            email_pass: req.body.email_pass,
            recovery_email: req.body.recovery_email,
            recovery_contact: req.body.recovery_contact,
            allocated_to_primary: req.body.allocated_to_primary,
            created_by: req.body.created_by,
            last_updated_by: req.body.last_updated_by,
            report_L1: req.body.report_L1,
            report_L2: req.body.report_L2,
            report_L3: req.body.report_L3,
            post_count: req.body.post_count,
            followers: req.body.followers,
            days_reach: req.body.days_reach,
            user_id: req.body.user_id,
            user_response: req.body.user_response
        })
        const simv = await simc.save();

        const ip = new instaPageCountModel({
            lastInsertedId: simv.ip_regist_id,
            updatedBy: req.body.user_id,
            post_count: req.body.post_count,
            followers: req.body.followers,
            days_reach: req.body.days_reach
        })
        const ipv = await ip.save();

        res.send({simv,status:200});
    } catch(err){
        res.status(500).send({error:err,sms:'This ip cannot be created'})
    }
};

exports.updateIp = async (req, res) => {
    try{
        const editsim = await userModel.findOneAndUpdate({ip_regist_id:req.body.ip_regist_id},{
            ip_type: req.body.ip_type,
            platform: req.body.platform,
            ip_name: req.body.ip_name,
            password: req.body.password,
            backup_code: req.body.backup_code,
            contact_no: req.body.contact_no,
            email: req.body.email,
            email_pass: req.body.email_pass,
            recovery_email: req.body.recovery_email,
            recovery_contact: req.body.recovery_contact,
            allocated_to_primary: req.body.allocated_to_primary,
            created_by: req.body.created_by,
            last_updated_by: req.body.last_updated_by,
            report_L1: req.body.report_L1,
            report_L2: req.body.report_L2,
            report_L3: req.body.report_L3,
            post_count: req.body.post_count,
            followers: req.body.followers,
            days_reach: req.body.days_reach,
            user_id: req.body.user_id,
            user_response: req.body.user_response
        }, { new: true })
        if(!editsim){
            res.status(500).send({success:false})
        }
        res.status(200).send({success:true,data:editsim})
    } catch(err){
        res.status(500).send({error:err,sms:'Error updating ip details'})
    }
};

exports.deleteInstaPage = async (req, res) =>{
    instaPageModel.deleteOne({ip_regist_id:req.params.id}).then(item =>{
        if(item){
            return res.status(200).json({success:true, message:'insta page deleted'})
        }else{
            return res.status(404).json({success:false, message:'insta page not found'})
        }
    }).catch(err=>{
        return res.status(400).json({success:false, message:err})
    })
};

exports.addPlatform = async (req, res) =>{
    try{
        const simc = new platformModel({
            name: req.body.name,
            created_by: req.body.created_by,
            remark: req.body.remark
        })
        const simv = await simc.save();

        res.send({simv,status:200});
    } catch(err){
        res.status(500).send({error:err,sms:'This platform cannot be created'})
    }
};

exports.getAllPlatforms = async (req, res) => {
    try{
        const delv = await platformModel.aggregate([
            {
                $lookup: {
                    from: 'usermodels',
                    localField: 'user_id',
                    foreignField: 'created_by',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $project: {
                    created_by_name: '$user.user_name',
                    id: "$id",
                    name: '$name',
                    remark: '$remark',
                    created_at: '$created_at'
                }
            }
        ]).exec();
        if(!delv){
            res.status(500).send({success:false})
        }
        res.status(200).send(delv)
    } catch(err){
        res.status(500).send({error:err, sms:'error getting all platforms'})
    }
}

exports.updatePlatform = async (req, res) => {
    try{
        const editsim = await platformModel.findOneAndUpdate({id:req.body.id},{
            name: req.body.name,
            last_updated_by: req.body.last_updated_by
        }, { new: true })
        if(!editsim){
            res.status(500).send({success:false})
        }
        res.status(200).send({success:true,data:editsim})
    } catch(err){
        res.status(500).send({error:err,sms:'Error updating platform details'})
    }
};

exports.deletePlatform = async (req, res) =>{
    platformModel.deleteOne({id:req.params.id}).then(item =>{
        if(item){
            return res.status(200).json({success:true, message:'platform deleted'})
        }else{
            return res.status(404).json({success:false, message:'platform not found'})
        }
    }).catch(err=>{
        return res.status(400).json({success:false, message:err})
    })
};

exports.addIpType = async (req, res) =>{
    try{
        const simc = new instaTypeModel({
            name: req.body.name,
            created_by: req.body.created_by
        })
        const simv = await simc.save();

        res.send({simv,status:200});
    } catch(err){
        res.status(500).send({error:err,sms:'This ip type cannot be created'})
    }
};

exports.getAllIpTypes = async (req, res) => {
    try{
        const delv = await instaTypeModel.aggregate([
            {
                $lookup: {
                    from: 'usermodels',
                    localField: 'user_id',
                    foreignField: 'created_by',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $project: {
                    created_by_name: '$user.user_name',
                    id: "$id",
                    name: '$name',
                    remark: '$remark',
                    created_at: '$created_at'
                }
            }
        ]).exec();
        if(!delv){
            res.status(500).send({success:false})
        }
        res.status(200).send(delv)
    } catch(err){
        res.status(500).send({error:err, sms:'error getting all ip types'})
    }
}

exports.addIpStats = async (req, res) =>{
    try{
        const currentDate = new Date();
        const currentMonthName = currentDate.toLocaleString('default', { month: 'long' });
        const currentYear = currentDate.getFullYear().toString();

        const results = await instaStatsModel.find({
            ip_id: req.body.ip_id,
            month_: currentMonthName,
            year_: currentYear
        })

        if (req.body.ip_id == results[0].ip_id && currentMonthName == results[0].month_ && currentYear == results[0].year_) {
            const editsim = await instaStatsModel.findOneAndUpdate({ip_id:req.body.ip_id},{
                ip_id: req.body.ip_id,
                story_view: req.body.story_view,
                month_reach: req.body.month_reach,
                impression: req.body.impression,
                profile_visit: req.body.profile_visit,
                gender: req.body.gender,
                link_tap: req.body.link_tap,
                email_tap: req.body.email_tap,
                content_shared: req.body.content_shared,
                followerss: req.body.followerss,
                non_followerss: req.body.non_followerss,
                likes: req.body.likes,
                shares: req.body.shares,
                saves: req.body.saves,
                month_: currentMonthName,
                year_: currentYear
            }, { new: true })
        }else{
            const simc = new instaStatsModel({
                ip_id: req.body.ip_id,
                story_view: req.body.story_view,
                month_reach: req.body.month_reach,
                impression: req.body.impression,
                profile_visit: req.body.profile_visit,
                gender: req.body.gender,
                link_tap: req.body.link_tap,
                email_tap: req.body.email_tap,
                content_shared: req.body.content_shared,
                followerss: req.body.followerss,
                non_followerss: req.body.non_followerss,
                likes: req.body.likes,
                shares: req.body.shares,
                saves: req.body.saves,
                month_: currentMonthName,
                year_: currentYear
            })
            const simv = await simc.save();
        }

        res.send({simv,status:200});
    } catch(err){
        res.status(500).send({error:err,sms:'This insta stats cannot be created'})
    }
};

exports.getStats = async (req, res) => {
    try{
        const simc = await instaStatsModel.find({
            ip_id: req.body.ip_id,
            month_: req.body.month,
            year_: req.body.year
        });
        if(!simc){
            res.status(500).send({success:false})
        }
        res.status(200).send(simc)
    } catch(err){
        res.status(500).send({error:err,sms:'Error getting all insta stats'})
    }
};

exports.getInstaCountHistory = async (req, res) => {
    try{
        const simc = await instaPageCountModel.aggregate([
            {
                $match:{ ip_id: req.params.ip_id}
            },
            {
                $lookup: {
                    from: 'instapagemodels',
                    localField: 'ip_regist_id',
                    foreignField: 'ip_id',
                    as: 'ipmodels'
                }
            },
            {
                $unwind: '$ipmodels'
            },
            {
                $project: {
                    ip_name: '$ipmodels.ip_name',
                    id: "$id",
                    ip_id: '$ip_id',
                    post_count: '$post_count',
                    followers: '$followers',
                    days_reach: '$days_reach'
                }
            }
        ]).exec();
        if(!simc){
            res.status(500).send({success:false})
        }
        res.status(200).send(simc)
    } catch(err){
        res.status(500).send({error:err,sms:'Error getting insta count history'})
    }
};

exports.getLastInstaCount = async (req, res) => {
    try{
        const simc = await instaPageCountModel.aggregate([
            {
                $match:{ ip_id: req.params.ip_id}
            },
            {
                $lookup: {
                    from: 'instapagemodels',
                    localField: 'ip_regist_id',
                    foreignField: 'ip_id',
                    as: 'ipmodels'
                }
            },
            {
                $unwind: '$ipmodels'
            },
            {
                $sort:{ id: -1}
            },
            {
                $limit: 1
            },
            {
                $project: {
                    ip_name: '$ipmodels.ip_name',
                    id: "$id",
                    ip_id: '$ip_id',
                    post_count: '$post_count',
                    followers: '$followers',
                    days_reach: '$days_reach'
                }
            }
        ]).exec();
        if(!simc){
            res.status(500).send({success:false})
        }
        res.status(200).send(simc)
    } catch(err){
        res.status(500).send({error:err,sms:'Error getting last insta count'})
    }
};

exports.addInstaPageCount = async (req, res) =>{
    try{
        const simc = new instaTypeModel({
            ip_id: req.body.ip_id,
            created_by: req.body.user_id,
            post_count: req.body.post_count,
            followers: req.body.followers,
            days_reach: req.body.days_reach
        })
        const simv = await simc.save();

        res.send({simv,status:200});
    } catch(err){
        res.status(500).send({error:err,sms:'This ip type cannot be created'})
    }
};

exports.updateIpType = async (req, res) => {
    try{
        const editsim = await instaTypeModel.findOneAndUpdate({id:req.body.id},{
            name: req.body.name,
            remark: req.body.remark,
            last_updated_by: req.body.user_id
        }, { new: true })
        if(!editsim){
            res.status(500).send({success:false})
        }
        res.status(200).send({success:true,data:editsim})
    } catch(err){
        res.status(500).send({error:err,sms:'Error updating ip type details'})
    }
};

exports.deleteIpType = async (req, res) =>{
    instaTypeModel.deleteOne({id:req.params.id}).then(item =>{
        if(item){
            return res.status(200).json({success:true, message:'insta iptype deleted'})
        }else{
            return res.status(404).json({success:false, message:'insta iptype not found'})
        }
    }).catch(err=>{
        return res.status(400).json({success:false, message:err})
    })
};

exports.getIpTypeById = async (req, res) => {
    try{
        const delv = await instaTypeModel.find({id:req.params.id})
        if(!delv){
            res.status(500).send({success:false})
        }
        res.status(200).send(delv)
    } catch(err){
        res.status(500).send({error:err, sms:'error getting iptype by id'})
    }
}

exports.getPlatformById = async (req, res) => {
    try{
        const simc = await platformModel.aggregate([
            {
                $match:{ id: req.params.id}
            },
            {
                $lookup: {
                    from: 'usermodels',
                    localField: 'user_id',
                    foreignField: 'created_by',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $project: {
                    created_by_name: '$user.user_name',
                    id: "$id",
                    name: '$name',
                    remark: '$remark'
                }
            }
        ]).exec();
        if(!simc){
            res.status(500).send({success:false})
        }
        res.status(200).send(simc)
    } catch(err){
        res.status(500).send({error:err,sms:'Error getting platform by id'})
    }
};

exports.getInstaPageById = async (req, res) => {
    try{
        const delv = await instaPageModel.aggregate([
            {
                $match:{ ip_regist_id: req.params.ip_regist_id}
            },
            {
                $lookup: {
                    from: 'usermodels',
                    localField: 'user_id',
                    foreignField: 'report_L1',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $project: {
                    report_L1_user_name: '$user.user_name',
                    allocated_to_primary_name: '$user.user_email',
                    id: "$id",
                    ip_type: '$ip_type',
                    platform: '$platform',
                    ip_name: '$ip_name',
                    password: '$password',
                    backup_code: '$backup_code',
                    contact_no: '$contact_no',
                    email: '$email',
                    email_pass: '$email_pass',
                    recovery_email: '$recovery_email',
                    recovery_contact: '$recovery_contact',
                    allocated_to_primary: '$allocated_to_primary',
                    created_by: '$created_by',
                    last_updated_by: '$last_updated_by',
                    report_L1: '$report_L1',
                    report_L2: '$report_L2',
                    report_L3: '$report_L3',
                    post_count: '$post_count',
                    followers: '$followers',
                    days_reach: '$days_reach',
                    user_response: '$user_response'
                }
            }
        ]).exec();
        if(!delv){
            res.status(500).send({success:false})
        }
        res.status(200).send(delv)
    } catch(err){
        res.status(500).send({error:err, sms:'error getting insta page by id'})
    }
}