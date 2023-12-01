const simModel = require("../models/simModel.js");
const simAlloModel = require("../models/simAlloModel.js");
const userModel = require("../models/userModel.js");

exports.addSim = async (req, res) => {
  try {
    const nextHrDate = new Date();
    nextHrDate.setDate(nextHrDate.getDate() + 30);
    const updatedDateString = nextHrDate.toISOString();

    const nextSelfDate = new Date();
    nextSelfDate.setDate(nextSelfDate.getDate() + 30);
    const updatedDateString2 = nextSelfDate.toISOString();

    const simc = new simModel({
      sim_no: req.body.sim_no,
      Remarks: req.body.remark,
      created_by: req.body.created_by,
      status: req.body.status,
      s_type: req.body.s_type,
      assetsName: req.body.assetsName,
      assetsOtherID: req.body.assetsOtherID,
      category_id: req.body.category_id,
      sub_category_id: req.body.sub_category_id,
      vendor_id: req.body.vendor_id,
      inWarranty: req.body.inWarranty || "",
      warrantyDate: req.body.warrantyDate || "",
      dateOfPurchase: req.body.dateOfPurchase || "",
      selfAuditPeriod: req.body.selfAuditPeriod || 0,
      hrAuditPeriod : req.body.hrAuditPeriod || 0,
      selfAuditUnit: req.body.selfAuditUnit || 0,
      hrAuditUnit: req.body.hrAuditUnit || 0,
      invoiceCopy: req.file?.filename,
      assetsValue: req.body.assetsValue,
      assetsCurrentValue: req.body.assetsCurrentValue,
      last_hr_audit_date : req.body.last_hr_audit_date,
      last_self_audit_date: req.body.last_self_audit_date,
      next_hr_audit_date: updatedDateString,
      next_self_audit_date: updatedDateString2
    });
    const simv = await simc.save();
    res.send({ simv, status: 200 });
  } catch (err) {
    res
      .status(500)
      .send({ error: err.message, sms: "This sim cannot be created" });
  }
};

// exports.getSims = async (req, res) => {
//     try{
//         const simc = await simModel.aggregate([
//             {
//                 $lookup: {
//                     from: 'departmentmodels',
//                     localField: 'dept',
//                     foreignField: 'dept_id',
//                     as: 'department'
//                 }
//             },
//             {
//                 $unwind: '$department'
//             },
//             {
//                 $lookup: {
//                     from: 'designationmodels',
//                     localField: 'desi',
//                     foreignField: 'desi_id',
//                     as: 'designation'
//                 }
//             },
//             {
//                 $unwind: '$designation'
//             },
//             {
//                 $project: {
//                     department_name: '$department.dept_name',
//                     designation: '$designation.desi_name',
//                     _id: "$_id",
//                     sim_no: "$sim_no",
//                     provider: "$provider",
//                     Remarks: "$Remarks",
//                     created_by: "$created_by",
//                     status: "$status",
//                     register: "$register",
//                     mobileNumber: "$mobileNumber",
//                     s_type: "$s_type",
//                     desi: "$desi",
//                     dept: "$dept",
//                     sim_id: "$sim_id",
//                     type: "$type",
//                     date_difference: {
//                         $cond: [
//                           {
//                             $and: [
//                               { $eq: ["$status", "Allocated"] },
//                               { $eq: ["$allocation.submitted_at", null] }
//                             ]
//                           },
//                           {
//                             $subtract: [new Date(), "$Last_updated_date"]
//                           },
//                           null
//                         ]
//                     }
//                 }
//             }
//         ]).exec();

//         const uniqueIds = new Set();
//         const uniqueData = simc.filter(item => {
//             const id = item._id.toString();
//             if (!uniqueIds.has(id)) {
//                 uniqueIds.add(id);
//                 return true;
//             }
//             return false;
//         });

//         if(!simc){
//             res.status(500).send({success:false})
//         }
//         res.status(200).send({data:uniqueData})
//     } catch(err){
//         res.status(500).send({error:err.message,sms:'Error getting all sim datas'})
//     }
// };

