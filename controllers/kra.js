const userModel = require('../models/userModel.js');
const kraTransModel = require('../models/kraTransModel.js');
const jobResponsibilityModel = require("../models/jobResponsibilityModel.js");

exports.addKra = async (req, res) => {
    try {
        const krac = new kraTransModel({
            user_to_id: req.body.user_to_id,
            user_from_id: req.body.user_from_id,
            job_responsibility_id: req.body.job_responsibility_id,
            remark: req.body.remark,
            Created_by: req.body.Created_by,
            Job_res_id: req.body.Job_res_id
        })

        const krav = await krac.save();
        await kraTransModel.updateOne(
            { Job_res_id: Job_res_id },
            { user_id: user_to_id }
        );

        res.status(200).send(krav, "KRA added and user_id updated successfully");
    } catch (err) {
        res.status(500).send({ error: err, sms: 'This kra cannot be created' })
    }
};


exports.getJobResponById = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const ImageUrl = 'http://34.93.135.33:8080/uploads/';
        const userJobResponsi = await jobResponsibilityModel.aggregate([
            {
                $match: { user_id: user_id },
            },
            {
                $lookup: {
                    from: "user_mast",
                    localField: "user_id",
                    foreignField: "user_id",
                    as: "user_info",
                },
            },
            {
                $unwind: "$user_info",
            },
            {
                $lookup: {
                    from: "dept_mast",
                    localField: "user_info.dept_id",
                    foreignField: "dept_id",
                    as: "department",
                },
            },
            {
                $lookup: {
                    from: "designation_mast",
                    localField: "user_info.user_designation",
                    foreignField: "desi_id",
                    as: "designation",
                },
            },
            {
                $project: {
                    _id: 0,
                    user_id: 1,
                    job_responsibility_id: 1,
                    user_name: "$user_info.user_name",
                    user_email_id: "$user_info.user_email_id",
                    department_name: "$department.dept_name",
                    designation_name: "$designation.desi_name",
                    image: ImageUrl + '$image',
                    UID: ImageUrl + '$UID',
                    pan: ImageUrl + '$pan',
                    highest_upload: ImageUrl + '$highest_upload',
                    other_upload: ImageUrl + '$other_upload'
                }
            },
        ]);
        res.status(200).send(userJobResponsi);
    } catch (error) {
        res.status(500).send({error:err,sms:'Error getting all kras'})
    }
}


exports.getKras = async (req,res) => {
    try {
        const kraData = await KraTransModel.aggregate([
          {
            $lookup: {
              from: "user_mast",
              localField: "user_to_id",
              foreignField: "user_id",
              as: "user_to_info",
            },
          },
          {
            $lookup: {
              from: "user_mast",
              localField: "user_from_id",
              foreignField: "user_id",
              as: "user_from_info",
            },
          },
          {
            $project: {
              _id: 1,
              user_to_id: 1,
              user_from_id:1,
              job_responsibility_id:1,
              remark:1,
              Created_by: 1,
              Job_res_id: 1, 
              user_to_name: "$user_to_info.user_name",
              user_from_name: "$user_from_info.user_name",
            },
          },
        ]);
    
        res.send({ data: kraData });
      } catch (error) {
        console.error(error);
        res.sendStatus(500);
      }
    
    
}