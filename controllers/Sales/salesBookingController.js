const response = require("../../common/response");
const vari = require("../../variables");
const multer = require("multer");
const salesBookingModel = require("../../models/Sales/salesBookingModel");
const deleteSalesbookingModel = require("../../models/Sales/deletedSalesBookingModel.js");
const recordServiceModel = require("../../models/Sales/recordServiceModel.js");
const { uploadImage, deleteImage, moveImage } = require("../../common/uploadImage");
const constant = require("../../common/constant.js");
const { saleBookingStatus } = require("../../helper/status.js");
const { getIncentiveAmountRecordServiceWise } = require("../../helper/functions.js");
const path = require('path');
const moment = require('moment');

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.xlsx' && ext !== '.xls') {
            return cb(new Error('Only Excel files are allowed'), false);
        }
        cb(null, true);
    }
}).fields([
    { name: "record_service_file", maxCount: 1 },
]);

/**
 * Api is to used for the sales booking data add in the DB collection.
*/

exports.addSalesBooking = [
    upload, async (req, res) => {
        try {
            //sales Booking data obj create 
            const createSaleBooking = new salesBookingModel({
                account_id: req.body.account_id,
                sale_booking_date: req.body.sale_booking_date,
                campaign_amount: req.body.campaign_amount,
                campaign_name: req.body.campaign_name,
                campaign_id: req.body.campaign_id,
                brand_id: req.body.brand_id,
                base_amount: req.body.base_amount,
                gst_amount: req.body.gst_amount,
                description: req.body.description,
                credit_approval_status: req.body.credit_approval_status,
                reason_credit_approval: req.body.reason_credit_approval,
                reason_credit_approval_own_reason: req.body.reason_credit_approval_own_reason || "",
                balance_payment_ondate: req.body.balance_payment_ondate,
                gst_status: req.body.gst_status,
                tds_status: req.body.tds_status,
                Booking_close_date: req.body.Booking_close_date,
                tds_verified_amount: req.body.tds_verified_amount,
                tds_verified_remark: req.body.tds_verified_remark,
                booking_remarks: req.body.booking_remarks,
                incentive_status: req.body.incentive_status,
                payment_credit_status: req.body.payment_credit_status,
                // booking_status: req.body.booking_status,
                incentive_sharing_user_id: req.body.incentive_sharing_user_id,
                incentive_sharing_percent: req.body.incentive_sharing_percent,
                bad_debt: req.body.bad_debt,
                bad_debt_reason: req.body.bad_debt_reason,
                no_badge_achivement: req.body.no_badge_achivement,
                old_sale_booking_id: req.body.old_sale_booking_id,
                sale_booking_type: req.body.sale_booking_type,
                service_taken_amount: req.body.service_taken_amount,
                // incentive_amount: req.body.incentive_amount,
                earned_incentive_amount: req.body.earned_incentive_amount,
                unearned_incentive_amount: req.body.unearned_incentive_amount,
                payment_type: req.body.payment_type,
                final_invoice: req.body.final_invoice,
                is_draft_save: req.body.is_draft_save,
                created_by: req.body.created_by,
            })

            // Define the image fields 
            const imageFields = {
                record_service_file: 'RecordServicesFile',
            };
            for (const [field] of Object.entries(imageFields)) {            //itreates 
                if (req.files[field] && req.files[field][0]) {
                    createSaleBooking[field] = await uploadImage(req.files[field][0], "SalesBookingFiles");
                }
            }

            //draft status check
            if (req.body?.is_draft_save == true || req.body?.is_draft_save == "true") {
                createSaleBooking["booking_status"] = saleBookingStatus['04'].status;
            } else {
                if (req.body.payment_credit_status == "sent_for_payment_approval") {
                    createSaleBooking["booking_status"] = saleBookingStatus['01'].status;
                }
                if (req.body.payment_credit_status == "self_credit_used") {
                    createSaleBooking["booking_status"] = saleBookingStatus['05'].status;
                }
            }

            //save data in the collection
            const saleBookingAdded = await createSaleBooking.save();

            let recordServicesDataUpdatedArray = [];
            let recordServicesDetails = (req.body?.record_services && JSON.parse(req.body.record_services)) || [];

            //Record Service details obj add in array
            if (recordServicesDetails.length && Array.isArray(recordServicesDetails)) {
                for (let element of recordServicesDetails) {
                    element.sale_booking_id = saleBookingAdded.sale_booking_id;
                    element.created_by = req.body.created_by;
                    element.sale_executive_id = req.body.created_by;
                    element.sale_booking_date = req.body.sale_booking_date;
                    recordServicesDataUpdatedArray.push(element);
                }
            }

            //add data in db collection
            const recordServicesData = await recordServiceModel.insertMany(recordServicesDataUpdatedArray);

            let totalIncentiveAmount = 0;
            let totalRecordServiceAmount = 0;
            const recordServiceCounts = (recordServicesData && recordServicesData.length) ? recordServicesData.length : 0;
            for (let index = 0; index < recordServicesData.length; index++) {
                const element = recordServicesData[index];
                totalRecordServiceAmount += element?.amount;
                const incentiveAmount = await getIncentiveAmountRecordServiceWise(element.sales_service_master_id, element.amount);
                //total incentive amount get from record service
                totalIncentiveAmount += incentiveAmount;
            }

            //update incentive amount in sale booking collection
            await salesBookingModel.updateOne({
                sale_booking_id: saleBookingAdded.sale_booking_id
            }, {
                $set: {
                    incentive_amount: totalIncentiveAmount,
                    record_service_amount: totalRecordServiceAmount,
                    record_service_counts: recordServiceCounts
                }
            })

            //success response send
            return response.returnTrue(200, req, res,
                "Sales Booking Created Successfully",
                saleBookingAdded);
        } catch (err) {
            return response.returnFalse(500, req, res, err.message, {});
        }
    }];

