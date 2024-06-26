const phpFinanceModel = require("../models/phpFinanceModel.js");
const axios = require('axios');
const FormData = require('form-data');

async function checkIfDataExists(payment_update_id) {
    const query = { payment_update_id: payment_update_id };
    const result = await phpFinanceModel.findOne(query);
    return result !== null;
}

// exports.savePhpFinanceDataInNode = async (req, res) => {
//     try {
//         // const loggedin_user_id = req.body.loggedin_user_id;
//         const sendData = new FormData();
//         sendData.append("loggedin_user_id", 36);
//         const response = await axios.post(
//             'https://sales.creativefuel.io/webservices/RestController.php?view=pending_payment_list', sendData,
//             { timeout: 1000 },
//             {
//                 headers: {
//                     ...sendData.getHeaders(),
//                 },
//             }
//         )
//         const responseData = response.data.body;

//         for (const data of responseData) {

//             const existingData = await checkIfDataExists(data.payment_update_id)

//             if (!existingData) {

//                 const creators = new phpFinanceModel({
//                     payment_update_id: data.payment_update_id,
//                     user_name: data.user_name,
//                     cust_name: data.cust_name,
//                     campaign_amount: data.campaign_amount,
//                     sale_booking_date: data.sale_booking_date,
//                     campaign_amount_without_gst: data.campaign_amount_without_gst,
//                     payment_date: data.payment_date,
//                     payment_amount_show: data.payment_amount_show,
//                     payment_mode: data.payment_mode,
//                     payment_screenshot: data.payment_screenshot,
//                     title: data.title,
//                     detail: data.detail,
//                     payment_ref_no: data.payment_ref_no,
//                     payment_approval_status: data.payment_approval_status,
//                     creation_date: data.creation_date,
//                     payment_update_remarks: data.payment_update_remarks,
//                     sno: data.sno
//                     // payment_update_id: data.payment_update_id,
//                     // payment_date: data.payment_date,
//                     // sale_booking_id: data.sale_booking_id,
//                     // payment_amount: data.payment_amount,
//                     // payment_amount_show: data.payment_amount_show,
//                     // payment_mode: data.payment_mode,
//                     // payment_detail_id: data.payment_detail_id,
//                     // payment_screenshot: data.payment_screenshot,
//                     // payment_type: data.payment_type,
//                     // payment_ref_no: data.payment_ref_no,
//                     // credit_limit_check: data.credit_limit_check,
//                     // user_credit_limit_check: data.user_credit_limit_check,
//                     // payment_approval_status: data.payment_approval_status,
//                     // reason_credit_approval: data.reason_credit_approval,
//                     // balance_payment_ondate: data.balance_payment_ondate,
//                     // action_reason: data.action_reason,
//                     // remarks: data.remarks,
//                     // created_by: data.created_by,
//                     // last_updated_by: data.last_updated_by,
//                     // creation_date: data.creation_date,
//                     // last_updated_date: data.last_updated_date,
//                     // cust_id: parseInt(data.cust_id),
//                     // sale_booking_date: data.sale_booking_date,
//                     // campaign_amount: data.campaign_amount,
//                     // base_amount: data.base_amount,
//                     // gst_amount: data.gst_amount,
//                     // net_amount: data.net_amount,
//                     // campaign_amount_without_gst: data.campaign_amount_without_gst,
//                     // total_paid_amount: data.total_paid_amount,
//                     // balance: data.balance,
//                     // description: data.description,
//                     // status_desc: data.status_desc,
//                     // invoice_creation_status: data.invoice_creation_status,
//                     // invoice: data.invoice,
//                     // invoice_particular: data.invoice_particular,
//                     // invoice_action_reason: data.invoice_action_reason,
//                     // manager_approval: data.manager_approval,
//                     // salesexe_credit_approval: data.salesexe_credit_approval,
//                     // salesexe_credit_used: data.salesexe_credit_used,
//                     // execution_approval: data.execution_approval,
//                     // last_action_reason: data.last_action_reason,
//                     // execution_date: data.execution_date,
//                     // execution_remark: data.execution_remark,
//                     // execution_done_by: data.execution_done_by,
//                     // execution_status: data.execution_status,
//                     // execution_summary: data.execution_summary,
//                     // fixed_credit_approval_reason: data.fixed_credit_approval_reason,
//                     // gst_status: data.gst_status,
//                     // tds_status: data.tds_status,
//                     // close_date: data.close_date,
//                     // verified_amount: data.verified_amount,
//                     // verified_remark: data.verified_remark,
//                     // sale_booking_file: data.sale_booking_file,
//                     // no_incentive: data.no_incentive,
//                     // old_sale_booking_id: data.old_sale_booking_id,
//                     // sale_booking_type: data.sale_booking_type,
//                     // rs_sale_booking_id: data.rs_sale_booking_id,
//                     // service_taken_amount: data.service_taken_amount,
//                     // user_id: data.user_id,
//                     // cust_type: data.cust_type,
//                     // cust_name: data.cust_name,
//                     // mobile_no: data.mobile_no,
//                     // alternative_no: data.alternative_no,
//                     // email_id: data.email_id,
//                     // address: data.address,
//                     // city: data.city,
//                     // state: data.state,
//                     // country: data.country,
//                     // website: data.website,
//                     // instagram_username: data.instagram_username,
//                     // lead_source_id: data.lead_source_id,
//                     // new_type: data.new_type,
//                     // sales_category_id: data.sales_category_id,
//                     // sales_sub_category_id: data.sales_sub_category_id,
//                     // company_name: data.company_name,
//                     // gst_no: data.gst_no,
//                     // pancard_no: data.pancard_no,
//                     // contact_person_name: data.contact_person_name,
//                     // gst_doc: data.gst_doc,
//                     // pancard_doc: data.pancard_doc,
//                     // other_doc: data.other_doc,
//                     // other_doc_name: data.other_doc_name,
//                     // id: data.id,
//                     // title: data.title,
//                     // detail: data.detail,
//                     // gst_bank: data.gst_bank,
//                     // status: data.status,
//                     // created_at: data.created_at,
//                     // sno: data.sno,
//                     // user_name: data.user_name,
//                     // payment_update_remarks: data.payment_update_remarks 
//                 })
//                 const instav = await creators.save();


