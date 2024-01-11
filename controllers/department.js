const response = require("../common/response.js");
const departmentModel = require("../models/departmentModel.js");
const subDepartmentModel = require("../models/subDepartmentModel.js");

exports.addDepartment = async (req, res) => {
  try {
    const simc = new departmentModel({
      dept_name: req.body.dept_name,
      short_name: req.body.short_name,
      Remarks: req.body.remark,
      Created_by: req.body.Created_by,
    });
    const simv = await simc.save();
    return response.returnTrue(
      200,
      req,
      res,
      "Department Created Successfully",
      simv
    );
  } catch (err) {
    if (err.code === 11000) {
      // The error code 11000 indicates a duplicate key error (unique constraint violation)
      return response.returnFalse(500, req, res, "'Department name must be unique. Another department with the same name already exists.'", {});

    } else {
      return response.returnFalse(500, req, res, err.message, {});
    }

  }
};

exports.getDepartments = async (req, res) => {
  try {
    const simc = await departmentModel.find();
    if (!simc) {
      return response.returnFalse(200, req, res, "No Reord Found...", []);
    }
    res.status(200).send(simc)
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};

exports.getSingleDepartment = async (req, res) => {
  try {
    const singlesim = await departmentModel.findOne({
      dept_id: parseInt(req.params.id),
    });
    if (!singlesim) {
      return response.returnFalse(200, req, res, "No Reord Found...", {});
    }
    return response.returnTrue(
      200,
      req,
      res,
      "Department Data Fetch Successfully",
      singlesim
    );
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};

exports.editDepartment = async (req, res) => {
  try {
    const editsim = await departmentModel.findOneAndUpdate(
      { dept_id: parseInt(req.body.dept_id) },
      {
        dept_name: req.body.dept_name,
        short_name: req.body.short_name,
        Remarks: req.body.remark,
        Created_by: req.body.Created_by,
        Last_updated_by: req.body.Last_updated_by,
        Last_updated_date: req.body.Last_updated_date,
      },
      { new: true }
    );
    if (!editsim) {
      return response.returnFalse(
        200,
        req,
        res,
        "No Reord Found With This Department Id",
        {}
      );
    }
    return response.returnTrue(200, req, res, "Updation Successfully", editsim);
  } catch (err) {
    if (err.code === 11000) {
      // The error code 11000 indicates a duplicate key error (unique constraint violation)
      return response.returnFalse(500, req, res, "'Department name must be unique. Another department with the same name already exists.'", {});

    } else {
      return response.returnFalse(500, req, res, err.message, {});
    }
  }
};

exports.deleteDepartment = async (req, res) => {
  departmentModel.deleteOne({ dept_id: req.params.id }).then(item => {

    if (item?.deletedCount !== 0) {
      return res.status(200).json({ success: true, message: 'Department deleted' })
    } else {
      return res.status(404).json({ success: false, message: 'Department not found' })
    }
  }).catch(err => {
    return res.status(400).json({ success: false, message: err })
  })
};

exports.addSubDepartment = async (req, res) => {
  try {
    const simc = new subDepartmentModel({
      sub_dept_name: req.body.sub_dept_name,
      dept_id: req.body.dept_id,
      remark: req.body.remark,
      created_by: req.body.created_by,
      creation_at: req.body.creation_at,
    });
    const simv = await simc.save();
    return response.returnTrue(
      200,
      req,
      res,
      "Sub Department Created Successfully",
      simv
    );
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};

exports.editSubDepartment = async (req, res) => {
  try {
    const editsim = await subDepartmentModel.findOneAndUpdate(
      { id: req.body.id },
      {
        sub_dept_name: req.body.sub_dept_name,
        dept_id: req.body.dept_id,
        remark: req.body.remark,
        last_updated_by: req.body.last_updated_by,
        last_updated_at: req.body.last_updated_at,
      },
      { new: true }
    );
    if (!editsim) {
      return response.returnFalse(
        200,
        req,
        res,
        "Sub Department Not Found...",
        {}
      );
    }
    return response.returnTrue(
      200,
      req,
      res,
      "Sub Department Update Successfully",
      {}
    );
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};

exports.deleteSubDepartment = async (req, res) => {
  subDepartmentModel.deleteOne({ id: req.params.id }).then(item => {
    if (item) {
      return res.status(200).json({ success: true, message: 'Sub Department deleted' })
    } else {
      return res.status(404).json({ success: false, message: 'Sub Department not found' })
    }
  }).catch(err => {
    return res.status(400).json({ success: false, message: err })
  })
};

exports.getSubDepartmentsFromDeptId = async (req, res) => {
  try {
    const deptId = req.params.id;
    // console.log('fffffff', req.params)

    const singlesim = await subDepartmentModel
      .aggregate([
        {
          $match: { dept_id: parseInt(req.params.dept_id) },
        },
        {
          $lookup: {
            from: "departmentmodels",
            localField: "dept_id",
            foreignField: "dept_id",
            as: "department",
          },
        },
        {
          $unwind: "$department",
        },
        {
          $project: {
            _id: 1,
            dept_name: "$department.dept_name",
            sub_dept_name: "$sub_dept_name",
            dept_id: "$dept_id",
            id: "$id",
          },
        },
      ])
      .exec();

    // if (!singlesim || singlesim.length === 0) {
    //   return response.returnFalse(200, req, res, "No Reord Found...", {});
    // }
    // return response.returnTrue(
    //   200,
    //   req,
    //   res,
    //   "Data Fetch Successfully",
    //   singlesim
    // );
    return res.status(200).send(singlesim);
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};

exports.getSubDepartments = async (req, res) => {
  try {
    const simc = await subDepartmentModel
      .aggregate([
        {
          $lookup: {
            from: "departmentmodels",
            localField: "dept_id",
            foreignField: "dept_id",
            as: "department",
          },
        },
        {
          $unwind: "$department",
        },
        {
          $project: {
            _id: 1,
            dept_name: "$department.dept_name",
            sub_dept_name: "$sub_dept_name",
            remark: "$remark",
            created_by: "$created_by",
            created_date: "$created_at",
            last_updated_by: "$last_updated_by",
            last_updated_at: "$last_updated_at",
            dept_id: "$dept_id",
            id: "$id",
          },
        },
      ])
      .exec();
    if (!simc) {
      return response.returnFalse(200, req, res, "No Reord Found...", []);
    }
    res.status(200).send(simc)
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};

exports.getSubDepartmentsFromId = async (req, res) => {
  try {
    const id = req.params.id;

    const singlesim = await subDepartmentModel
      .aggregate([
        {
          $match: { id: parseInt(req.params.id) },
        },
        {
          $lookup: {
            from: "departmentmodels",
            localField: "dept_id",
            foreignField: "dept_id",
            as: "department",
          },
        },
        {
          $unwind: "$department",
        },
        {
          $project: {
            _id: 1,
            dept_name: "$department.dept_name",
            sub_dept_name: "$sub_dept_name",
            remark: "$remark",
            dept_id: "$dept_id",
            id: "$id",
          },
        },
      ])
      .exec();

    if (!singlesim || singlesim.length === 0) {
      return res.status(500).send({ success: false, sms: "no data available" });
    }

    const responseObject = singlesim[0];
    res.status(200).send(responseObject);
  } catch (err) {
    res
      .status(500)
      .send({ error: err, sms: "Error getting department details" });
  }
};
