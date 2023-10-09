const sittingModel = require('../models/sittingModel.js');

exports.addSitting = async (req, res) => {
    try {
        const sittingc = new sittingModel({
            sitting_ref_no: req.body.sitting_ref_no,
            sitting_area: req.body.sitting_area,
            remarks: req.body.remarks,
            created_by: req.body.created_by,
            last_updated_by: req.body.last_updated_by,
            room_id: req.body.room_id
        })
        const sittingv = await sittingc.save();
        res.send({ sittingv, status: 200 });
    } catch (err) {
        res.status(500).send({ error: err, sms: 'This sitting cannot be created' })
    }
};

exports.getSittings = async (req, res) => {
    try {
        const sittingc = await sittingModel.find();
        if (!sittingc) {
            res.status(500).send({ success: false })
        }
        res.status(200).send(sittingc)
    } catch (err) {
        res.status(500).send({ error: err, sms: 'Error getting all sitting datas' })
    }
};

exports.getSingleSitting = async (req, res) => {
    try {
        const singlesitting = await sittingModel.findOne({ sitting_id: req.params.sitting_id });
        if (!singlesitting) {
            return res.status(500).send({ success: false })
        }
        res.status(200).send(singlesitting);
    } catch (err) {
        res.status(500).send({ error: err, sms: 'Error getting sitting details' })
    }
};

exports.editSitting = async (req, res) => {
    try {
        const editsitting = await sittingModel.findOneAndUpdate({ sitting_id: req.body.sitting_id }, {
            sitting_ref_no: req.body.sitting_ref_no,
            sitting_area: req.body.sitting_area,
            remarks: req.body.remarks,
            created_by: req.body.created_by,
            last_updated_by: req.body.last_updated_by,
            room_id: req.body.room_id
        }, { new: true })
        if (!editsitting) {
            res.status(500).send({ success: false })
        }
        res.status(200).send({ success: true, data: editsitting })
    } catch (err) {
        res.status(500).send({
            error: err,
            message: "Error updating the projectxsubcategory in the database",
        });
    }
};


exports.deleteSitting = async (req, res) => {
    const id = req.params.id;
    const condition = { sitting_id: id };
    try {
        const result = await sittingModel.deleteOne(condition);
        if (result.deletedCount === 1) {
            return res.status(200).json({
                success: true,
                message: `Sitting with ID ${id} deleted successfully`,
            });
        } else {
            return res.status(200).json({
                success: false,
                message: `Sitting with ID ${id} not found`,
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the Sitting",
            error: error.message,
        });
    }
};