exports.getSims = async (req, res) => {
  try {
    const assetsImagesUrl = "http://34.93.135.33:8080/uploads/";
    const simc = await simModel
      .aggregate([
        {
          $lookup: {
            from: "usermodels",
            localField: "user_id",
            foreignField: "user_id",
            as: "userdata",
          },
        },
        {
          $unwind: {
            path: "$userdata",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "assetscategorymodels",
            localField: "category_id",
            foreignField: "category_id",
            as: "category",
          },
        },
        {
          $unwind: {
            path: "$category",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "assetssubcategorymodels",
            localField: "sub_category_id",
            foreignField: "sub_category_id",
            as: "subcategory",
          },
        },
        {
          $unwind: {
            path: "$subcategory",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "vendormodels",
            localField: "vendor_id",
            foreignField: "vendor_id",
            as: "vendor",
          },
        },
        {
          $unwind: {
            path: "$vendor",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "usermodels",
            localField: "created_by",
            foreignField: "user_id",
            as: "user",
          },
        },
        {
          $unwind: {
            path: "$user",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "simallomodels",
            localField: "sim_id",
            foreignField: "sim_id",
            as: "simallocation",
          },
        },
        {
          $unwind: {
            path: "$simallocation",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "usermodels",
            localField: "simallocation.user_id",
            foreignField: "user_id",
            as: "allocated_username",
          },
        },
        {
          $unwind: {
            path: "$allocated_username",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: "$_id",
            sim_id: "$sim_id",
            user_id: "$user_id",
            asset_id: "$sim_no",
            status: "$status",
            asset_type: "$s_type",
            assetsName: "$assetsName",
            assetsOtherID: "$assetsOtherID",
            category_id: "$category_id",
            sub_category_id: "$sub_category_id",
            vendor_id: "$vendor_id",
            inWarranty: "$inWarranty",
            warrantyDate: "$warrantyDate",
            dateOfPurchase: "$dateOfPurchase",
            hrAuditPeriod: "$hrAuditPeriod",
            hrAuditUnit: "$hrAuditUnit",
            selfAuditPeriod: "$selfAuditPeriod",
            selfAuditUnit: "$selfAuditUnit",
            invoiceCopy: "$invoiceCopy",
            assetsValue: "$assetsValue",
            created_by: "$created_by",
            assetsCurrentValue: "$assetsCurrentValue",
            Remarks:"$Remarks",
            user_name: "$userdata.user_name",
            category_name: "$category.category_name",
            sub_category_name: "$subcategory.sub_category_name",
            vendor_name: "$vendor.vendor_name",
            created_by_name: "$user.user_name",
            allocated_username: "$allocated_username.user_name",
            Last_updated_date: "$Last_updated_date",
            invoiceCopy_url: { $concat: [assetsImagesUrl, "$invoiceCopy"] },
            submitted_at: "$simallocation.submitted_at",
            date_difference: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$status", "Allocated"] },
                    { $eq: ["$simallocation.submitted_at", null] },
                  ],
                },
                {
                  $subtract: [new Date(), "$Last_updated_date"],
                },
                null,
              ],
            },
          },
        },
      ])
      .exec();

    // const uniqueIds = new Set();
    // const uniqueData = simc.filter((item) => {
    //   const id = item._id.toString();
    //   if (!uniqueIds.has(id)) {
    //     uniqueIds.add(id);
    //     return true;
    //   }
    //   return false;
    // });

    // if (!simc) {
    //   res.status(500).send({ success: false });
    // }
    // res.status(200).send({ data: uniqueData });
    if (!simc) {
      return res.status(500).json({ success: false, message: "No data found" });
    }

    const uniqueData = Array.from(new Set(simc.map((item) => item._id))).map(
      (sim_id) => simc.find((item) => item._id === sim_id)
    );

    res.status(200).json({ data: uniqueData });
  } catch (err) {
    res
      .status(500)
      .send({ error: err.message, sms: "Error getting all sim datas" });
  }
};

exports.getSingleSim = async (req, res) => {
  try {
    const singlesim = await simModel.findOne({
      sim_id: parseInt(req.params.id),
    });
    if (!singlesim) {
      return res.status(500).send({ success: false });
    }
    res.status(200).send({ data: singlesim });
  } catch (err) {
    res.status(500).send({ error: err, sms: "Error getting sim details" });
  }
};

