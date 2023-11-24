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
           ...pages[i]

        }
        const result=await CampaignPlanModel.create(data)
    }

    const doc=await CampaignPlanModel.find({campaignId: campaignId})
    res.send({ data: doc, status: 200 });
    //validation is remaining

})
