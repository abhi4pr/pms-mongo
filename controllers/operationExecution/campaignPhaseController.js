const CampaignPhaseModel=require('../../models/operationExecution/campaignPhaseModel')
const PhaseCommitmentModel=require('../../models/operationExecution/phaseCommitmentModel')
const PhasePageModel=require('../../models/operationExecution/phasePageModel')

const appError=require('../../helper/appError');
const catchAsync=require('../../helper/catchAsync');

exports.createPhase=catchAsync(async (req,res,next) => {
    const {phaseName,campaignName,planName,description,campaignId,startDate,endDate,pages,commitment}=req.body
    let phaseData={phaseName,campaignName,planName,description,campaignId,startDate,endDate}
    const phaseResult=await CampaignPhaseModel.create(phaseData)

    for(i=0;i<pages.length;i++){

        let pageData={...pages[i],phaseId:phaseResult._id,phaseName,campaignId,planName,campaignName}
    
        const pageResult=await PhasePageModel.create(pageData)
    }

    for (i=0;i<commitment.length;i++){

        let commitmentData={
            ...commitment[i],phaseId:phaseResult._id,phaseName,campaignName,planName,campaignId
        }

        const commitmentResult=await PhaseCommitmentModel.create(commitmentData)
    }


    //sending response
    const page=await PhasePageModel.find({phaseId:phaseResult._id})
    const comm=await PhaseCommitmentModel.find({phaseId:phaseResult._id})
    res.send({ data: {phaseResult,page,comm}, status: 200 });


})


exports.getAllPhase=catchAsync(async (req,res,next)=>{

    const result=await CampaignPhaseModel.find({campaignId:req.params.id})
    res.send({ data:result,status:200 })
} )