/**
 * Api is to used for the sales booking data update in the DB collection.
 */
exports.editSalesBooking = [
    upload, async (req, res) => {
        try {
            const { id } = req.params;

            const updateData = {
                account_id: req.body.account_id,
                sale_booking_date: req.body.sale_booking_date,
                campaign_amount: req.body.campaign_amount,
                campaign_name: req.body.campaign_name,
                campaign_id: req.body.campaign_id,
                brand_id: req.body.brand_id,
                base_amount: req.body.base_amount,
                gst_amount: req.body.gst_amount,
                description: req.body.description,
                credit_approval_status: req.body.credit_approval_status,
                reason_credit_approval: req.body.reason_credit_approval,
                reason_credit_approval_own_reason: req.body.reason_credit_approval_own_reason || "",
                balance_payment_ondate: req.body.balance_payment_ondate,
                gst_status: req.body.gst_status,
                tds_status: req.body.tds_status,
                Booking_close_date: req.body.Booking_close_date,
                tds_verified_amount: req.body.tds_verified_amount,
                tds_verified_remark: req.body.tds_verified_remark,
                booking_remarks: req.body.booking_remarks,
                incentive_status: req.body.incentive_status,
                payment_credit_status: req.body.payment_credit_status,
                // booking_status: req.body.booking_status,
                incentive_sharing_user_id: req.body.incentive_sharing_user_id,
                incentive_sharing_percent: req.body.incentive_sharing_percent,
                bad_debt: req.body.bad_debt,
                bad_debt_reason: req.body.bad_debt_reason,
                no_badge_achivement: req.body.no_badge_achivement,
                old_sale_booking_id: req.body.old_sale_booking_id,
                sale_booking_type: req.body.sale_booking_type,
                service_taken_amount: req.body.service_taken_amount,
                // incentive_amount: req.body.incentive_amount,
                earned_incentive_amount: req.body.earned_incentive_amount,
                unearned_incentive_amount: req.body.unearned_incentive_amount,
                payment_type: req.body.payment_type,
                final_invoice: req.body.final_invoice,
                is_draft_save: req.body.is_draft_save,
                updated_by: req.body.updated_by,
            };

            //draft status check
            if (req.body?.is_draft_save == true || req.body?.is_draft_save == "true") {
                updateData["booking_status"] = saleBookingStatus['04'].status;
            } else {
                if (req.body.payment_credit_status == "sent_for_payment_approval") {
                    updateData["booking_status"] = saleBookingStatus['01'].status;
                }
                if (req.body.payment_credit_status == "self_credit_used") {
                    updateData["booking_status"] = saleBookingStatus['05'].status;
                }
            }

            // Fetch the old document and update it
            const updatedSalesBooking = await salesBookingModel.findByIdAndUpdate({ _id: id }, updateData, { new: true });

            if (!updatedSalesBooking) {
                return response.returnFalse(404, req, res, `Sales booking data not found`, {});
            }

            // Define the image fields 
            const imageFields = {
                record_service_file: 'RecordServicesFile',
            };

            // Remove old images not present in new data and upload new images
            for (const [fieldName] of Object.entries(imageFields)) {
                if (req.files && req.files[fieldName] && req.files[fieldName][0]) {

                    // Delete old image if present
                    if (updatedSalesBooking[fieldName]) {
                        await deleteImage(`SalesBookingFiles/${updatedSalesBooking[fieldName]}`);
                    }
                    // Upload new image
                    updatedSalesBooking[fieldName] = await uploadImage(req.files[fieldName][0], "SalesBookingFiles");
                }
            }
            // Save the updated document with the new image URLs
            await updatedSalesBooking.save();

            return response.returnTrue(200, req, res, "Sales booking data updated successfully!", updatedSalesBooking);
        } catch (error) {
            // Return an error response in case of any exceptions
            return response.returnFalse(500, req, res, `${error.message}`, {});
        }
    }];

