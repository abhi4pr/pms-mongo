const notificationModel = require('../models/notificationModel.js');

exports.addNotification = async (req, res) =>{
    try{
        const simc = new notificationModel({
            user_id: req.body.user_id,
            notification_title: req.body.notification_title,
            notification_show: req.body.notification_show,
            readen: req.body.readen,
            created_by: req.body.created_by
        })
        const simv = await simc.save();
        res.send({simv,status:200});
    } catch(err){
        res.status(500).send({error:err.message, sms:'This notification cannot be created'})
    }
};

exports.getAllNotifications = async (req, res) => {
    try{
        const simc = await notificationModel.find({});

        if(!simc){
            res.status(500).send({success:false})
        }
        res.status(200).send({data:simc})
    } catch(err){
        res.status(500).send({error:err.message, sms:'Error getting all notifications'})
    }
};

exports.editNotification = async (req, res) => {
    try{
        const editsim = await notificationModel.findByIdAndUpdate(req.body._id,{
            // user_id: req.body.user_id,
            // notification_title: req.body.notification_title,
            notification_show: req.body.notification_show,
            readen: req.body.readen
        }, { new: true })

        res.status(200).send({success:true,data:editsim})
    } catch(err){
        res.status(500).send({error:err,sms:'Error updating notification details'})
    }
};