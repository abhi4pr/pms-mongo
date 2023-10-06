const contentManagementModel = require('../models/contentManagementModel.js');

exports.addcontentManagement = async (req, res) =>{
    try{
        const contentManagementc = new contentManagementModel({
            page_name: req.body.page_name,
            content_name: req.body.content_name,
            category: req.body.category,
            sub_category: req.body.sub_category,
            content: req.file.filename,
            reason: req.body.reason,
            status: req.body.status,
            caption: req.body.caption,
            uploaded_by : req.body.uploaded_by
        })
        const contentManagementv = await contentManagementc.save();
        res.send({contentManagementv,status:200});
    } catch(err){
        res.status(500).send({error:err,sms:'This contentManagement cannot be created'})
    }
};

exports.getcontentManagements = async (req, res) => {
    try{
        const simc = await contentManagementModel.find();
        if(!simc){
            res.status(500).send({success:false})
        }
        res.status(200).send(simc)
    } catch(err){
        res.status(500).send({error:err,sms:'Error getting all contentManagements'})
    }
};

exports.getContentManagementById = async (req, res) => {
    try {
      const fetchedData = await contentManagementModel.findOne({
        contentm_id: parseInt(req.params.id),
      });
      if (!fetchedData) {
        return res
          .status(200)
          .send({ success: false, data: {}, message: "No Record found" });
      } else {
        res.status(200).send({ data: fetchedData });
      }
    } catch (err) {
      res.status(500).send({
        error: err,
        message: "Error getting contentManagementModel details",
      });
    }
  };


exports.editcontentManagement = async (req, res) => {
    try{
        const editcontentmanagement = await contentManagementModel.findOneAndUpdate(req.body.id,{
            page_name: req.body.page_name,
            content_name: req.body.content_name,
            category: req.body.category,
            sub_category: req.body.sub_category,
            content: req.file.filename,
            reason: req.body.reason,
            status: req.body.status,
            caption: req.body.caption,
            uploaded_by : req.body.uploaded_by
        }, { new: true })
        if(!editcontentmanagement){
            res.status(500).send({success:false})
        }
        res.status(200).send({success:true,data:editcontentmanagement})
    } catch(err){
        res.status(500).send({error:err,sms:'Error updating contentManagement details'})
    }
};


exports.deletecontentManagement = async (req, res) =>{
    contentManagementModel.findByIdAndRemove(req.params.contentm_id).then(item =>{
        if(item){
            return res.status(200).json({success:true, message:'contentManagement deleted'})
        }else{
            return res.status(404).json({success:false, message:'contentManagement not found'})
        }
    }).catch(err=>{
        return res.status(400).json({success:false, message:err})
    })
};