/**
 * Api is to get all the sales booking data from DB collection.
 */

exports.getAllSalesBooking = async (req, res) => {
    try {
        const page = (req.query?.page && parseInt(req.query.page)) || null;
        const limit = (req.query?.limit && parseInt(req.query.limit)) || null;
        const skip = (page && limit) ? (page - 1) * limit : 0;
        const sort = { createdAt: -1 };

        let addFieldsObj = {
            $addFields: {
                record_service_file_url: {
                    $cond: {
                        if: { $ne: ["$record_service_file", ""] },
                        then: {
                            $concat: [
                                constant.GCP_SALES_BOOKING_FOLDER_URL,
                                "/",
                                "$record_service_file",
                            ],
                        },
                        else: "$record_service_file",
                    },
                },
            },
        };

        const pipeline = [addFieldsObj, { $sort: sort }];

        if (page && limit) {
            pipeline.push(
                { $skip: skip },
                { $limit: limit },
            );
        }

        const saleBookingList = await salesBookingModel.aggregate(pipeline);
        const salesBookingCount = await salesBookingModel.countDocuments(addFieldsObj);

        return response.returnTrueWithPagination(
            200,
            req,
            res,
            "Sales booking list retreive successfully!",
            saleBookingList,
            {
                start_record: skip + 1,
                end_record: skip + saleBookingList.length,
                total_records: salesBookingCount,
                current_page: page || 1,
                total_page: (page && limit) ? Math.ceil(salesBookingCount / limit) : 1,
            }
        );
    } catch (error) {
        return response.returnFalse(500, req, res, `${error.message}`, {});
    }
}

/**
 * Api is to get Id sales booking data from DB collection.
 */
exports.getSingleSalesBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const salesBookingDetail = await salesBookingModel.findOne({
            _id: id,
        });
        if (!salesBookingDetail) {
            return response.returnFalse(200, req, res, `No Record Found`, {});
        }

        const result = { ...salesBookingDetail._doc }; // create a new object with all fields from salesBookingDetail._doc

        if (salesBookingDetail.record_service_file && salesBookingDetail.record_service_file != '') {
            const recordServiceURl = `${constant.GCP_SALES_BOOKING_FOLDER_URL}/${salesBookingDetail.record_service_file}`;
            result.recordServiceFileURL = recordServiceURl; // add the new field to the result object
        }

        //return success response
        return response.returnTrue(
            200,
            req,
            res,
            "Sales booking details retrive successfully!",
            result
        );
    } catch (error) {
        return response.returnFalse(500, req, res, `${error.message}`, {});
    }
}

/**
 * Api is to delete sales booking data from DB collection.
 */
