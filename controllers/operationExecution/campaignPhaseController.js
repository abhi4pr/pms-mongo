const CampaignPhaseModel = require('../../models/operationExecution/campaignPhaseModel')
const PhaseCommitmentModel = require('../../models/operationExecution/phaseCommitmentModel')
const PhasePageModel = require('../../models/operationExecution/phasePageModel')

const appError = require('../../helper/appError');
const catchAsync = require('../../helper/catchAsync');
const campaignPlanModel = require('../../models/operationExecution/campaignPlanModel');
const campaignPhaseModel = require('../../models/operationExecution/campaignPhaseModel');

// in phase we have done the parent refrencing. here parent is campaign phase , 
// phasepages and phase commitments are refrencing towards the parent campaign phase  

exports.createPhase = catchAsync(async (req, res, next) => {
    const { phaseName, campaignName, planName, description, campaignId, startDate, endDate, pages, commitment } = req.body
    let phaseData = { phaseName, campaignName, planName, description, campaignId, startDate, endDate }
    //first we will create the campaign phase 
    const phaseResult = await CampaignPhaseModel.create(phaseData)

    //now we will create the phase pages which will be refrencing towards the parent campaign phase
    for (i = 0; i < pages.length; i++) {
        let { _id, ...rest } = pages[i]
        let pageData = { ...rest , phase_id: phaseResult.phase_id, phaseName, campaignId, planName, campaignName }

        const pageResult = await PhasePageModel.create(pageData)
    }

    //now we will create the commitment associated with the current phase 

    for (i = 0; i < commitment.length; i++) {

        let commitmentData = {
            ...commitment[i], phase_id: phaseResult.phase_id, phaseName, campaignName, planName, campaignId
        }

        const commitmentResult = await PhaseCommitmentModel.create(commitmentData)
    }

    //now we have to update in the plan and udate with the remaining pages

    pages.forEach(async page => {
        const result = await campaignPlanModel.findOneAndUpdate({ plan_id: page.plan_id }, { postRemaining: page.postRemaining }, { new: true })

    })


    //sending response
    const page = await PhasePageModel.find({ phaseId: phaseResult._id })
    const comm = await PhaseCommitmentModel.find({ phaseId: phaseResult._id })
    res.send({ data: { phaseResult, page, comm }, status: 200 });


})


exports.getAllPhase = catchAsync(async (req, res, next) => {
    //first find all the phase details

    const allPhase = await CampaignPhaseModel.find({ campaignId: req.params.id })

    
  const result = await Promise.all(
    allPhase.map(async (phase) => {
      const getPages = await PhasePageModel.find({ phase_id: phase.phase_id });
      const getComm = await PhaseCommitmentModel.find({ phase_id: phase.phase_id });
      return { ...phase.toObject(), pages: getPages, commitment: getComm };
    })
  );

  res.status(200).json({ result });



})

exports.getSinglePhase=catchAsync(async (req,res,next)=>{
    id=req.params.id;
    const phase=await campaignPhaseModel.findOne({phase_id:id});
    const getPages = await PhasePageModel.find({ phase_id: id });
    const getComm = await PhaseCommitmentModel.find({ phase_id: id });
    
    res.send({data:{...phase.toObject(),pages:getPages,commitment:getComm},status:200})
})

exports.updateBulk=catchAsync(async (req,res,next) => {
    //i need phase id
    //on basis of phaseid i will fetch all the pages associated with the phase
    //in the body i will have list of more pages
           //1. pages that are already in the plan
           //2. pages that are not in the plan
    //1.check if pages are not in the plan
            //get all the plan detail
            //find the subtraction of incoming pages and already existed pages.
            
            //if there is data in subtraction array ,then alson find the common 
                //add them to the plan 
            //else nothin
    //2.check if there is page which is not in the phase 
            //on basis of phaseid i will fetch all the pages associated with the phase

})