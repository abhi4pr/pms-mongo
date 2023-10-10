const objectMastSchema = require("../models/objModel.js");
exports.addObjectMast = async (req, res) => {
  try {
    const { obj_name, soft_name, dept_id, created_by } = req.body;

    const Obj = new objectMastSchema({
      obj_name,
      soft_name,
      Dept_id: dept_id,
      Created_by: created_by,
    });

    const savedObjectMast = await Obj.save();
    res.send({
      data: savedObjectMast,
      status: 200,
      message: "Object and user_auth_detail added successfully",
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ error: err, message: "This objMast cannot be created" });
  }
};

exports.getObjectMastById = async (req, res) => {
  try {
    let match_condition = {
      obj_id: parseInt(req.params.id),
    };

    let objects = await objectMastSchema.aggregate([
      {
        $match: match_condition,
      },
      {
        $lookup: {
          from: "departmentmodels",
          localField: "Dept_id",
          foreignField: "dept_id",
          as: "data",
        },
      },

      {
        $unwind: "$data",
      },
      {
        $addFields: {
          dept_name: "$data.dept_name",
        },
      },
      {
        $project: {
          data: 0,
        },
      },
    ]);

    if (objects.length === 0) {
      res
        .status(200)
        .send({ success: true, data: [], message: "No Record found" });
    } else {
      return res.status(200).send({ success: true, data: objects[0] });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err, message: "Error getting  Object" });
  }
};

exports.getObjectMasts = async (req, res) => {
  try {
    let objets = await objectMastSchema.aggregate([
      {
        $lookup: {
          from: "departmentmodels",
          localField: "Dept_id",
          foreignField: "dept_id",
          as: "data",
        },
      },

      {
        $unwind: "$data",
      },
    ]);
    if (objets.length === 0) {
      res
        .status(200)
        .send({ success: true, data: [], message: "No Record found" });
    } else {
      return res.status(200).send({ success: true, data: objets });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err, message: "Error getting all Objects" });
  }
};

