const response = require("../../common/response");
const helper = require("../../helper/helper");
const instaBrandModel = require("../../models/instaBrandModel");
const instaP = require("../../models/instaPModel");
const axios = require("axios");
const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY0NmNhOTExZWY5ZTcwNWM3ODc1Nzk0NyIsIm5hbWUiOiJjcmVhdGl2ZWZ1ZWwiLCJleHAiOjE3Mjc0ODg3MzAsInJvbGUiOiJDTElFTlQiLCJwZXJtaXNzaW9ucyI6W10sInNlc3Npb24iOiJhNjUwNDg1MS00ZTgwLTRiZjQtODBkZC02YzgxYWYxNjU2MzAifQ.EP0JfWCsLxaFdCLr6MizEeltnJ4h3s9PLi-GuoCUops";

exports.putPostOnTracking = async (req, res) => {
    try {
        /* Anurag Api Logic */
        let apiLogic = async (shortCode) => {
   
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 1); // Adding one day

            // Format the date as needed ("YYYY-MM-DD HH:mm:ss.SS")
            const formattedDate = currentDate.toISOString().slice(0, 19).replace("T", " ") + ".00";

            let payloadObj = {
                cron_expression: "30 17 * * *",  // UTC time is 05:30 PM AND OUR TIME IS 11:00 PM
                tracking_expiry_at: formattedDate,
                tracking: true,
            };
           
            try {
                let result = await axios.put(
                    //   `https://app.ylytic.com/ylytic/api/v1/rt_tracking/posts/${shortCode}`,
                    payloadObj,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
            } catch (error) {
                console.log(error.message);
            }
        };

        /* Get Brands which rating is 4 to 5 */
        let brnadsData = await instaBrandModel.find(
            {
                rating: { $gte: 4, $lte: 5 },
            },
            "instaBrandId"
        );

        if (brnadsData?.length === 0) {
            return response.returnFalse(
                200,
                req,
                res,
                `There are no brands with 4 to 5 rating.`,
                {}
            );
        }
        /* Create condition with brand id */
        let conditionForBrandId = brnadsData?.map((item) => {
            let obj = {
                brand_id: item.instaBrandId,
            };
            return obj;
        });
        /* Find post (shortcode) based on provide condition */
        let arr_of_shortcode = await instaP.find(
            {
                interpretor_decision: 1,
                crone_trak: { $ne: -1, $lt: 3 }, // crone_trak not equal to -1 and less than 3
                posttype_decision: 1,
                $or: conditionForBrandId,
            },
            "shortCode"
        );
        arr_of_shortcode?.map(async (item) => {
            if (item.crone_trak === 0) {
                let diff = item.postedOn - Date.now();
                if (diff >= 24) {  //hours
                    await apiLogic(item.shortCode);
                }
            } else if (item.crone_trak === 1) {
                let diff = item.createdAt - Date.now();
                if (diff >= 7) {   //days
                    await apiLogic(item.shortCode);
                }
            } else if (item.crone_trak === 2) {
                let diff = item.postedOn - Date.now();
                if (diff >= 30) {  //days
                    await apiLogic(item.shortCode);
                }
            }
            console.log("Logic performed for tracking post.")
        });
    } catch (err) {
        return response.returnFalse(
            500,
            req,
            res,
            `INTERNAL SERVER ERROR : ${err.message}`,
            {}
        );
    }
};
