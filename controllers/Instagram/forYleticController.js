const response = require("../../common/response");
const helper = require("../../helper/helper");
const instaBrandModel = require("../../models/instaBrandModel");
const instaP = require("../../models/instaPModel");
const axios = require("axios");
// require('axios-proxy-fix');
const schedule = require("node-schedule");
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY0NmNhOTExZWY5ZTcwNWM3ODc1Nzk0NyIsIm5hbWUiOiJjcmVhdGl2ZWZ1ZWwiLCJleHAiOjE3Mjc0ODg3MzAsInJvbGUiOiJDTElFTlQiLCJwZXJtaXNzaW9ucyI6W10sInNlc3Npb24iOiJhNjUwNDg1MS00ZTgwLTRiZjQtODBkZC02YzgxYWYxNjU2MzAifQ.EP0JfWCsLxaFdCLr6MizEeltnJ4h3s9PLi-GuoCUops";

/* Schedule job for every day at 11 pm */
// schedule.scheduleJob("* * * * *", async () => {
//   putPostOnTracking();
// });
async function putPostOnTracking(req, res) {
  try {
    /* Anurag Api Logic */
    let apiLogic = async (shortCode, sessionCalled) => {
      //   console.log("api call for shortcode", shortCode,"With api section", sessionCalled);

      // try {
      //   let result = await axios.post(
      //     //   `https://app.ylytic.com/ylytic/api/v1/rt_tracking/posts/${shortCode}`,
      //     `https://app.ylytic.com/ylytic/api/v1/data_refresh/requests`,
      //     {
      //       request_type: "instagram_post",
      //       shortcode: shortCode,
      //     },
      //     {
      //       headers: {
      //         Authorization: `Bearer ${token}`,
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   );
      //   console.log(result)
      // } catch (error) {
      //   console.log(error.message);
      // }
    };

    /* Get Brands which rating is 4 to 5 */
    let brnadsData = await instaBrandModel.find(
      {
        rating: { $gte: 4, $lte: 5 },
      },
      "instaBrandId"
    );

    if (brnadsData?.length === 0) {
      console.log(`There are no brands with 4 to 5 rating.`);
    }
    console.log("There is ", brnadsData.length, "brands with 4 to 5 rating");
    /* Create condition with brand id */
    let conditionForBrandId = brnadsData?.map((item) => {
      let obj = {
        brand_id: item.instaBrandId,
      };
      return obj;
    });
    // console.log("this brands data get in post model", JSON.stringify(conditionForBrandId, null, 2));

    /* Find post (shortcode) based on provide condition */
    let arr_of_shortcode = await instaP.find(
      {
        interpretor_decision: 1,
        crone_trak: { $ne: -1, $lt: 3 }, // crone_trak not equal to -1 and less than 3
        posttype_decision: { $gte: 2 },
        $or: conditionForBrandId,
      },
      "shortCode postedOn crone_trak brand_id"
    );
    console.log(
      "There are ",
      arr_of_shortcode.length,
      "post for respective brand id's ref:"
    );
    const currentDate = new Date();
    let numberOfItemsToProcess = 10 
    arr_of_shortcode?.slice(0, numberOfItemsToProcess)?.map(async (item) => {
      console.log(item.shortCode)
      const postedOnDate = new Date(item.postedOn);
      const timeDifferenceInMilliseconds = currentDate - postedOnDate;
      // Calculate the difference in hours
      const hoursDifference = Math.abs(
        timeDifferenceInMilliseconds / (1000 * 60 * 60)
      );
      // Calculate the difference in days
      const daysDifference = Math.abs(
        timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24)
      );
      //   console.log("daysDifference =>",daysDifference)
      //   console.log("hoursDifference =>",hoursDifference)
      if (item.crone_trak === 0) {
        if (hoursDifference >= 24) {
          //hours
          await apiLogic(item.shortCode, 1);
        }
      } else if (item.crone_trak === 1) {
        if (daysDifference >= 7) {
          //days
          await apiLogic(item.shortCode, 2);
        }
      } else if (item.crone_trak === 2) {
        if (daysDifference >= 30) {
          //days
          await apiLogic(item.shortCode, 3);
        }
      }
    });
  } catch (err) {
    console.log(err.message);
  }
}

// exports.getPostsDataFromInsta = async (req, res) => {
//   try {

//     let proxies = [
//       { protocol: "https", ip: "157.119.211.133", host: "14.102.58.186", port: "8080" },
//       // { protocol: "https", ip: "190.128.152.37", host: "190.128.152.37", port: "8080" },
//       // { protocol: "https", ip: "188.190.40.44", host: "188.190.40.44", port: "8080" },
//       // { protocol: "https", ip: "14.63.229.140", host: "14.63.228.239", port: "80" },
//       // { protocol: "https", ip: "195.138.94.169", host: "195.138.94.169", port: "41890" },
//       // { protocol: "https", ip: "36.91.148.38", host: "36.91.148.38", port: "8080" },
//     ];

//     const instagramApiUrl = 'http://34.93.135.33:8080/api/get_all_users';
//     // const instagramApiUrl = 'https://www.instagram.com/api/v1/users/web_profile_info/?username=rvcjinsta';

//     async function makeRequest(url, proxy) {
//       try {
//         const response = await axios.get(url, {
//           headers: {
//             "X-Csrftoken": "r6YU4BxNGFPbDf1VLKYa0g7koFhIFsrX",
//             "X-Ig-App-Id": "936619743392459",
//           },
//           proxy: {
//             host: proxy.host,
//             port: parseInt(proxy.port),
//             protocol: proxy.protocol,
//           },
//         });
//         console.log(`Request successful with proxy: ${proxy.host}`);
//         console.log(response.data);
//       } catch (error) {
//         console.error(`Request failed with proxy: ${proxy.host} ERROR : ${error.message}`);
//       }
//     }

//     // Loop through proxies and make requests
//     for (let i = 0; i < 200; i++) {
//       const currentProxy = proxies[i % proxies.length]; // Cycle through proxies
//       await makeRequest(instagramApiUrl, currentProxy);
//     }
//   } catch (error) {
//     return response.returnFalse(500, req, res, error.message, {})
//   }
// }
