const financeModel = require('../models/financeModel.js');

exports.addFinance = async (req, res) =>{
    try{
        const simc = new financeModel({
            status_: req.body.status_,
            reason: req.body.reason,
            remark: req.body.remark,
            screenshot: req.file?.filename,
            attendence_id: req.body.attendence_id,
            reference_no: req.body.reference_no,
            amount: req.body.amount,
            pay_date: req.body.pay_date
        })
        const simv = await simc.save();
        res.send({simv,status:200});
    } catch(err){
        res.status(500).send({error:err.message,sms:'This finance cannot be created'})
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
            screenshot: req.file.filename,
            reference_no: req.body.reference_no,
            amount: req.body.amount,
            pay_date: req.body.pay_date
        }, { new: true })
        if(!editsim){
            res.status(500).send({success:false})
        }
        res.status(200).send({success:true,data:editsim})
    } catch(err){
        res.status(500).send({error:err,sms:'Error updating finance details'})
    }
};


exports.deleteFinance = async (req, res) =>{
    financeModel.deleteOne({id:req.params.id}).then(item =>{
        if(item){
            return res.status(200).json({success:true, message:'finance deleted'})
        }else{
            return res.status(404).json({success:false, message:'finance not found'})
        }
    }).catch(err=>{
        return res.status(400).json({success:false, message:err})
    })
};