//             } else {
//                 const updateExistingData = Object.keys(data).some(key => existingData[key] !== data[key])
//                 if (updateExistingData) {
//                     await phpFinanceModel.updateOne({ payment_update_id: data.payment_update_id },
//                         {
//                             $set: {
//                                 // payment_date: data.payment_date,
//                                 // sale_booking_id: data.sale_booking_id,
//                                 // payment_amount: data.payment_amount,
//                                 // payment_amount_show: data.payment_amount_show,
//                                 // payment_mode: data.payment_mode,
//                                 // payment_detail_id: data.payment_detail_id,
//                                 // payment_screenshot: data.payment_screenshot,
//                                 // payment_type: data.payment_type,
//                                 // payment_ref_no: data.payment_ref_no,
//                                 // credit_limit_check: data.credit_limit_check,
//                                 // user_credit_limit_check: data.user_credit_limit_check,
//                                 // payment_approval_status: data.payment_approval_status,
//                                 // reason_credit_approval: data.reason_credit_approval,
//                                 // balance_payment_ondate: data.balance_payment_ondate,
//                                 // action_reason: data.action_reason,
//                                 // remarks: data.remarks,
//                                 // created_by: data.created_by,
//                                 // last_updated_by: data.last_updated_by,
//                                 // creation_date: data.creation_date,
//                                 // last_updated_date: data.last_updated_date,
//                                 // cust_id: parseInt(data.cust_id),
//                                 // sale_booking_date: data.sale_booking_date,
//                                 // campaign_amount: data.campaign_amount,
//                                 // base_amount: data.base_amount,
//                                 // gst_amount: data.gst_amount,
//                                 // net_amount: data.net_amount,
//                                 // campaign_amount_without_gst: data.campaign_amount_without_gst,
//                                 // total_paid_amount: data.total_paid_amount,
//                                 // balance: data.balance,
//                                 // description: data.description,
//                                 // status_desc: data.status_desc,
//                                 // invoice_creation_status: data.invoice_creation_status,
//                                 // invoice: data.invoice,
//                                 // invoice_particular: data.invoice_particular,
//                                 // invoice_action_reason: data.invoice_action_reason,
//                                 // manager_approval: data.manager_approval,
//                                 // salesexe_credit_approval: data.salesexe_credit_approval,
//                                 // salesexe_credit_used: data.salesexe_credit_used,
//                                 // execution_approval: data.execution_approval,
//                                 // last_action_reason: data.last_action_reason,
//                                 // execution_date: data.execution_date,
//                                 // execution_remark: data.execution_remark,
//                                 // execution_done_by: data.execution_done_by,
//                                 // execution_status: data.execution_status,
//                                 // execution_summary: data.execution_summary,
//                                 // fixed_credit_approval_reason: data.fixed_credit_approval_reason,
//                                 // gst_status: data.gst_status,
//                                 // tds_status: data.tds_status,
//                                 // close_date: data.close_date,
//                                 // verified_amount: data.verified_amount,
//                                 // verified_remark: data.verified_remark,
//                                 // sale_booking_file: data.sale_booking_file,
//                                 // no_incentive: data.no_incentive,
//                                 // old_sale_booking_id: data.old_sale_booking_id,
//                                 // sale_booking_type: data.sale_booking_type,
//                                 // rs_sale_booking_id: data.rs_sale_booking_id,
//                                 // service_taken_amount: data.service_taken_amount,
//                                 // user_id: data.user_id,
//                                 // cust_type: data.cust_type,
//                                 // cust_name: data.cust_name,
//                                 // mobile_no: data.mobile_no,
//                                 // alternative_no: data.alternative_no,
//                                 // email_id: data.email_id,
//                                 // address: data.address,
//                                 // city: data.city,
//                                 // state: data.state,
//                                 // country: data.country,
//                                 // website: data.website,
//                                 // instagram_username: data.instagram_username,
//                                 // lead_source_id: data.lead_source_id,
//                                 // new_type: data.new_type,
//                                 // sales_category_id: data.sales_category_id,
//                                 // sales_sub_category_id: data.sales_sub_category_id,
//                                 // company_name: data.company_name,
//                                 // gst_no: data.gst_no,
//                                 // pancard_no: data.pancard_no,
//                                 // contact_person_name: data.contact_person_name,
//                                 // gst_doc: data.gst_doc,
//                                 // pancard_doc: data.pancard_doc,
//                                 // other_doc: data.other_doc,
//                                 // other_doc_name: data.other_doc_name,
//                                 // id: data.id,
//                                 // title: data.title,
//                                 // detail: data.detail,
//                                 // gst_bank: data.gst_bank,
//                                 // status: data.status,
//                                 // created_at: data.created_at,
//                                 // sno: data.sno,
//                                 // user_name: data.user_name,
//                                 // payment_update_remarks: data.payment_update_remarks 
//                                 payment_update_id: data.payment_update_id,
//                                 user_name: data.user_name,
//                                 cust_name: data.cust_name,
//                                 campaign_amount: data.campaign_amount,
//                                 sale_booking_date: data.sale_booking_date,
//                                 campaign_amount_without_gst: data.campaign_amount_without_gst,
//                                 payment_date: data.payment_date,
//                                 payment_amount_show: data.payment_amount_show,
//                                 payment_mode: data.payment_mode,
//                                 payment_screenshot: data.payment_screenshot,
//                                 title: data.title,
//                                 detail: data.detail,
//                                 payment_ref_no: data.payment_ref_no,
//                                 payment_approval_status: data.payment_approval_status,
//                                 creation_date: data.creation_date,
//                                 payment_update_remarks: data.payment_update_remarks,
//                                 sno: data.sno
//                             }
//                         }
//                     )
//                 } else {
//                     return res.status(200).json({ msg: "Data already insterted there is no new data available to insert." })
//                 }
//                 //   return  res.status(200).json({msg:"Data already insterted there is no new data available to insert."})
//             }
//         }
//         res.send({ sms: "data copied in local db", status: 200 })
//     } catch (error) {
//         return res.status(500).send({ error: error.message, sms: 'error while adding data' })
//     }
// }