exports.editSim = async (req, res) => {
  try {
    const editsim = await simModel.findOneAndUpdate(
      { sim_id: req.body.id },
      {
        sim_no: req.body.sim_no,
        Remarks: req.body.remark,
        created_by: req.body.created_by,
        status: req.body.status,
        asset_type: req.body.s_type,
        assetsName: req.body.assetsName,
        assetsOtherID: req.body.assetsOtherID,
        category_id: req.body.category_id,
        sub_category_id: req.body.sub_category_id,
        vendor_id: req.body.vendor_id,
        inWarranty: req.body.inWarranty || "",
        warrantyDate: req.body.warrantyDate || "",
        dateOfPurchase: req.body.dateOfPurchase || "",
        selfAuditPeriod: req.body.selfAuditPeriod || 0,
        hrAuditPeriod: req.body.hrAuditPeriod || 0,
        selfAuditUnit: req.body.selfAuditUnit || 0,
        hrAuditUnit: req.body.hrAuditUnit || 0,
        invoiceCopy: req.file?.filename,
        assetsValue: req.body.assetsValue,
        assetsCurrentValue: req.body.assetsCurrentValue,
      },
      { new: true }
    );
    if (!editsim) {
      res.status(500).send({ success: false });
    }
    res.status(200).send({ success: true, data: editsim });
  } catch (err) {
    res
      .status(500)
      .send({ error: err.message, sms: "Error updating sim details" });
  }
};

