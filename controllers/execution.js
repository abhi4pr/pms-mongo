const exeSum = require('../models/exeSumModel.js');
const exeInven = require('../models/exeInvenModel.js');
const jwt = require('jsonwebtoken');
const variable = require('../variables.js');
const axios = require('axios');
const exeCountHisModel = require('../models/exeCountHisModel.js');

exports.exeInvenPost = async (req, res) => {
    try {
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
        res.send({ instav, status: 200 })
    } catch (error) {
        res.status(500).send({ error: error, sms: 'error while adding data' })
    }
}

exports.getExeInventory = async (req, res) => {
    try {
        const getcreators = await exeInven.find();
        if (!getcreators) {
            res.status(500).send({ success: false })
        }
        res.status(200).send(getcreators)
    } catch (err) {
        res.status(500).send({ error: err, sms: 'Error getting all execution inventory' })
    }
};

exports.exeSumPost = async (req, res) => {
    try {
        const loggedin_user_id = req.body.loggedin_user_id;
        const response = await axios.post(
            'https://sales.creativefuel.io/webservices/RestController.php?view=executionSummaryList', {
            loggedin_user_id: loggedin_user_id
        }

        )
        const responseData = response.data.body;
        
        for (const data of responseData) {
          
            const existingData = await checkIfDataExists(data.sale_booking_execution_id)
            
            if (!existingData) {

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
                    execution_date: data?.execution_date === "0000-00-00" ? Date.now() : data?.execution_date,
                    execution_remark: data.execution_remark,
                    execution_done_by: data.execution_done_by,
                    cust_name: data.cust_name,
                    loggedin_user_id: data.loggedin_user_id,
                    execution_status: 0,
                    // execution_status: data.execution_status,
                    payment_update_id: data.payment_update_id,
                    payment_type: data.payment_type,
                    status_desc: data.status_desc,
                    invoice_creation_status: data.invoice_creation_status,
                    manager_approval: data.manager_approval,
                    invoice_particular: data.invoice_particular,
                    payment_status_show: data.payment_status_show,
                    sales_executive_name: data.sales_executive_name,
                    page_ids: data.page_ids,
                    service_id: data.service_id,
                    service_name: data.service_name,
                    execution_excel: data.execution_excel,
                    total_paid_amount: data.total_paid_amount,
                    credit_approval_amount: data.credit_approval_amount,
                    credit_approval_date: data.credit_approval_date,
                    credit_approval_by: data.credit_approval_by,
                    campaign_amount_without_gst: data.campaign_amount_without_gst,
                    start_date: data.start_date
                })
                const instav = await creators.save();
             
                return res.send({ instav, status: 200 })
            }else{
              return  res.status(200).json({msg:"Data already insterted there is no new data available to insert."})
            }
        }
    } catch (error) {
        return res.status(500).send({ error: error, sms: 'error while adding data' })
    }
}

async function checkIfDataExists(sale_booking_execution_id) {
    const query = { sale_booking_execution_id: sale_booking_execution_id };
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
    try {
        const editinsta = await exeSum.findOneAndUpdate({sale_booking_execution_id:req.body.sale_booking_execution_id}, {
            sale_booking_execution_id: req.body.sale_booking_execution_id,
            loggedin_user_id: req.body.loggedin_user_id,
            sale_booking_id: req.body.sale_booking_id,
            execution_remark: req.body.execution_remark,
            execution_status: req.body.execution_status,
            start_date_: req.body.start_date_,
            end_date: req.body.end_date
        }, { new: true })
        if (!editinsta) {
            res.status(500).send({ success: false })
        }
        res.status(200).send({ success: true, data: editinsta })
    } catch (err) {
        res.status(500).send({ error: err.message, sms: 'Error updating execution summary' })
    }
};

