const exeSum = require('../models/exeSumModel.js');
const exeInven = require('../models/exeInvenModel.js');
const jwt = require('jsonwebtoken');
const variable = require('../variables.js');
const axios = require('axios');

exports.exeInvenPost = async(req, res) => {
    try{
        const creators = new exeInven({
            account_link: req.body.account_link,
            account_name: req.body.account_name,
            api_service_id: req.body.api_service_id,
            both_: req.body.both_,
            brand_Integration: req.body.brand_Integration,
            cat_name: req.body.cat_name,
            channel_link: req.body.channel_link,
            channel_username: req.body.channel_username,
            comment: req.body.comment,
            commission: req.body.commission,
            display: req.body.display,
            follower_count: req.body.follower_count,
            group_id: req.body.group_id,
            hidden_: req.body.hidden_,
            incoming_status: req.body.incoming_status,
            logo_Integration: req.body.logo_Integration,
            multiple_cost: req.body.multiple_cost,
            note: req.body.note,
            otherboth: req.body.otherboth,
            otherpost: req.body.otherpost,
            otherstory: req.body.otherstory,
            p_id: req.body.p_id,
            page_category: req.body.page_category,
            page_health: req.body.page_health,
            page_level: req.body.page_level,
            page_likes: req.body.page_likes,
            page_link: req.body.page_link,
            page_name: req.body.page_name,
            page_status: req.body.page_status,
            page_user_id: req.body.page_user_id,
            platform: req.body.platform,
            platform_old: req.body.platform_old,
            post: req.body.post,
            price_type: req.body.price_type,
            repost: req.body.repost,
            sales_both_: req.body.sales_both_,
            sales_post: req.body.sales_post,
            sales_story: req.body.sales_story,
            service_id: req.body.service_id,
            service_name_: req.body.service_name_,
            shorts: req.body.shorts,
            story: req.body.story,
            subscribers: req.body.subscribers,
            username: req.body.username,
            vendor_id: req.body.vendor_id
        })
        const instav = await creators.save();
        res.send({instav,status:200})
    }catch(error){
        res.status(500).send({error:error, sms:'error while adding data'})
    }
}

exports.getExeInventory = async (req, res) => {
    try{
        const getcreators = await exeInven.find();
        if(!getcreators){
            res.status(500).send({success:false})
        }
        res.status(200).send(getcreators)
    } catch(err){
        res.status(500).send({error:err,sms:'Error getting all execution inventory'})
    }
};

exports.exeSumPost = async(req, res) => {
    try{
        const loggedin_user_id = req.body.loggedin_user_id;
        const response = await axios.post(
            'https://sales.creativefuel.io/webservices/RestController.php?view=executionSummaryList',{
                loggedin_user_id: loggedin_user_id
            }
        )
        const responseData = response.data.body;
        for(const data of responseData){
            const existingData = await checkIfDataExists(data.sale_booking_execution_id)
            if(!existingData){

                const creators = new exeSum({
                    sale_booking_execution_id: data.sale_booking_execution_id,
                    sale_booking_id: data.sale_booking_id,
                    start_date_: data.start_date_,
                    end_date: data.end_date,
                    summary: data.summary,
                    remarks: data.remarks,
                    created_by: data.created_by,
                    last_updated_by: data.last_updated_by,
                    creation_date: data.creation_date,
                    last_updated_date: data.last_updated_date,
                    sale_booking_date: data.sale_booking_date,
                    campaign_amount: data.campaign_amount,
                    execution_date: data.execution_date,
                    execution_remark: data.execution_remark,
                    execution_done_by: data.execution_done_by,
                    cust_name: data.cust_name,
                    loggedin_user_id: data.loggedin_user_id,
                    execution_status: data.execution_status,
                    payment_update_id: data.payment_update_id,
                    payment_type: data.payment_type,
                    status_desc: data.status_desc,
                    invoice_creation_status: data.invoice_creation_status,
                    manager_approval: data.manager_approval,
                    invoice_particular: data.invoice_particular,
                    payment_status_show: data.payment_status_show
                })
                const instav = await creators.save();
                res.send({instav,status:200})
            }
        }
    }catch(error){
        res.status(500).send({error:error, sms:'error while adding data'})
    }
}

async function checkIfDataExists(sale_booking_execution_id){
    const query = {sale_booking_execution_id: sale_booking_execution_id};
    const result = await exeSum.findOne(query);
    return result !== null;
}

exports.getExeSum = async (req, res) => {
    try {
        const getcreators = await exeSum.find();
        if (!getcreators) {
            res.status(500).send({ success: false });
        }
        res.status(200).send(getcreators);
    } catch (err) {
        res.status(500).send({ error: err, sms: 'Error getting all execution summary' });
    }
};

exports.editExeSum = async (req, res) => {
    try{
        const editinsta = await exeSum.findByIdAndUpdate(req.body.sale_booking_execution_id,{
            sale_booking_execution_id: req.body.sale_booking_execution_id,
            loggedin_user_id: req.body.loggedin_user_id,
            sale_booking_id: req.body.sale_booking_id,
            execution_remark: req.body.execution_remark,
            execution_status: req.body.execution_status,
            start_date_: req.body.start_date_,
            end_date: req.body.end_date
        }, { new: true })
        if(!editinsta){
            res.status(500).send({success:false})
        }
        res.status(200).send({success:true,data:editinsta})
    } catch(err){
        res.status(500).send({error:err,sms:'Error updating execution summary'})
    }
};