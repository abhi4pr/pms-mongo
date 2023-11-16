const simModel = require('../models/simModel.js');
const simAlloModel = require('../models/simAlloModel.js')
const userModel = require('../models/userModel.js');

exports.addSim = async (req, res) =>{
    try{
        const simc = new simModel({
            sim_no: req.body.sim_no,
            provider: req.body.provider,
            Remarks: req.body.remark,
            created_by: req.body.created_by,
            status: req.body.status,
            register: req.body.register,
            mobileNumber: req.body.mobileNumber,
            s_type: req.body.s_type,
            desi: req.body.desi_id,
            dept: req.body.dept_id,
            type: req.body.type
        })
        const simv = await simc.save();
        res.send({simv,status:200});
    } catch(err){
        res.status(500).send({error:err,sms:'This sim cannot be created'})
    }
};

exports.getSims = async (req, res) => {
    try{
        const simc = await simModel.aggregate([
            {
                $lookup: {
                    from: 'departmentmodels',
                    localField: 'dept',
                    foreignField: 'dept_id',
                    as: 'department'
                }
            },
            {
                $unwind: '$department'
            },
            {
                $lookup: {
                    from: 'designationmodels',
                    localField: 'desi',
                    foreignField: 'desi_id',
                    as: 'designation'
                }
            },
            {
                $unwind: '$designation'
            },
            {
                $project: {
                    department_name: '$department.dept_name',
                    designation: '$designation.desi_name',
                    _id: "$_id",
                    sim_no: "$sim_no",
                    provider: "$provider",
                    Remarks: "$Remarks",
                    created_by: "$created_by",
                    status: "$status",
                    register: "$register",
                    mobileNumber: "$mobileNumber",
                    s_type: "$s_type",
                    desi: "$desi",
                    dept: "$dept",
                    sim_id: "$sim_id",
                    type: "$type",
                    date_difference: {
                        $cond: [
                          {
                            $and: [
                              { $eq: ["$status", "Allocated"] },
                              { $eq: ["$allocation.submitted_at", null] }
                            ]
                          },
                          {
                            $subtract: [new Date(), "$Last_updated_date"]
                          },
                          null
                        ]
                    }
                }
            }
        ]).exec();

        const uniqueIds = new Set();
        const uniqueData = simc.filter(item => {
            const id = item._id.toString();
            if (!uniqueIds.has(id)) {
                uniqueIds.add(id);
                return true;
            }
            return false;
        });

        if(!simc){
            res.status(500).send({success:false})
        }
        res.status(200).send({data:uniqueData})
    } catch(err){
        res.status(500).send({error:err.message,sms:'Error getting all sim datas'})
    }
};

exports.getSingleSim = async (req, res) => {
    try{
        const singlesim = await simModel.findOne({sim_id:parseInt(req.params.id)});
        if(!singlesim){
            return res.status(500).send({success:false})
        }
        res.status(200).send({data:singlesim});
    } catch(err){
        res.status(500).send({error:err,sms:'Error getting sim details'})
    }
};

exports.editSim = async (req, res) => {
    try{
        const editsim = await simModel.findOneAndUpdate({sim_id:req.body.id},{
            sim_no: req.body.sim_no,
            provider: req.body.provider,
            Remarks: req.body.remark,
            created_by: req.body.created_by,
            status: req.body.status,
            register: req.body.register,
            mobileNumber: req.body.mobilenumber,
            s_type: req.body.s_type,
            desi: req.body.desi_id,
            dept: req.body.dept_id,
            type: req.body.type
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
    simModel.deleteOne({sim_id:req.params.id}).then(item =>{
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
            deleted_status: req.body.deleted_status,
            submitted_at: req.body.submitted_at
        })
        const simv = await simc.save();
        res.send({simv,status:200});
    } catch(err){
        res.status(500).send({error:err,sms:'This sim cannot allocate'})
    }
};

exports.getAllocations = async (req, res) => {
    try{
        const simc = await simAlloModel.aggregate([
            {
                $lookup: {
                    from: 'usermodels',
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: 'user'
                }
            },
            // {
            //     $unwind: '$user'
            // },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'simmodels',
                    localField: 'sim_id',
                    foreignField: 'sim_id',
                    as: 'sim'
                }
            },
            // {
            //     $unwind: '$sim'
            // },
            {
                $unwind: {
                    path: "$sim",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'departmentmodels',
                    localField: 'dept_id',
                    foreignField: 'dept_id',
                    as: 'department'
                }
            },
            // {
            //     $unwind: '$department'
            // },
            {
                $unwind: {
                    path: "$department",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                  from: "designationmodels",
                  localField: "user.user_designation",
                  foreignField: "desi_id",
                  as: "designation"
                }
            },
            // {
            //     $unwind: "$designation"
            // },
            {
                $unwind: {
                    path: "$designation",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    dept_name: '$department.dept_name',
                    desi_name: '$designation.desi_name',
                    _id: "$_id",
                    user_id: "$user.user_id",
                    sim_no: "$sim_no",
                    provider: "$provider",
                    Remarks: "$Remarks",
                    created_by: "$created_by",
                    status: "$status",
                    register: "$register",
                    mobileNo: "$sim.mobileNumber",
                    userName: "$user.user_name",
                    user_name: "$user.user_name",
                    s_type: "$s_type",
                    desi: "$desi",
                    dept: "$dept",
                    sim_id: "$sim_id",
                    type: "$type",
                    allo_id: "$allo_id",
                    submitted_at: "$submitted_at"
                }
            }
        ]).exec();
        if(!simc){
            res.status(500).send({success:false})
        }
        res.status(200).send({data:simc})
    } catch(err){
        res.status(500).send({error:err,sms:'Error getting all sim allocatinos'})
    }
};