exports.executionGraph = async (req, res) => {
    try {
        const pipeline = [
            {
                $match: {
                    $or: [{ execution_status: 1 }, { execution_status: 0 }],
                },
            },
        ];
        exeSum.aggregate(pipeline, (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({err:err.message});
            } else {

                // Helper function to group data by interval start, interval type, and execution status
                const groupData = () => {
                    const groupedData = {};
                    const currentDate = new Date(); 

                    data.forEach(item => {
                        const saleBookingDate = new Date(item.sale_booking_date);
                        const year = saleBookingDate.getFullYear();
                        const month = saleBookingDate.toISOString().slice(0, 7);
                        const currentWeekStartDate = new Date(currentDate);
                        currentWeekStartDate.setHours(0, 0, 0, 0); // Set to the beginning of the day
                        currentWeekStartDate.setDate(currentDate.getDate() - currentDate.getDay()); // Go to the first day of the current week
                        const currentWeekEndDate = new Date(currentWeekStartDate);
                        currentWeekEndDate.setDate(currentWeekStartDate.getDate() + 6);
                        const quarter = `${year}Q${Math.floor((saleBookingDate.getMonth() + 3) / 3)}`;
                        const executionStatus = item.execution_status;

                        // Check if the date falls within the current year, quarter, month, and week
                        if (year === currentDate.getFullYear()) {
                            // Group by Yearly
                            const yearlyKey = `${year}`;
                            if (!groupedData[yearlyKey]) groupedData[yearlyKey] = {};
                            if (!groupedData[yearlyKey]['Yearly']) groupedData[yearlyKey]['Yearly'] = {};
                            if (!groupedData[yearlyKey]['Yearly'][executionStatus]) groupedData[yearlyKey]['Yearly'][executionStatus] = 0;
                            groupedData[yearlyKey]['Yearly'][executionStatus]++;
                        }

                        if (quarter === `${currentDate.getFullYear()}Q${Math.floor((currentDate.getMonth() + 3) / 3)}`) {
                            // Group by Quarterly
                            const quarterlyKey = quarter;
                            if (!groupedData[quarterlyKey]) groupedData[quarterlyKey] = {};
                            if (!groupedData[quarterlyKey]['Quarterly']) groupedData[quarterlyKey]['Quarterly'] = {};
                            if (!groupedData[quarterlyKey]['Quarterly'][executionStatus]) groupedData[quarterlyKey]['Quarterly'][executionStatus] = 0;
                            groupedData[quarterlyKey]['Quarterly'][executionStatus]++;
                        }

                        if (month === currentDate.toISOString().slice(0, 7)) {
                            // Group by Monthly
                            const monthlyKey = month;
                            if (!groupedData[monthlyKey]) groupedData[monthlyKey] = {};
                            if (!groupedData[monthlyKey]['Monthly']) groupedData[monthlyKey]['Monthly'] = {};
                            if (!groupedData[monthlyKey]['Monthly'][executionStatus]) groupedData[monthlyKey]['Monthly'][executionStatus] = 0;
                            groupedData[monthlyKey]['Monthly'][executionStatus]++;
                        }

                        if (saleBookingDate >= currentWeekStartDate && saleBookingDate <= currentWeekEndDate) {
                            // Group by Weekly
                            const weeklyKey = `${currentWeekStartDate.toISOString().slice(0, 10)} - ${currentWeekEndDate.toISOString().slice(0, 10)}`;
                            if (!groupedData[weeklyKey]) groupedData[weeklyKey] = {};
                            if (!groupedData[weeklyKey]['Weekly']) groupedData[weeklyKey]['Weekly'] = {};
                            if (!groupedData[weeklyKey]['Weekly'][executionStatus]) groupedData[weeklyKey]['Weekly'][executionStatus] = 0;
                            groupedData[weeklyKey]['Weekly'][executionStatus]++;
                        }
                    });

                    return groupedData;
                };


                // Helper function to convert grouped data to the desired response format
                const convertToResponse = (groupedData) => {
                    const response = [];

                    for (const key in groupedData) {
                        for (const type in groupedData[key]) {
                            for (const status in groupedData[key][type]) {
                                const count = groupedData[key][type][status];
                                const entry = {
                                    interval_start: key,
                                    interval_type: type,
                                    execution_status: parseInt(status),
                                    count
                                };
                                response.push(entry);
                            }
                        }
                    }

                    return response;
                };

                // Get grouped data and convert to the desired response format
                const groupedData = groupData();
                const modifiedResponse = convertToResponse(groupedData);

                // console.log(modifiedResponse);
                return res.send(modifiedResponse);
            }
        });

        // const getcreators = await exeSum.find();
        // if (!getcreators) {
        //     res.status(500).send({ success: false });
        // }
        // res.status(200).send(getcreators);
    } catch (err) {
        res.status(500).send({ error: err.message, sms: 'Error getting graph summary' });
    }
}

exports.getLatestPIDCount = async (req, res) => {
    try {   
        const getcreators = await exeCountHisModel.findOne({p_id:req.params.p_id}).sort({ creation_date: -1 });
        if (!getcreators) {
            res.status(500).send({ success: false });
        }
        res.status(200).send(getcreators);
    } catch (err) {
        res.status(500).send({ error: err.message, sms: 'Error getting all Ip Count' });
    }
};

exports.addIPCountHistory = async (req, res) =>{
    try{
        const simc = new exeCountHisModel({
            p_id: req.body.p_id,
            reach: req.body.reach,
            impression: req.body.impression,
            engagement: req.body.engagement,
            story_view: req.body.story_view,
            stats_for: req.body.stats_for,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            media: req.file.filename ?? ""
        })
        const simv = await simc.save();
        res.send({simv,status:200});
    } catch(err){
        res.status(500).send({error:err.message,sms:'This addIPCountHistory cannot be created'})
    }
};

exports.exeForPurchase = async (req, res) => {
    try {
        const loggedin_user_id = req.body.loggedin_user_id;
        const response = await axios.post(
            'https://purchase.creativefuel.io/webservices/RestController.php?view=executionSummaryList', {
            loggedin_user_id: loggedin_user_id
        }

        )
        const responseData = response.data.body;
        
        for (const data of responseData) {
          
            const existingData = await checkIfDataExists(data.p_id)
            
            if (!existingData) {

                const creators = new exeSum({
                    p_id: data.p_id,
                    page_name: data.page_name,
                    cat_name: data.cat_name,
                    platform: data.platform,
                    follower_count: data.follower_count,
                    page_link: data.page_link,
                    vendor_id: data.vendor_id
                })
                const instav = await creators.save();
             
                return res.send({ instav, status: 200 })
            }else{
              return  res.status(200).json({msg:"Data already insterted there is no new data available to insert."})
            }
        }
    } catch (error) {
        return res.status(500).send({ error: error.message, sms: 'error while adding data' })
    }
}