exports.deleteSim = async (req, res) => {
  simModel
    .deleteOne({ sim_id: req.params.id })
    .then((item) => {
      if (item) {
        return res.status(200).json({ success: true, message: "sim deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "sim not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, message: err });
    });
};

exports.addAllocation = async (req, res) => {
  try {
    const simc = new simAlloModel({
      user_id: req.body.user_id,
      sim_id: req.body.sim_id,
      category_id: req.body.category_id,
      sub_category_id: req.body.sub_category_id,
      Remarks: req.body.Remarks,
      // dept_id: req.body.dept_id,
      created_by: req.body.created_by,
      submitted_by: req.body.submitted_by,
      reason: req.body.reason,
      status: req.body.status,
      deleted_status: req.body.deleted_status,
      submitted_at: req.body.submitted_at,
    });
    const simv = await simc.save();
    res.send({ simv, status: 200 });
  } catch (err) {
    res.status(500).send({ error: err, sms: "This sim cannot allocate" });
  }
};

exports.getAllocations = async (req, res) => {
  try {
    const simc = await simAlloModel
      .aggregate([
        {
          $lookup: {
            from: "usermodels",
            localField: "user_id",
            foreignField: "user_id",
            as: "user",
          },
        },
        {
          $unwind: {
            path: "$user",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "simmodels",
            localField: "sim_id",
            foreignField: "sim_id",
            as: "sim",
          },
        },
        {
          $unwind: {
            path: "$sim",
            preserveNullAndEmptyArrays: true,
          },
        },
        // {
        //   $lookup: {
        //     from: "simmodels",
        //     localField: "sim_id",
        //     foreignField: "sim_id",
        //     as: "sim",
        //   },
        // },
        // // {
        // //     $unwind: '$sim'
        // // },
        // {
        //   $unwind: {
        //     path: "$sim",
        //     preserveNullAndEmptyArrays: true,
        //   },
        // },
        // {
        //     $lookup: {
        //         from: 'departmentmodels',
        //         localField: 'dept_id',
        //         foreignField: 'dept_id',
        //         as: 'department'
        //     }
        // },
        // // {
        // //     $unwind: '$department'
        // // },
        // {
        //     $unwind: {
        //         path: "$department",
        //         preserveNullAndEmptyArrays: true
        //     }
        // },
        // {
        //     $lookup: {
        //         from: "designationmodels",
        //         localField: "user.user_designation",
        //         foreignField: "desi_id",
        //         as: "designation"
        //     }
        // },
        // // {
        // //     $unwind: "$designation"
        // // },
        // {
        //     $unwind: {
        //         path: "$designation",
        //         preserveNullAndEmptyArrays: true
        //     }
        // },
        {
          $project: {
            // dept_name: '$department.dept_name',
            // desi_name: '$designation.desi_name',
            _id: "$_id",
            user_id: "$user_id",
            sim_no: "$sim_no",
            assetsName: "$sim.assetsName",
            // provider: "$provider",
            Remarks: "$Remarks",
            created_by: "$created_by",
            status: "$status",
            // register: "$register",
            // mobileNo: "$sim.mobileNumber",
            user_name: "$user.user_name",
            s_type: "$s_type",
            // desi: "$desi",
            // dept: "$dept",
            sim_id: "$sim_id",
            type: "$type",
            allo_id: "$allo_id",
            submitted_at: "$submitted_at",
          },
        },
      ])
      .exec();
    if (!simc) {
      res.status(500).send({ success: false });
    }
    res.status(200).send({ data: simc });
  } catch (err) {
    res
      .status(500)
      .send({ error: err, sms: "Error getting all sim allocatinos" });
  }
};

exports.getAllocationDataByAlloId = async (req, res) => {
  try {
    const simc = await simAlloModel
      .aggregate([
        {
          $match: { allo_id: parseInt(req.params.id) },
        },
        // {
        //     $lookup: {
        //         from: 'simmodels',
        //         localField: 'sim_id',
        //         foreignField: 'sim_id',
        //         as: 'sim'
        //     }
        // },
        // {
        //     $unwind: '$sim'
        // },
        {
          $lookup: {
            from: "usermodels",
            localField: "user_id",
            foreignField: "user_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $project: {
            _id: "$_id",
            sim_no: "$sim_no",
            // provider: "$provider",
            Remarks: "$Remarks",
            created_by: "$created_by",
            status: "$status",
            // register: "$register",
            // mobileNo: "$sim.mobileNumber",
            s_type: "$s_type",
            // desi: "$desi",
            // dept: "$dept",
            sim_id: "$sim_id",
            type: "$type",
            allo_id: "$allo_id",
            submitted_at: "$submitted_at",
            deleted_status: "$deleted_status",
            userName: "$user.user_name",
          },
        },
      ])
      .exec();

    if (!simc) {
      res.status(500).send({ success: false });
    }
    res.status(200).send({ data: simc[0] });
  } catch (err) {
    res
      .status(500)
      .send({ error: err.message, sms: "Error getting all sim datas" });
  }
};

exports.editAllocation = async (req, res) => {
  try {
    const editsim = await simAlloModel.findOneAndUpdate(
      { allo_id: req.body.allo_id },
      {
        user_id: req.body.user_id,
        sim_id: req.body.sim_id,
        Remarks: req.body.Remarks,
        // dept_id: req.body.dept_id,
        created_by: req.body.created_by,
        submitted_by: req.body.submitted_by,
        reason: req.body.reason,
        status: req.body.status,
        deleted_status: req.body.deleted_status,
        submitted_at: req.body.submitted_at,
      },
      { new: true }
    );
    if (!editsim) {
      res.status(500).send({ success: false });
    }
    res.status(200).send({ success: true, data: editsim });
  } catch (err) {
    res
      .status(500)
      .send({ error: err.message, sms: "Error updating sim allocation" });
  }
};

exports.deleteAllocation = async (req, res) => {
  simAlloModel
    .deleteOne(req.params.allo_id)
    .then((item) => {
      if (item) {
        return res
          .status(200)
          .json({ success: true, message: "sim allocation deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "sim allocation not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, message: err });
    });
};

exports.getSimAllocationDataById = async (req, res) => {
  try {
    const simc = await simAlloModel
      .aggregate([
        {
          $match: { sim_id: parseInt(req.params.id), deleted_status: 0 },
        },
        {
          $lookup: {
            from: "usermodels",
            localField: "user_id",
            foreignField: "user_id",
            as: "user",
          },
        },
        {
          $unwind: {
            path: "$user",
            preserveNullAndEmptyArrays: true,
          },
        },
        // {
        //   $unwind: "$user",
        // },
        {
          $lookup: {
            from: "simmodels",
            localField: "sim_id",
            foreignField: "sim_id",
            as: "sim",
          },
        },
        // {
        //   $unwind: "$sim",
        // },
        {
          $unwind: {
            path: "$sim",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: "$_id",
            sim_no: "$sim_no",
            assetsName: "$sim.assetsName",
            Remarks: "$Remarks",
            created_by: "$created_by",
            Creation_date: "$sim.Creation_date",
            Last_updated_date: "$sim.Last_updated_date",
            status: "$status",
            // mobile_number: "$sim.mobileNumber",
            userName: "$user.user_name",
            sim_id: "$sim_id",
            allo_id: "$allo_id",
            reason: "$reason",
            submitted_at: "$submitted_at",
          },
        },
      ])
      .exec();
    if (!simc) {
      res.status(500).send({ success: false });
    }
    res.status(200).send(simc);
  } catch (err) {
    res
      .status(500)
      .send({ error: err, sms: "Error getting all sim allocatinos" });
  }
};

exports.alldataofsimallocment = async (req, res) => {
  try {
    const simc = await simAlloModel.aggregate([
      {
        $lookup: {
          from: "simmodels",
          localField: "sim_id",
          foreignField: "sim_id",
          as: "sim",
        },
      },
      {
        $unwind: {
          path: "$sim",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "usermodels",
          localField: "user_id",
          foreignField: "user_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "assetscategorymodels",
          localField: "category_id",
          foreignField: "category_id",
          as: "category",
        },
      },
      {
        $unwind: {
          path: "$category",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "assetssubcategorymodels",
          localField: "sub_category_id",
          foreignField: "sub_category_id",
          as: "subcategory",
        },
      },
      {
        $unwind: {
          path: "$subcategory",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: "$_id",
          user_id: "$user_id",
          sim_id: "$sim_id",
          asset_id: "$sim.sim_no",
          assetsName: "$sim.assetsName",
          user_name: "$user.user_name",
          category_name: "$category.category_name",
          sub_category_name: "$subcategory.sub_category_name",
          Remarks: "$Remarks",
          created_by: "$created_by",
          status: "$status",
          s_type: "$s_type",
          allo_id: "$allo_id",
          submitted_at: "$submitted_at",
          deleted_status: "$deleted_status",
        },
      },
    ]);

    if (!simc || simc.length === 0) {
      res.status(404).send({ success: false, message: "No data found" });
    } else {
      res.status(200).send({ data: simc });
    }
  } catch (err) {
    res
      .status(500)
      .send({ error: err.message, message: "Error getting all sim datas" });
  }
};

exports.getAssetDepartmentCount = async (req, res) => {
  try {
    const simc = await simAlloModel.aggregate([
      {
        $lookup: {
          from: "usermodels",
          localField: "user_id",
          foreignField: "user_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "departmentmodels",
          localField: "user.dept_id",
          foreignField: "dept_id",
          as: "department",
        },
      },
      {
        $unwind: {
          path: "$department",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: "$_id",
          user_id: "$user.user_id",
          user_name: "$user.user_name",
          dept_id: "$user.dept_id",
          dept_name: "$department.dept_name", 
        }
      },
      {
        $group: {
          _id: "$dept_id",
          dept_name: { $first: "$dept_name" },
          count: { $sum: 1 },
          user_name: { $first: "$user_name" },
          dept_id : { $first: "$dept_id" }
          // user_id : { $first: "$user_id" }
        },
      }
    ]);

    if (!simc || simc.length === 0) {
      res.status(404).send({ success: false, message: "No data found" });
    } else {
      res.status(200).send({ data: simc });
    }
  } catch (err) {
    res
      .status(500)
      .send({ error: err.message, message: "Error getting user count of department" });
  }
};

exports.getAssetUsersDepartment = async (req, res) => {
    try {
      const { dept_id } = req.params;
      const simAlloUsers = await simAlloModel.find({}, 'user_id');
      const userIDsInSimAllo = simAlloUsers.map((user) => user.user_id);
      
      const userDetails = await userModel.find(
        { dept_id, user_id: { $in: userIDsInSimAllo } },
        'user_name user_id'
      );

      res.status(200).send({data: userDetails});
    } catch (error) {
      // console.error(error);
      res.status(500).json({ error:error.message, sms:'Internal Server Error' });
    }
}