exports.getAllocationDataByAlloId = async (req, res) => {
    try{
        const simc = await simAlloModel.aggregate([
            {
                $match:{ allo_id: parseInt(req.params.id)}
            },
            {
                $lookup: {
                    from: 'simmodels',
                    localField: 'sim_id',
                    foreignField: 'sim_id',
                    as: 'sim'
                }
            },
            {
                $unwind: '$sim'
            },
            {
                $lookup: {
                    from: 'usermodels',
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $project: {
                    userName: '$user.user_name',
                    _id: "$_id",
                    // sim_no: "$sim_no",
                    provider: "$provider",
                    Remarks: "$Remarks",
                    created_by: "$created_by",
                    status: "$status",
                    register: "$register",
                    mobileNo: "$sim.mobileNumber",
                    s_type: "$s_type",
                    desi: "$desi",
                    dept: "$dept",
                    sim_id: "$sim_id",
                    type: "$type",
                    allo_id: "$allo_id",
                    submitted_at: "$submitted_at"
                }
            }
        ]).exec();

        if(!simc){
            res.status(500).send({success:false})
        }
        res.status(200).send({data:simc[0]})
    } catch(err){
        res.status(500).send({error:err.message,sms:'Error getting all sim datas'})
    }
};

exports.editAllocation = async (req, res) => {
    try{
        const editsim = await simAlloModel.findOneAndUpdate({allo_id:req.body.allo_id},{
            user_id: req.body.user_id,
            sim_id: req.body.sim_id,
            Remarks: req.body.Remarks,
            dept_id: req.body.dept_id,
            created_by: req.body.created_by,
            submitted_by: req.body.submitted_by,
            reason: req.body.reason,
            status: req.body.status,
            deleted_status: req.body.deleted_status,
            submitted_at: req.body.submitted_at
        }, { new: true })
        if(!editsim){
            res.status(500).send({success:false})
        }
        res.status(200).send({success:true,data:editsim})
    } catch(err){
        res.status(500).send({error:err.message,sms:'Error updating sim allocation'})
    }
};

exports.deleteAllocation = async (req, res) =>{
    simAlloModel.deleteOne(req.params.allo_id).then(item =>{
        if(item){
            return res.status(200).json({success:true, message:'sim allocation deleted'})
        }else{
            return res.status(404).json({success:false, message:'sim allocation not found'})
        }
    }).catch(err=>{
        return res.status(400).json({success:false, message:err})
    })
};

exports.getSimAllocationDataById = async (req, res) => {
    try{
        const simc = await simAlloModel.aggregate([
            {
                $match:{sim_id:parseInt(req.params.id),deleted_status:0}
            },
            {
                $lookup: {
                    from: 'usermodels',
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $lookup: {
                    from: 'simmodels',
                    localField: 'sim_id',
                    foreignField: 'sim_id',
                    as: 'sim'
                }
            },
            {
                $unwind: '$sim'
            },
            {
                $project: {
                    _id: "$_id",
                    sim_no: "$sim_no",
                    Remarks: "$Remarks",
                    created_by: "$created_by",
                    Creation_date: "$sim.Creation_date",
                    Last_updated_date: "$sim.Last_updated_date",
                    status: "$status",
                    mobile_number: "$sim.mobileNumber",
                    userName: "$user.user_name",
                    sim_id: "$sim_id",
                    allo_id: "$allo_id",
                    submitted_at: "$sim.submitted_at",
                    reason: "$reason"
                }
            }
        ]).exec();
        if(!simc){
            res.status(500).send({success:false})
        }
        res.status(200).send(simc)
    } catch(err){
        res.status(500).send({error:err,sms:'Error getting all sim allocatinos'})
    }
};