// exports.savePhpFinanceDataInNode = async (req, res) => {
//     try {
//         const sendData = new FormData();
//         sendData.append("loggedin_user_id", 36);

//         const response = await axios.post('https://sales.creativefuel.io/webservices/RestController.php?view=pending_payment_list', sendData, {
//             timeout: 4000,
//             headers: sendData.getHeaders(),
//         });

//         const responseData = response.data.body;

//         const batchSize = 1;
//         const batches = [];

//         for (let i = 0; i < responseData.length; i += batchSize) {
//             batches.push(responseData.slice(i, i + batchSize));
//         }

//         await Promise.all(batches.map(async (batch) => {
//             await Promise.all(batch.map(async (data) => {
//                 const existingData = await checkIfDataExists(data.payment_update_id);

//                 if (!existingData) {
//                     const creators = new phpFinanceModel(data);
//                     await creators.save();
//                 } else {
//                     const updateExistingData = Object.keys(data).some(key => existingData[key] !== data[key]);

//                     if (updateExistingData) {
//                         await phpFinanceModel.updateOne({ payment_update_id: data.payment_update_id }, { $set: data });
//                     } else {
//                         return res.status(200).json({ msg: "Data already inserted, there is no new data available to insert." });
//                     }
//                 }
//             }));
//         }));

