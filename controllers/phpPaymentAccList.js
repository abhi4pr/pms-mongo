const phpPaymentAccListModel = require("../models/phpPaymentAccListModel.js");
const axios = require('axios');
const FormData = require('form-data');

async function checkIfDataExists(id) {
    const query = { id: id };
    const result = await phpPaymentAccListModel.findOne(query);
    return result !== null;
}

exports.savePhpPaymentAccDataInNode = async (req, res) => {
    try {
        // const loggedin_user_id = req.body.loggedin_user_id;
        const sendData = new FormData();
        sendData.append("loggedin_user_id",36);
        const response = await axios.post(
            'https://production.sales.creativefuel.io/webservices/RestController.php?view=sales-payment_account_list',  sendData,
            {
                headers: {
                    ...sendData.getHeaders(),
                },
            }
        )
        const responseData = response.data.body;
        
        for (const data of responseData) {
          
            const existingData = await checkIfDataExists(data.id)
            
            if (!existingData) {

                const creators = new phpPaymentAccListModel({
                    id: data.id,
                    title: data.title,
                    detail: data.detail,
                    gst_bank: data.gst_bank,
                    payment_type: data.payment_type,
                    status: data.status,
                    created_at: data.created_at,
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

exports.getAllphpPaymentAccData = async (req, res) => {
    try {
        const getData = await phpPaymentAccListModel.find({})
        res.status(200).send({data:getData})
    } catch (error) {
        res.status(500).send({error: error.message, sms:"error getting php payment account data"})
    }
}