exports.deleteSalesBooking = [upload, async (req, res) => {
    try {
        let deletedBy = (req.body?.deleted_by) || 0;
        let salesBookingData = await salesBookingModel.findById(req.params.id);
        if (!salesBookingData) {
            return res.status(404).json({ success: false, message: 'Sales Booking Data not found' });
        }

        // Prepare the data to be inserted into the deletedSalesBookingModel
        const salesBookingCopy = salesBookingData.toObject();
        delete salesBookingCopy._id;
        delete salesBookingCopy.createdAt;
        delete salesBookingCopy.updatedAt;
        delete salesBookingCopy.__v;
        salesBookingCopy.deleted_by = deletedBy;

        // Insert the data into the deletedSalesBookingModel
        const addNewDeletedData = await deleteSalesbookingModel.create(salesBookingCopy);

        if (salesBookingData && salesBookingData.record_service_file) {
            // Move the uploaded file to the 'DeletedSalesRecordService' directory
            await moveImage("SalesBookingFiles", "DeletedSalesBookingService", salesBookingData.record_service_file);
        }

        // Delete the sales booking record
        await salesBookingModel.deleteOne({ _id: req.params.id });

        return response.returnTrueWithPagination(
            200,
            req,
            res,
            "Page states deleted successfully!",
            addNewDeletedData,
        )
    } catch (error) {
        return response.returnFalse(500, req, res, `${error.message}`, {});
    }
}];

/**
 * Api is to get_delete_sales_booking data from DB collection.
 */
exports.getDeletedSalesBookingList = async (req, res) => {
    try {
        const newDeleteSalesBokingData = await deleteSalesbookingModel.find({});

        //if data not found
        if (!newDeleteSalesBokingData) {
            return response.returnFalse(200, req, res, "No Reord Found...", []);
        }

        //success response send
        return response.returnTrue(200, req, res, "deleted Sales Booking all data fatched Successfully", newDeleteSalesBokingData);
    } catch (error) {
        return res.status(500).json({
            message: error.message ? error.message : message.ERROR_MESSAGE,
        });
    }
}

/**
 * Api is to get all the pending, approved, rejected requested for creadit approval data list get from DB collection.
 */
exports.getAllStatusForCreditApprovalSalesBookingList = async (req, res) => {
    try {
        let status = req.query?.status;

        //get all data in DB collection
        const SalesBookingData = await salesBookingModel.aggregate([{
            $match: {
                payment_credit_status: "sent_for_credit_approval",
                credit_approval_status: status,
            }
        }, {
            $lookup: {
                from: "usermodels",
                localField: "created_by",
                foreignField: "user_id",
                as: "createdUserData",
            }
        }, {
            $unwind: {
                path: "$createdUserData",
                preserveNullAndEmptyArrays: true,
            }
        }, {
            $lookup: {
                from: "accountMasterModel",
                localField: "account_id",
                foreignField: "account_id",
                as: "accountMasterData",
            }
        }, {
            $unwind: {
                path: "$accountMasterData",
                preserveNullAndEmptyArrays: true,
            }
        }, {
            $lookup: {
                from: "salesbookingpayments",
                localField: "sale_booking_id",
                foreignField: "sale_booking_id",
                as: "salesbookingpaymentsData",
            }
        }, {
            $unwind: {
                path: "$salesbookingpaymentsData",
                preserveNullAndEmptyArrays: true,
            }
        }, {
            $lookup: {
                from: "reasoncreditapprovals",
                localField: "reason_credit_approval",
                foreignField: "_id",
                as: "reasoncreditapprovalData",
            }
        }, {
            $unwind: {
                path: "$reasoncreditapprovalData",
                preserveNullAndEmptyArrays: true,
            }
        }, {
            $project: {
                sale_booking_date: 1,
                campaign_amount: 1,
                description: 1,
                credit_approval_status: 1,
                reason_credit_approval: 1,
                reason_credit_approval_name: "$reasoncreditapprovalData.reason",
                reason_credit_approval_own_reason: 1,
                balance_payment_ondate: 1,
                payment_credit_status: 1,
                booking_status: 1,
                sale_booking_id: 1,
                account_id: 1,
                account_name: "$accountMasterData.account_name",
                created_by: 1,
                created_by_name: "$createdUserData.user_name",
                createdAt: 1,
                updatedAt: 1,
                salesbookingpaymentsData: "$salesbookingpaymentsData"
            }
        }, {
            $group: {
                _id: "$sale_booking_id",
                sale_booking_date: { $first: "$sale_booking_date" },
                campaign_amount: { $first: "$campaign_amount" },
                description: { $first: "$description" },
                credit_approval_status: { $first: "$credit_approval_status" },
                reason_credit_approval: { $first: "$reason_credit_approval" },
                reason_credit_approval_name: { $first: "$reason_credit_approval_name" },
                reason_credit_approval_own_reason: { $first: "$reason_credit_approval_own_reason" },
                balance_payment_ondate: { $first: "$balance_payment_ondate" },
                payment_credit_status: { $first: "$payment_credit_status" },
                booking_status: { $first: "$booking_status" },
                sale_booking_id: { $first: "$sale_booking_id" },
                account_id: { $first: "$account_id" },
                account_name: { $first: "$account_name" },
                created_by: { $first: "$created_by" },
                created_by_name: { $first: "$created_by_name" },
                createdAt: { $first: "$createdAt" },
                updatedAt: { $first: "$updatedAt" },
                paid_amount: {
                    $sum: {
                        $cond: [{
                            $eq: ["$salesbookingpaymentsData.payment_approval_status", "approved"]
                        }, "$salesbookingpaymentsData.payment_amount", 0]
                    }
                }
            }
        }]);

        //if data not found
        if (!SalesBookingData) {
            return response.returnFalse(200, req, res, "No Reord Found...", []);
        }
        //success response send
        return response.returnTrue(200, req, res, "Credit approval Sales Booking Status data fatched", SalesBookingData);
    } catch (err) {
        return response.returnFalse(500, req, res, err.message, {});
    }
};

