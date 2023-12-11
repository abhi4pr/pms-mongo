const appError=require('../../helper/appError');
const catchAsync=require('../../helper/catchAsync');
const AssignmentModel=require('../../models/operationExecution/assignmentModel')

exports.createAssignment=catchAsync(async (req,res,next) => {
    const {ass_to,ass_by,page,ass_status}=req.body
    let { _id, ...rest } = page
    const data={
        ass_by,
        ass_to,
        ass_status,
        ...rest
    }
    const result=await AssignmentModel.create(data)
    res.status(200).json({
        data:result
    })
})

exports.getAllAssignmentToExpertee=catchAsync(async (req,res,next) => {
    const id=req.params.id
    const result=await AssignmentModel.find({ass_to:id})
    // if(!result) {
    //     return next(new appError(404,"assignment not found"))
    // }
    res.status(200).json({
        data:result
    })
})
exports.getSingleAssignment=catchAsync(async (req,res,next) => {
    const id=req.params.id
    const result=await AssignmentModel.find({ass_id:id})
    if(!result) {
        return next(new appError(404,"assignment not found"))
    }
    res.status(200).json({
        data:result
    })
})
exports.updateAssignment=catchAsync(async (req,res,next) => {

})
exports.deleteAssignment=catchAsync(async (req,res,next) => {

})