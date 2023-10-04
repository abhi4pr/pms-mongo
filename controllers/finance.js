const financeModel = require('../models/financeModel.js');

exports.addFinance = async (req, res) =>{
    try{
        const simc = new financeModel({
            status_: req.body.status_,
            reason: req.body.reason,
            remark: req.body.remark,
            screenshot: req.file.filename
        })
        const simv = await simc.save();
        res.send({simv,status:200});
    } catch(err){
        res.status(500).send({error:err,sms:'This finance cannot be created'})
    }
};

exports.getFinances = async (req, res) => {
    try{
        const simc = await financeModel.find();
        if(!simc){
            res.status(500).send({success:false})
        }
        res.status(200).send(simc)
    } catch(err){
        res.status(500).send({error:err,sms:'Error getting all finances'})
    }
};

exports.editFinance = async (req, res) => {
    try{
        const editsim = await financeModel.findOneAndUpdate(req.body.id,{
            status_: req.body.status_,
            reason: req.body.reason,
            remark: req.body.remark,
            screenshot: req.file.filename
        }, { new: true })
        if(!editsim){
            res.status(500).send({success:false})
        }
        res.status(200).send({success:true,data:editsim})
    } catch(err){
        res.status(500).send({error:err,sms:'Error updating finance details'})
    }
};