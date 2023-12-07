const phpPaymentRefundModel = require("../models/phpPaymentRefundModel.js");
const axios = require('axios');
const FormData = require('form-data');

async function checkIfDataExists(sale_booking_refund_id) {
    const query = { sale_booking_refund_id: sale_booking_refund_id };
    const result = await phpPaymentRefundModel.findOne(query);
    return result !== null;
}

exports.savePhpPaymentRefundInNode = async (req, res) => {
    try {
        // const loggedin_user_id = req.body.loggedin_user_id;
        const sendData = new FormData();
        sendData.append("loggedin_user_id",36);
        const response = await axios.post(
            'https://production.sales.creativefuel.io/webservices/RestController.php?view=sales-payment_refund_action',  sendData,
            {
                headers: {
                    ...sendData.getHeaders(),
                },
            }
        )
        const responseData = response.data.body;
        
        for (const data of responseData) {
          
            const existingData = await checkIfDataExists(data.sale_booking_refund_id)
            
            if (!existingData) {

                const creators = new phpPaymentRefundModel({
                    sale_booking_id: data.sale_booking_id,
                    sale_booking_refund_id: data.sale_booking_refund_id,
                    refund_amount: data.refund_amount,
                    refund_files: data.refund_files,
                    manager_refund_status: data.manager_refund_status,
                    manager_refund_reason: data.manager_refund_reason,
                    finance_refund_status: data.finance_refund_status,
                    finance_refund_reason: data.finance_refund_reason,
                    creation_date: data.creation_date,
                    last_updated_date: data.last_updated_date,
                    cust_id: data.cust_id,
                    campaign_amount: data.campaign_amount,
                    sale_booking_date: data.sale_booking_date,
                    cust_name: data.cust_name,
                    sno: data.sno
                })
                const instav = await creators.save();
             
                
            }else{
              return  res.status(200).json({msg:"Data already insterted there is no new data available to insert."})
            }
        }
        res.send({ sms:"data copied in local db", status: 200 })
    } catch (error) {
        return res.status(500).send({ error: error.message, sms: 'error while adding data' })
    }
}

exports.getAllphpPaymentRefundData = async (req, res) => {
    try {
        const getData = await phpPaymentRefundModel.find({})
        res.status(200).send({data:getData})
    } catch (error) {
        res.status(500).send({error: error.message, sms:"error getting php payment refund data"})
    }
}


exports.getAllphpPaymentRefundDataStatus = async (req, res) => {
    try {
        const getData = await phpPaymentRefundModel.find({finance_refund_status : 0});
        res.status(200).send({data:getData})
    } catch (error) {
        res.status(500).send({error: error.message, sms:"error getting php payment refund data"})
    }
}