/**
 * Api is to update credit approval status change in sales booking data in DB collection.
 */
exports.editCreditApprovalStatusChange = async (req, res) => {
    try {
        //get sale booking id
        let saleBookingId = req.params?.id;

        //if not found then error return
        if (!saleBookingId) {
            return response.returnFalse(200, req, res, "Sale Booking Id is required...", []);
        }

        //status change in sale booking collection.
        await salesBookingModel.updateOne({
            sale_booking_id: Number(saleBookingId),
            credit_approval_status: "pending"
        }, {
            credit_approval_status: req.body.status,
            credit_approval_by: parseInt(req.body.approved_by),
        });

        //success response send
        return response.returnTrue(200, req, res, "Sales Booking Credit Approval Status update Successfully");
    } catch (err) {
        return response.returnFalse(500, req, res, err.message, {});
    }
};


exports.getSalesBookingDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const salesBookingDetail = await salesBookingModel.find({
            account_id: id,
        });
        if (!salesBookingDetail) {
            return response.returnFalse(200, req, res, `No Record Found`, {});
        }
        return response.returnTrue(
            200,
            req,
            res,
            "Sales booking details retrive account id wise successfully!",
            salesBookingDetail
        );
    } catch (error) {
        return response.returnFalse(500, req, res, `${error.message}`, {});
    }
}



exports.salesDataOfAccountOutstanding = async (req, res) => {
    try {
        const gstStatus = req.body.gst_status;
        // Initialize match stage
        let matchStage = {};
        if (gstStatus !== undefined) {
            matchStage = { gst_status: gstStatus };
        }
        const accountWiseSaleBookingData = await salesBookingModel.aggregate([
            {
                $match: matchStage
            }, {
                $lookup: {
                    from: "accountmastermodels",
                    localField: "account_id",
                    foreignField: "account_id",
                    as: "accountMasterData",
                }
            }, {
                $unwind: {
                    path: "$accountMasterData",
                    preserveNullAndEmptyArrays: true,
                }
            }, {
                $lookup: {
                    from: "usermodels",
                    localField: "created_by",
                    foreignField: "user_id",
                    as: "user",
                },
            }, {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true,
                },
            }, {
                $group: {
                    _id: "$account_id",
                    sale_booking_date: { $first: "$sale_booking_date" },
                    campaign_amount: { $first: "$campaign_amount" },
                    description: { $first: "$description" },
                    credit_approval_status: { $first: "$credit_approval_status" },
                    reason_credit_approval: { $first: "$reason_credit_approval" },
                    gst_status: { $first: "$gst_status" },
                    balance_payment_ondate: { $first: "$balance_payment_ondate" },
                    payment_credit_status: { $first: "$payment_credit_status" },
                    booking_status: { $first: "$booking_status" },
                    sale_booking_id: { $first: "$sale_booking_id" },
                    account_id: { $first: "$accountMasterData.account_id" },
                    account_name: { $first: "$accountMasterData.account_name" },
                    registered_by: { $first: "$accountMasterData.created_by" },
                    requested_amount: { $first: "$requested_amount" },
                    registered_by_name: { $first: "$user.user_name" },
                    createdAt: { $first: "$createdAt" },
                    updatedAt: { $first: "$updatedAt" },
                    total_purchase_amount: { $sum: "$campaign_amount" },
                    total_sale_booking: { $sum: 1 },
                    approved_amount: { $sum: "$approved_amount" },
                }
            }, {
                $project: {
                    _id: 1,
                    sale_booking_date: 1,
                    campaign_amount: 1,
                    description: 1,
                    credit_approval_status: 1,
                    reason_credit_approval: 1,
                    gst_status: 1,
                    balance_payment_ondate: 1,
                    payment_credit_status: 1,
                    booking_status: 1,
                    sale_booking_id: 1,
                    account_id: 1,
                    account_name: 1,
                    registered_by: 1,
                    registered_by_name: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    total_purchase_amount: 1,
                    total_sale_booking: 1,
                    approved_amount: 1,
                    requested_amount: 1,
                    approved_pending: { $subtract: ["$requested_amount", "$approved_amount"] }
                }
            }
        ]);
        if (!accountWiseSaleBookingData.length) {
            return response.returnFalse(200, req, res, "No Record Found...", []);
        }
        return response.returnTrue(200, req, res,
            "Account Wise Sales Booking Status data retrieved",
            accountWiseSaleBookingData
        );
    } catch (err) {
        return response.returnFalse(500, req, res, err.message, {});
    }
}

