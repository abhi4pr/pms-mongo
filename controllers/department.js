const departmentModel = require('../models/departmentModel.js');
const subDepartmentModel = require('../models/subDepartmentModel.js');

exports.addDepartment = async (req, res) =>{
    try{
        const simc = new departmentModel({
            dept_name: req.body.dept_name,
            Remarks: req.body.Remarks,
            Created_by: req.body.Created_by,
            Creation_date: req.body.Creation_date
        })
        const simv = await simc.save();
        res.send({simv,status:200});
    } catch(err){
        res.status(500).send({error:err,sms:'This department cannot be created'})
    }
};

exports.getDepartments = async (req, res) => {
    try{
        const simc = await departmentModel.find();
        if(!simc){
            res.status(500).send({success:false})
        }
        res.status(200).send(simc)
    } catch(err){
        res.status(500).send({error:err,sms:'Error getting all departments'})
    }
};

exports.getSingleDepartment = async (req, res) => {
    try{
        const singlesim = await departmentModel.findOne({dept_id:req.params.dept_id});
        if(!singlesim){
            return res.status(500).send({success:false})
        }
        res.status(200).send(singlesim);
    } catch(err){
        res.status(500).send({error:err,sms:'Error getting department details'})
    }
};

exports.editDepartment = async (req, res) => {
    try{
        const editsim = await departmentModel.findOneAndUpdate({dept_id:req.body.dept_id},{
            dept_name: req.body.cat_name,
            Remarks: req.body.Remarks,
            Created_by: req.body.Created_by,
            Creation_date: req.body.Creation_date
        }, { new: true })
        if(!editsim){
            res.status(500).send({success:false})
        }
        res.status(200).send({success:true,data:editsim})
    } catch(err){
        res.status(500).send({error:err,sms:'Error updating department details'})
    }
};

exports.deleteDepartment = async (req, res) =>{
    departmentModel.deleteOne({dept_id:req.params.dept_id}).then(item =>{
        if(item){
            return res.status(200).json({success:true, message:'department deleted'})
        }else{
            return res.status(404).json({success:false, message:'department not found'})
        }
    }).catch(err=>{
        return res.status(400).json({success:false, message:err})
    })
};

exports.addSubDepartment = async (req, res) =>{
    try{
        const simc = new subDepartmentModel({
            sub_dept_name: req.body.sub_dept_name,
            dept_id: req.body.dept_id,
            remark: req.body.remark,
            created_by: req.body.created_by,
            creation_at: req.body.creation_at
        })
        const simv = await simc.save();
        res.send({simv,status:200});
    } catch(err){
        res.status(500).send({error:err,sms:'This sub department cannot be created'})
    }
};

exports.editSubDepartment = async (req, res) => {
    try{
        const editsim = await subDepartmentModel.findOneAndUpdate({id:req.body.id},{
            sub_dept_name: req.body.sub_dept_name,
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
        res.status(500).send({error:err,sms:'Error updating sub department details'})
    }
};

exports.deleteSubDepartment = async (req, res) =>{
    departmentModel.deleteOne({id:req.params.id}).then(item =>{
        if(item){
            return res.status(200).json({success:true, message:'sub department deleted'})
        }else{
            return res.status(404).json({success:false, message:'sub department not found'})
        }
    }).catch(err=>{
        return res.status(400).json({success:false, message:err})
    })
};