//         res.status(200).json({ msg: "Data copied in local db", status: 200 });
//     } catch (error) {
//         return res.status(500).json({ error: error.message, msg: 'Error while adding data' });
//     }
// };


exports.savePhpFinanceDataInNode = async (req, res) => {
    try {
        const sendData = new FormData();
        sendData.append("loggedin_user_id", 36);

        const response = await axios.post('https://sales.creativefuel.io/webservices/RestController.php?view=pending_payment_list', sendData, {
            timeout: 4000,
            headers: sendData.getHeaders(),
        });

        const responseData = response.data.body;

        res.status(200).json({ data: responseData, msg: "Response data received", status: 200 });

        const batchSize = 2;
        const batches = [];

        for (let i = 0; i < responseData.length; i += batchSize) {
            batches.push(responseData.slice(i, i + batchSize));
        }

        await Promise.all(batches.map(async (batch) => {
            await Promise.all(batch.map(async (data) => {
                const existingData = await checkIfDataExists(data.payment_update_id);

                if (!existingData) {
                    const creators = new phpFinanceModel(data);
                    await creators.save();
                } else {
                    const updateExistingData = Object.keys(data).some(key => existingData[key] !== data[key]);

                    if (updateExistingData) {
                        await phpFinanceModel.updateOne({ payment_update_id: data.payment_update_id }, { $set: data });
                    } else {
                        console.log("Data already inserted, there is no new data available to insert.");
                    }
                }
            }));
        }));

        console.log("Data copied in local db");
    } catch (error) {
        return res.status(500).json({ error: error.message, msg: 'Error while adding data' });
    }
};

exports.getAllphpFinanceData = async (req, res) => {
    try {
        const getData = await phpFinanceModel.find({ payment_approval_status: { $in: ["1", "2"] } });
        res.status(200).send({ data: getData })
    } catch (error) {
        res.status(500).send({ error: error.message, sms: "error getting php finance data" })
    }
}


exports.getAllphpFinanceDataPending = async (req, res) => {
    try {
        const getData = await phpFinanceModel.aggregate([
            {
                $match: { payment_approval_status: "0" }
            },
            {
                $group: {
                    _id: "$payment_update_id",
                    data: { $first: "$$ROOT" }
                }
            },
            {
                $replaceRoot: { newRoot: "$data" }
            }
        ]);

        if (getData && getData.length > 0) {
            res.status(200).send({ data: getData });
        } else {
            res.status(404).send({ sms: "No pending php payment refund data found" });
        }
    } catch (error) {
        console.error("Error in getAllphpFinanceDataPending:", error);
        res.status(500).send({ error: error.message, sms: "Error getting php payment refund data" });
    }
};

exports.deletePhpFinanceData = async (req, res) => {
    const id = req.params.id;
    const condition = { payment_update_id: id };
    try {
        const result = await phpFinanceModel.deleteOne(condition);
        if (result.deletedCount === 1) {
            return res.status(200).json({
                success: true,
                message: `phpFinanceModel with ID ${id} deleted successfully`,
            });
        } else {
            return res.status(200).json({
                success: false,
                message: `phpFinanceModel with ID ${id} not found`,
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the phpFinanceModel",
            error: error.message,
        });
    }
};