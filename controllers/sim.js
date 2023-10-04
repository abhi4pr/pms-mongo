const simModel = require('../models/simModel.js');
const simAlloModel = require('../models/simAlloModel.js')

exports.addSim = async (req, res) =>{
    try{
        const simc = new simModel({
            sim_no: req.body.sim_no,
            provider: req.body.provider,
            Remarks: req.body.Remarks,
            created_by: req.body.created_by,
            status: req.body.status,
            register: req.body.register,
            mobileNumber: req.body.mobileNumber,
            s_type: req.body.s_type,
            // Creation_date: req.body.Creation_date,
            desi: req.body.desi,
            dept: req.body.dept
        })
        const simv = await simc.save();
        res.send({simv,status:200});
    } catch(err){
        res.status(500).send({error:err,sms:'This sim cannot be created'})
    }
};

exports.getSims = async (req, res) => {
    try{
        const simc = await simModel.find();
        if(!simc){
            res.status(500).send({success:false})
        }
        res.status(200).send(simc)
    } catch(err){
        res.status(500).send({error:err,sms:'Error getting all sim datas'})
    }
};

exports.getSingleSim = async (req, res) => {
    try{
        const singlesim = await simModel.findById(req.params.sim_id);
        if(!singlesim){
            return res.status(500).send({success:false})
        }
        res.status(200).send(singlesim);
    } catch(err){
        res.status(500).send({error:err,sms:'Error getting sim details'})
    }
};

exports.editSim = async (req, res) => {
    try{
        const editsim = await simModel.findByIdAndUpdate(req.body.sim_id,{
            sim_no: req.body.sim_no,
            provider: req.body.provider,
            Remarks: req.body.Remarks,
            created_by: req.body.created_by,
            status: req.body.status,
            register: req.body.register,
            mobileNumber: req.body.mobileNumber,
            s_type: req.body.s_type,
            // Creation_date: req.body.Creation_date,
            desi: req.body.desi,
            dept: req.body.dept
        }, { new: true })
        if(!editsim){
            res.status(500).send({success:false})
        }
        res.status(200).send({success:true,data:editsim})
    } catch(err){
        res.status(500).send({error:err,sms:'Error updating sim details'})
    }
};

exports.deleteSim = async (req, res) =>{
    simModel.findByIdAndRemove(req.params.sim_id).then(item =>{
        if(item){
            return res.status(200).json({success:true, message:'sim deleted'})
        }else{
            return res.status(404).json({success:false, message:'sim not found'})
        }
    }).catch(err=>{
        return res.status(400).json({success:false, message:err})
    })
};

exports.addAllocation = async (req, res) =>{
    try{
        const simc = new simAlloModel({
            user_id: req.body.user_id,
            sim_id: req.body.sim_id,
            Remarks: req.body.Remarks,
            dept_id: req.body.dept_id,
            created_by: req.body.created_by,
            submitted_by: req.body.submitted_by,
            reason: req.body.reason,
            status: req.body.status,
            deleted_status: req.body.deleted_status
        })
        const simv = await simc.save();
        res.send({simv,status:200});
    } catch(err){
        res.status(500).send({error:err,sms:'This sim cannot allocate'})
    }
};

exports.getAllocations = async (req, res) => {
    try{
        const simc = await simAlloModel.find();
        if(!simc){
            res.status(500).send({success:false})
        }
        res.status(200).send(simc)
    } catch(err){
        res.status(500).send({error:err,sms:'Error getting all sim allocatinos'})
    }
};

exports.editAllocation = async (req, res) => {
    try{
        const editsim = await simAlloModel.findByIdAndUpdate(req.body.allo_id,{
            user_id: req.body.user_id,
            sim_id: req.body.sim_id,
            Remarks: req.body.Remarks,
            dept_id: req.body.dept_id,
            created_by: req.body.created_by,
            submitted_by: req.body.submitted_by,
            reason: req.body.reason,
            status: req.body.status,
            deleted_status: req.body.deleted_status
        }, { new: true })
        if(!editsim){
            res.status(500).send({success:false})
        }
        res.status(200).send({success:true,data:editsim})
    } catch(err){
        res.status(500).send({error:err,sms:'Error updating sim allocation'})
    }
};

exports.deleteAllocation = async (req, res) =>{
    simAlloModel.findByIdAndRemove(req.params.allo_id).then(item =>{
        if(item){
            return res.status(200).json({success:true, message:'sim allocation deleted'})
        }else{
            return res.status(404).json({success:false, message:'sim allocation not found'})
        }
    }).catch(err=>{
        return res.status(400).json({success:false, message:err})
    })
};