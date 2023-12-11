const appError=require('../../helper/appError');
const catchAsync=require('../../helper/catchAsync');
const ExpertiseModel=require('../../models/operationExecution/expertiseModel')


exports.createExpert=catchAsync(async (req,res,next) => {
 const {exp_name,user_id,area_of_expertise,created_by}=req.body
 const data={
    exp_name,user_id,area_of_expertise,created_by
 }

 const result=await ExpertiseModel.create(data)
 res.status(200).json({
    data: result
 })
})

exports.getAllExpert=catchAsync(async (req,res,next) => {
    const result=await ExpertiseModel.find()
    res.status(200).json({
        data: result
    })
})
exports.getSingleExpert=catchAsync(async (req,res,next) => {
    const id=req.params.id
    const result=await ExpertiseModel.findOne({exp_id:id})
    if(!result){
        return next(new appError(404,"expertise not found") )
    }
    res.status(200).json({
        data:result
    })
})
exports.updateExpert=catchAsync(async (req,res,next) => {

})
exports.deleteExpert=catchAsync(async (req,res,next) => {

})
