const response = require("../common/response.js");
const dataBrandModel = require("../models/dataBrandModel.js");

exports.addDataBrand = async (req, res) => {
    try {
        const databrand = new dataBrandModel({
            brand_name: req.body.brand_name,
            remark: req.body.remark,
            created_by: req.body.created_by,
            updated_by: req.body.updated_by
        });
        const simv = await databrand.save();
        return response.returnTrue(
            200,
            req,
            res,
            "Data Brand Created Successfully",
            simv
        );
    } catch (err) {
        return response.returnFalse(500, req, res, err.message, {});
    }
};

exports.getDataBrands = async (req, res) => {
    try {
        const simc = await dataBrandModel.find({});
        if (!simc) {
            res.status(500).send({ success: false })
        }
        res.status(200).send(simc)
    } catch (err) {
        res.status(500).send({ error: err, sms: 'Error getting all data brand' })
    }
};

exports.getSingleDataBrand = async (req, res) => {
    try {
        const singlesim = await dataBrandModel.findById(req.params._id);
        if (!singlesim) {
            return res.status(500).send({ success: false })
        }
        res.status(200).send(singlesim);
    } catch (err) {
        res.status(500).send({ error: err, sms: 'Error getting data sub category details' })
    }
};

exports.editDataBrand = async (req, res) => {
    try {
        const editsim = await dataBrandModel.findByIdAndUpdate(req.body._id, {
            brand_name: req.body.brand_name,
            remark: req.body.remark,
            created_by: req.body.created_by,
            updated_at: req.body.updated_at,
            updated_by: req.body.updated_by
        }, { new: true })

        res.status(200).send({ success: true, data: editsim })
    } catch (err) {
        res.status(500).send({ error: err, sms: 'Error updating data brand details' })
    }
};

exports.deleteDataBrand = async (req, res) => {
    dataBrandModel.findByIdAndDelete(req.params._id).then(item => {
        if (item) {
            return res.status(200).json({ success: true, message: 'data brand deleted' })
        } else {
            return res.status(404).json({ success: false, message: 'data brand not found' })
        }
    }).catch(err => {
        return res.status(400).json({ success: false, message: err })
    })
};

