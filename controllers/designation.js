const designationModel = require('../models/designationModel.js');

exports.addDesignation = async (req, res) =>{
    try{
        const simc = new designationModel({
            desi_name: req.body.desi_name,
            dept_id: req.body.dept_id,
            remark: req.body.remark,
            created_by: req.body.created_by
        })
        const simv = await simc.save();
        res.send({simv,status:200});
    } catch(err){
        res.status(500).send({error:err,sms:'This designation cannot be created'})
    }
};

exports.getDesignations = async (req, res) => {
    try{
        const simc = await designationModel.aggregate([
            {
                $lookup: {
                    from: 'departmentmodels',
                    localField: 'dept_id',
                    foreignField: 'dept_id',
                    as: 'department'
                }
            },
            {
                $unwind: '$department'
            },
            {
                $project: {
                    _id: 1,
                    department_name: '$department.dept_name',
                    desi_name: '$desi_name',
                    dept_id: "$dept_id",
                    desi_id: "$desi_id",
                    id: "$id",
                    remark: "$remark"
                }
            }
        ]).exec();
        if(!simc){
            res.status(500).send({success:false})
        }
        res.status(200).send({success:true, data:simc})
    } catch(err){
        res.status(500).send({error:err,sms:'Error getting all designations'})
    }
};

exports.editDesignation = async (req, res) => {
    try{
        const editsim = await designationModel.findOneAndUpdate({desi_id:req.body.desi_id},{
            desi_name: req.body.desi_name,
            dept_id: req.body.dept_id,
            remark: req.body.remark,
            last_updated_by: req.body.last_updated_by,
            last_updated_at: req.body.last_updated_at
        }, { new: true })
        if(!editsim){
            res.status(500).send({success:false})
        }
        res.status(200).send({success:true,data:editsim})
    } catch(err){
        res.status(500).send({error:err,sms:'Error updating designation details'})
    }
};

exports.deleteDesignation = async (req, res) =>{
    designationModel.deleteOne({desi_id:req.params.desi_id}).then(item =>{
        if(item){
            return res.status(200).json({success:true, message:'designation deleted'})
        }else{
            return res.status(404).json({success:false, message:'designation not found'})
        }
    }).catch(err=>{
        return res.status(400).json({success:false, message:err})
    })
};