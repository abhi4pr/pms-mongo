const response = require('../../common/response');
const appError = require('../../helper/appError');
const catchAsync = require('../../helper/catchAsync');
const AssignmentModel = require('../../models/operationExecution/assignmentModel')
const campaignPlanModel = require('../../models/operationExecution/campaignPlanModel');
const PhasePageModel = require('../../models/operationExecution/phasePageModel');

exports.createAssignment = catchAsync(async (req, res, next) => {
    const { ass_to, ass_by, page, ass_status, ass_id } = req.body
    let { _id, ...rest } = page
    let status = ass_to ? ass_status : "unassigned"
    const data = {
        ass_by,
        ass_to,
        ass_status: status,
        ...rest
    }
    let result;
    if (!ass_id) {
        const assignment = await AssignmentModel.findOne({}, {}, { sort: { 'ass_id': -1 } });
        const lastAssId = assignment ? assignment.ass_id : 0;
        data.ass_id = lastAssId + 1;
        result = await AssignmentModel.create(data);
    } else {
        result = await AssignmentModel.findOneAndUpdate({ ass_id }, data, {
            upsert: true,
            new: true
        });
    }
    res.status(200).json({
        data: result
    })
})

exports.createAssignmentBulk = catchAsync(async (req, res, next) => {
    const { pages } = req.body
    const results = await Promise.all(
        pages.map(async page => {
            let { _id, ...rest } = page
            let status
            if(page.ass_to){
                if(page.ass_status=='unassigned'){
                    // console.log(page.page_name)
                    status='assigned'
                }else{
                    status=page.ass_status
                }
            }else status='unassigned'
            console.log(status)
            const data = {
                
                ...rest,
                ass_status: status,
            }
    
            let result;
            if (!page.ass_id) {
            
                const assignment = await AssignmentModel.findOne({}, {}, { sort: { 'ass_id': 0 } });
                const lastAssId = assignment ? assignment.ass_id : 0;
                data.ass_id = lastAssId + 1;
                result = await AssignmentModel.create(data);
                return {...result}
            } else {
         
                result = await AssignmentModel.findOneAndUpdate({ ass_id:page.ass_id }, data, {
                    // upsert: true,
                    new: true
                });
                return {...result}
            }
        })
    )

    res.status(200).json({
        data:results
    })
})

exports.getAllAssignmentToExpertee = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const results = await AssignmentModel.find()
    const result=results.filter(page=>page.ass_to?.user_id==id)
    res.status(200).json({
        data: result
    })
})

exports.getSingleAssignment = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const result = await AssignmentModel.find({ ass_id: id })
    if (!result) {
        return next(new appError(404, "assignment not found"))
    }
    res.status(200).json({
        data: result
    })
})

exports.getAllGodamnAssignments=catchAsync(async (req,res,next)=>{
    const result=await AssignmentModel.find()
    res.status(200).json({
        data:result
    })
})

exports.getAllAssignmentInPhase = catchAsync(async (req, res, next) => {
    const phase_id = req.params.id
    const result = await AssignmentModel.find({ phase_id: phase_id })
    if (!result) {
        res.status(200).json({
            data: []
        })
    }
    res.status(200).json({
        data: result
    })
})

exports.getAllAssignmentInCampaign=catchAsync(async(req,res,next)=>{
    const id=req.params.id
    const result=await AssignmentModel.find({campaignId:id})
    res.status(200).json({
        data:result
    })
})

exports.updateAssignment = catchAsync(async (req, res, next) => {
    const { campaignId, p_id, phase_id } = req.body
    const filter1 = { campaignId, p_id, phase_id };
    const filter2 = { campaignId, p_id };

    const options2 = {
        new: true, 
    };

    const result = await AssignmentModel.findOneAndUpdate(filter1, req.body, options2);
    if (!result) {
        const data = new AssignmentModel({
            ...req.body
        });
        const savedData = await data.save();
        if (!savedData) {
            return next(new appError(200, "Something went wrong while creating AssignmentModel data."))
        }
    }

    const result2 = await campaignPlanModel.findOneAndUpdate(filter2, { ...req.body, updatedFrom: "Assignment" }, options2);
    if (!result2) {
        const data = new campaignPlanModel({
            ...req.body
        });
        const savedData = await data.save();
        if (!savedData) {
            return next(new appError(200, "Something went wrong while creating plan data."))
        }

    }
    const result3 = await PhasePageModel.findOneAndUpdate(filter1, { ...req.body, updatedFrom: "Assignment" }, options2);
    return response.returnTrue(200, req, res, "Updation Operation Successfully.")
})

exports.updateAssignmentStatus=catchAsync(async (req,res,next) => {
    const {ass_status,campaignId,ass_id} = req.body
    const response=await AssignmentModel.findOneAndUpdate({ass_id,campaignId},{ass_status:ass_status},{new:true})
    res.status(200).json({data:response})
})

exports.updatePostDetails = catchAsync(async (req,res,next) => {
    const {
        ass_id,
        post_link, 
        post_date, 
        post_type, 
        post_like, 
        post_comment, 
        post_views, 
        post_captions, 
        post_media, 
        last_link_hit_date
    } = req.body;
    const response = await AssignmentModel.findOneAndUpdate({ass_id:req.body.ass_id},{
        post_like: req.body.post_like, 
        post_comment: req.body.post_comment, 
        post_views: req.body.post_views,
        last_link_hit_date: req.body.last_link_hit_date 
    },
    {
        new: true
    });
    res.status(200).json({data:response})
})