const roleModel = require('../models/roleModel.js');

exports.addRole = async (req, res) =>{
    try{
        const simc = new roleModel({
            Role_name: req.body.role_name,
            Remarks: req.body.remark,
            Created_by: req.body.created_by
        })
        const simv = await simc.save();
        res.send({simv,status:200});
    } catch(err){
        res.status(500).send({error:err,sms:'This role cannot be created'})
    }
};

exports.getRoles = async (req, res) => {
    try{
        const simc = await roleModel.aggregate([
            {
                $lookup: {
                    from: 'usermodels',
                    localField: 'Created_by',
                    foreignField: 'user_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $project: {
                    _id: 1,
                    created_by_name: '$user.user_name',
                    Remarks: '$Remarks',
                    Role_name: '$Role_name',
                    Created_by: '$Created_by',
                    Role_id: '$Role_id'
                }
            }
        ]).exec();
        if(!simc){
            res.status(500).send({success:false})
        }
        res.status(200).send(simc)
    } catch(err){
        res.status(500).send({error:err,sms:'Error getting all roles'})
    }
};

exports.editRole = async (req, res) => {
    try{
        const editsim = await roleModel.findOneAndUpdate({Role_id:req.body.Role_id},{
            Role_name: req.body.role_name,
            Remarks: req.body.remark
        }, { new: true })
        if(!editsim){
            res.status(500).send({success:false})
        }
        res.status(200).send({success:true,data:editsim})
    } catch(err){
        res.status(500).send({error:err,sms:'Error updating role details'})
    }
};

exports.deleteRole = async (req, res) =>{
    roleModel.deleteOne({Role_id:req.params.Role_id}).then(item =>{
        if(item){
            return res.status(200).json({success:true, message:'role deleted'})
        }else{
            return res.status(404).json({success:false, message:'role not found'})
        }
    }).catch(err=>{
        return res.status(400).json({success:false, message:err})
    })
};
