const response = require('../../common/response');
const { message } = require("../../common/message");
const mongoose = require("mongoose");
const pmsPageOwnershipModel = require('../../models/PMS/pmsPageOwnershipModel');

//POST- PMS_Ownership_Method
exports.createPageOwner = async (req, res) => {
    try {
        const checkDuplicacy = await pmsPageOwnershipModel.findOne({
            pageMast_id: req.body.pageMast_id,
            vendorMast_id: req.body.vendorMast_id
        });
        if (checkDuplicacy) {
            return res.status(403).json({
                status: 403,
                message: "PMS page-owner data alredy exist!",
            });
        }
        const { ownership_type, pageMast_id, vendorMast_id, sharing_per, description, created_by, last_updated_by } = req.body;
        const pageOwnerData = new pmsPageOwnershipModel({
            ownership_type: ownership_type,
            pageMast_id: pageMast_id,
            vendorMast_id: vendorMast_id,
            sharing_per: sharing_per,
            description: description,
            created_by: created_by,
            last_updated_by: last_updated_by
        });
        await pageOwnerData.save();
        return res.status(200).json({
            status: 200,
            message: "PMS page-owner data added successfully!",
            data: pageOwnerData,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message ? error.message : message.ERROR_MESSAGE,
        });
    }
};

//GET - PMS_Page_Owner-By-ID
exports.getPageOwnerDetail = async (req, res) => {
    try {
        const pmsPageOwnerData = await pmsPageOwnershipModel.aggregate([
            {
                $match: { _id: mongoose.Types.ObjectId(req.params.id) },
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
                $project: {
                    ownership_type: 1,
                    pageMast_id: 1,
                    vendorMast_id: 1,
                    sharing_per: 1,
                    description: 1,
                    created_by: 1,
                    created_by_name: "$user.user_name",
                    last_updated_date: 1,
                    last_updated_by: 1,
                },
            },
        ])
        if (pmsPageOwnerData) {
            return res.status(200).json({
                status: 200,
                message: "PMS page-owner details successfully!",
                data: pmsPageOwnerData,
            });
        }
        return res.status(404).json({
            status: 404,
            message: message.DATA_NOT_FOUND,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message ? error.message : message.ERROR_MESSAGE,
        });
    }
};

//PUT - updatePageOwnerType_By-ID
exports.updatePageOwner = async (req, res) => {
    try {
        const { id } = req.params;
        const { ownership_type, pageMast_id, vendorMast_id, sharing_per, description, created_by, last_updated_by } = req.body;
        const pageOwnerData = await pmsPageOwnershipModel.findOne({ _id: id });
        if (!pageOwnerData) {
            return res.send("Invalid page-owner Id...");
        }
        await pageOwnerData.save();
        const pageOwnerUpdatedData = await pmsPageOwnershipModel.findOneAndUpdate({ _id: id }, {
            $set: {
                ownership_type,
                pageMast_id,
                vendorMast_id,
                sharing_per,
                description,
                created_by,
                last_updated_by
            },
        },
            { new: true }
        );
        return res.status(200).json({
            message: "PMS page-owner data updated successfully!",
            data: pageOwnerUpdatedData,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message ? error.message : message.ERROR_MESSAGE,
        });
    }
};

//GET - PMS_Page_List
exports.getPageOwnerList = async (req, res) => {
    try {
        const pageOwnerData = await pmsPageOwnershipModel.aggregate([
            {
                $lookup: {
                    from: "pmspagemasts",
                    localField: "pagemast_id",
                    foreignField: "pagemast_id",
                    as: "pmspagemast",
                },
            },
            {
                $unwind: {
                    path: "$pmspagemast",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: "pmsvendormasts",
                    localField: "vendorMast_id",
                    foreignField: "vendorMast_id",
                    as: "pmsvendormast",
                },
            },
            {
                $unwind: {
                    path: "$pmsvendormast",
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
                    from: "usermodels",
                    localField: "last_updated_by",
                    foreignField: "user_id",
                    as: "user_data",
                },
            },
            {
                $unwind: {
                    path: "$user_data",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $project: {
                    ownership_type: 1,
                    pageMast_id: 1,
                    vendorMast_id: 1,
                    sharing_per: 1,
                    description: 1,
                    created_by: 1,
                    created_by_name: "$user.user_name",
                    last_updated_date: 1,
                    last_updated_by: 1,
                    pmspagemast_data:"$pmspagemast",
                    PMS_VendorMasts_data: {
                        pmsvendorMast_id: "$pmsvendormast._id",
                        vendorMast_name: "$pmsvendormast.vendorMast_name",
                        country_code: "$pmsvendormast.country_code",
                        mobile: "$pmsvendormast.mobile",
                        alternate_mobile: "$pmsvendormast.alternate_mobile",
                        email: "$pmsvendormast.email",
                        personal_address: "$pmsvendormast.personal_address",
                        pan_no: "$pmsvendormast.pan_no",
                        gst_no: "$pmsvendormast.gst_no",
                        comapny_name: "$pmsvendormast.comapny_name",
                        company_address: "$pmsvendormast.company_address",
                        company_city: "$pmsvendormast.company_city",
                        company_pincode: "$pmsvendormast.company_pincode",
                        company_state: "$pmsvendormast.company_state",
                        threshold_limit: "$pmsvendormast.threshold_limit",
                        home_address: "$pmsvendormast.home_address",
                        home_city: "$pmsvendormast.home_city",
                        home_state: "$pmsvendormast.home_state",
                        created_by: "$pmsvendormast.created_by",
                        last_updated_by: "$pmsvendormast.last_updated_by",
                    },
                }
            },
            {
                $group: {
                    _id: "$_id",
                    data: { $first: "$$ROOT" }
                }
            },
            {
                $replaceRoot: { newRoot: "$data" }
            }
        ])
        if (!pageOwnerData) {
            return res.status(500).send({
                succes: true,
                message: "PMS page-owner data list not found!",
            });
        }
        return res.status(200).send({
            succes: true,
            message: "PMS page-owner data list successfully!",
            data: pageOwnerData
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message ? error.message : message.ERROR_MESSAGE,
        });
    }
};

//DELETE - PMS_Page_Owner By-ID
exports.deletePageOwnerData = async (req, res) => {
    try {
        const { params } = req;
        const { id } = params;
        const pageOwnerData = await pmsPageOwnershipModel.findOne({ _id: id });
        if (!pageOwnerData) {
            return res.status(404).json({
                status: 404,
                message: message.DATA_NOT_FOUND,
            });
        }
        await pmsPageOwnershipModel.deleteOne({ _id: id });
        return res.status(200).json({
            status: 200,
            message: "PMS page-owner data deleted successfully!",
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message ? error.message : message.ERROR_MESSAGE,
        });
    }
};