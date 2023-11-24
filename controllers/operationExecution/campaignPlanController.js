const CampaignPlanModel = require('../../models/operationExecution/campaignPlanModel')
const appError=require('../../helper/appError');
const catchAsync=require('../../helper/catchAsync');

exports.createPlan=catchAsync(async (req,res,next) => {
    //will receive array of objects(pages),campaignId,vendor,campaignName,pageName

    const {pages,campaignId,campaignName,planName}=req.body
    for(let i=0;i<pages.length;i++){
        let data={
            planName,
            campaignId,
            
            campaignName,
            postRemaining:pages[i].postPerPage,
           ...pages[i]

        }
        const result=await CampaignPlanModel.create(data)
  
        
    }

    const doc=await CampaignPlanModel.find({campaignId: campaignId})
    res.send({ data: doc, status: 200 });
    //validation is remaining

})

exports.getPlan=catchAsync(async (req,res,next) => {
    const id=req.params.id
    const result=await CampaignPlanModel.find({campaignId: id})
    if(!result) {
        return next(new appError(404,"Campaign not found"))
    }
    res.send({ data: result, status: 200})
})