exports.salesDataOfUserOutstanding = async (req, res) => {
    try {
        const gstStatus = req.body.gst_status;
        // Initialize match stage
        let matchStage = {};
        if (gstStatus !== undefined) {
            matchStage = { gst_status: gstStatus };
        }
        const userWiseSaleBookingData = await salesBookingModel.aggregate([
            {
                $match: matchStage
            }, {
                $lookup: {
                    from: "accountmastermodels",
                    localField: "account_id",
                    foreignField: "account_id",
                    as: "accountMasterData",
                }
            }, {
                $unwind: {
                    path: "$accountMasterData",
                    preserveNullAndEmptyArrays: true,
                }
            }, {
                $lookup: {
                    from: "usermodels",
                    localField: "created_by",
                    foreignField: "user_id",
                    as: "user",
                },
            }, {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true,
                },
            }, {
                $group: {
                    _id: "$created_by",
                    sale_booking_date: { $first: "$sale_booking_date" },
                    campaign_amount: { $first: "$campaign_amount" },
                    description: { $first: "$description" },
                    credit_approval_status: { $first: "$credit_approval_status" },
                    reason_credit_approval: { $first: "$reason_credit_approval" },
                    gst_status: { $first: "$gst_status" },
                    balance_payment_ondate: { $first: "$balance_payment_ondate" },
                    payment_credit_status: { $first: "$payment_credit_status" },
                    booking_status: { $first: "$booking_status" },
                    sale_booking_id: { $first: "$sale_booking_id" },
                    account_id: { $first: "$accountMasterData.account_id" },
                    account_name: { $first: "$accountMasterData.account_name" },
                    registered_by: { $first: "$accountMasterData.created_by" },
                    requested_amount: { $first: "$requested_amount" },
                    registered_by_name: { $first: "$user.user_name" },
                    createdAt: { $first: "$createdAt" },
                    updatedAt: { $first: "$updatedAt" },
                    total_purchase_amount: { $sum: "$campaign_amount" },
                    total_sale_booking: { $sum: 1 },
                    approved_amount: { $sum: "$approved_amount" },
                }
            }, {
                $project: {
                    _id: 1,
                    sale_booking_date: 1,
                    campaign_amount: 1,
                    description: 1,
                    credit_approval_status: 1,
                    reason_credit_approval: 1,
                    gst_status: 1,
                    balance_payment_ondate: 1,
                    payment_credit_status: 1,
                    booking_status: 1,
                    sale_booking_id: 1,
                    account_id: 1,
                    account_name: 1,
                    registered_by: 1,
                    registered_by_name: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    total_purchase_amount: 1,
                    total_sale_booking: 1,
                    approved_amount: 1,
                    requested_amount: 1,
                    approved_pending: { $subtract: ["$requested_amount", "$approved_amount"] }
                }
            }
        ]);
        if (!userWiseSaleBookingData.length) {
            return response.returnFalse(200, req, res, "No Record Found...", []);
        }
        return response.returnTrue(200, req, res,
            "User Wise Sales Booking Status data retrieved",
            userWiseSaleBookingData
        );
    } catch (err) {
        return response.returnFalse(500, req, res, err.message, {});
    }
}