
// const creatorCronModel = require("../../../models/Instagram/creatorCronModel");
// const schedule = require("node-schedule");
// const response = require('../../../common/response');
// const cfInstaPostModel = require("../../../models/Instagram/cfInstaPostModel");
// const { formatePoostedOnDate } = require("../../../helper/instaHelperFunction");
// // Dynamic Crone Logic

// async function x(creator) {
//     console.log("Execute", creator.creator)

//     await creatorCronModel.findByIdAndUpdate(
//         creator._id,
//         [
//             {
//                 $set: {
//                     scheduledCountTracked: {
//                         $cond: {
//                             if: { $gt: ['$scheduledCount', '$scheduledCountTracked'] },
//                             then: { $add: ['$scheduledCountTracked', 1] },
//                             else: '$scheduledCountTracked',
//                         },
//                     },
//                 },
//             },
//         ]
//     );
//     let creatorCronData = await creatorCronModel.findById(creator._id);
//     if (creatorCronData?.scheduledCountTracked === creatorCronData?.scheduledCount) {
//         await creatorCronModel.findByIdAndUpdate(creator._id, { scheduled: false, scheduledCountTracked: 0 });
//     }
// }
// // schedule.scheduleJob("*/10 * * * *", async () => {
// // // schedule.scheduleJob("*/60 * * * *", async () => {
// //     console.log("run root cron")
// //     const creatorsWithCron = await creatorCronModel.find({ trackingStatus: true, scheduled: { $ne: true } });
// //     if (creatorsWithCron && creatorsWithCron.length !== 0) {
// //         creatorsWithCron.map(async (creator) => {
// //             schedule.scheduleJob(creator.cronExpression, async () => {
// //                // x(creator);
// //                 getPostDataFromInsta(creator);
// //             });
// //             await creatorCronModel.findByIdAndUpdate(creator._id, { scheduled: true });
// //         });
// //     } else {
// //         console.log("There is no creator with cron")
// //     }

// // });

// // function xy(creator){
// //   console.log("creator name = > ",creator)
// // }

// async  function getPostDataFromInsta (creator) {
//   // Use dynamic import for ESM module
//   import('got').then((gotModule) => {
//     const got = gotModule.default;
//     const serversList = require('../servers');
//     const tunnel = require('tunnel');

//     let si = 0;

//     const urlA = Array.from({ length: 1 }, (_, index) => {
//       // return `https://jarvis-work-backend.onrender.com/api/register_campaign`;
//       return `https://www.instagram.com/api/v1/users/web_profile_info/?username=${creator.creator}`;
//     });


//     const getHost = () => {
//       si++;
//       if (si === serversList.length) si = 0;
//       const [host, port] = serversList[si].split(':');
//       return { host, port };
//     };

//     const procreq = async ({ url }) => {
//       try {
//         let proxy = getHost()
//         console.log(proxy,url)
//         const request = got(url, {
//           agent: {
//             https: tunnel.httpsOverHttp({
//               proxy
//             }),
//           }, headers: {
//             "X-Csrftoken": "6JljTdgZuBP87WGuWLgStV",
//             "X-Ig-App-Id": "936619743392459",
//           },
//         });
//         const p2 = new Promise((resolve, reject) => {
//           setTimeout(() => {
//             request.cancel();
//             resolve('');
//           }, 5 * 1000);
//         });
//         return await Promise.race([request, p2]);
//       } catch (err) {
//         throw err;
//       }
//     };

//     const processWithRetry = async ({ url }) => {
//       try {
//         const ra = [...new Array(50)].map((r) => 1);
//         let apiresp;
//         let retryAttempt = 0;
//         let positiveResponseReceived = false;

//         const resp = await ra.reduce(async (previousPromise, nextID) => {
//           try {
//             if (positiveResponseReceived) {
//               // Break the loop if a positive response has been received
//               return Promise.resolve();
//             }
//             console.log("positiveResponseReceived => ",positiveResponseReceived)
//             const res = await previousPromise;
//             if (!res?.body && !apiresp?.data?.user ) {
//               retryAttempt++;
//               return procreq({ url });
//             }
//             if (res?.body) {
//               apiresp = res?.body;
//               if(apiresp?.data?.user && JSON.parse(apiresp)?.data?.user?.edge_owner_to_timeline_media?.edges ){
//                 console.log("here come")
//                 positiveResponseReceived = true;
//               }
//             }

//             return Promise.resolve();
//           } catch (err) {
//             retryAttempt++;
//             return procreq({ url });
//           }
//         }, Promise.resolve());

//         if(!positiveResponseReceived){
//           procreq({ url });
//         }
//         return { retryAttempt, success: positiveResponseReceived ? 'success' : 'error', data: apiresp?.data?.user && JSON.parse(apiresp)?.data?.user };
//       } catch (err) {
//         console.log(err);
//         return { retryAttempt: 20, success: 'error', data: '' };
//       }
//     };

//     // const processWithRetry = async ({ url, proxies }) => {
//     //   try {
//     //     const ra = [...new Array(proxies.length)].map((r, index) => index);
//     //     let apiresp;
//     //     let positiveResponseReceived = false;

//     //     const resp = await ra.reduce(async (previousPromise, proxyIndex) => {
//     //       try {
//     //         if (positiveResponseReceived) {
//     //           // Break the loop if a positive response has been received
//     //           return Promise.resolve();
//     //         }

//     //         const res = await previousPromise;

//     //         if (!res?.body && !apiresp) {
//     //           // Retry with the next proxy if no valid response is received
//     //           return procreq({ url, proxy: proxies[proxyIndex] });
//     //         }

//     //         if (res?.body) {
//     //           apiresp = res?.body;
//     //           if (apiresp?.data?.user && JSON.parse(apiresp)?.data?.user?.edge_owner_to_timeline_media?.edges) {
//     //             console.log("Valid response received");
//     //             positiveResponseReceived = true;
//     //           }
//     //         }
//     //       } catch (err) {
//     //         // Retry with the next proxy in case of an error
//     //         return procreq({ url, proxy: proxies[proxyIndex] });
//     //       }
//     //     }, Promise.resolve());

//     //     return { success: positiveResponseReceived ? 'success' : 'error', data: apiresp?.data?.user && JSON.parse(apiresp)?.data?.user };
//     //   } catch (err) {
//     //     console.log(err);
//     //     return { success: 'error', data: '' };
//     //   }
//     // };
//     const tryall = async () => {
//       try {
//         const results = await Promise.all(
//           urlA.map((url) => processWithRetry({ url }))
//         );
//         results.forEach((result, index) => {
//           console.log(`Result ${index + 1}:`, result);
//           if(result?.success !== 'error'){
//             let resObjFromInsta = result?.data?.edge_owner_to_timeline_media?.edges

//             resObjFromInsta.forEach(async(result2, index2) => {
//               let mainNode = result2?.node
//               let obj = {
//                 brand_id: 0,
//                 campaign_id: 0,
//                 shortCode: mainNode?.shortcode ?? "",
//                 handle: mainNode.owner?.username ?? "",
//                 creatorName: mainNode.owner?.username ?? "",
//                 postedOn: mainNode?.taken_at_timestamp && formatePoostedOnDate(mainNode?.taken_at_timestamp) ,
//                 postType: mainNode?.is_video === true ? "REEL" : !mainNode.edge_sidecar_to_children  ? "CAROUSEL" : "IMAGE",
//                 allComments: mainNode?.edge_media_to_comment?.count,
//                 allLike: mainNode?.edge_liked_by?.count,
//                 allView: mainNode?.video_view_count ?? 0, 
//                 title: mainNode?.edge_media_to_caption?.edges?.[0]?.node?.text,
//                 postUrl: `https://www.instagram.com/p/${mainNode?.shortcode}`,
//                 postImage: mainNode?.thumbnail_resources[0]?.src,
//                 location : mainNode?.location,
//               }
//               // console.log("Obj =>",obj)
//               const savingPost = new cfInstaPostModel(obj);
//               const savedPost = await savingPost.save();
//             })

//           }
//         });

//         // logic for tracking and updating 

//     await creatorCronModel.findByIdAndUpdate(
//         creator._id,
//         [
//             {
//                 $set: {
//                     scheduledCountTracked: {
//                         $cond: {
//                             if: { $gt: ['$scheduledCount', '$scheduledCountTracked'] },
//                             then: { $add: ['$scheduledCountTracked', 1] },
//                             else: '$scheduledCountTracked',
//                         },
//                     },
//                 },
//             },
//         ]
//     );
//     let creatorCronData = await creatorCronModel.findById(creator._id);
//     if (creatorCronData?.scheduledCountTracked === creatorCronData?.scheduledCount) {
//         await creatorCronModel.findByIdAndUpdate(creator._id, { scheduled: false, scheduledCountTracked: 0 });
//     }
//       } catch (err) {
//         console.log(err.message);
//       }
//     };
//     tryall();
//   }).catch((error) => {
//     console.error('Error loading got module:', error.message);
//   });
// }



// 09 Jan 2024 updated code 
const creatorCronModel = require("../../../models/Instagram/creatorCronModel");
const schedule = require("node-schedule");
const response = require('../../../common/response');
const cfInstaPostModel = require("../../../models/Instagram/cfInstaPostModel");
const proxiesModel = require("../../../models/Instagram/proxiesModel");
const { formatePoostedOnDate } = require("../../../helper/instaHelperFunction");
// Dynamic Crone Logic

schedule.scheduleJob("* * *.. * * *", async () => {
  // schedule.scheduleJob("*/60 * * * *", async () => {
  console.log("run root cron")
  const creatorsWithCron = await creatorCronModel.find({ trackingStatus: true, scheduled: { $ne: true } });
  if (creatorsWithCron && creatorsWithCron.length !== 0) {
    creatorsWithCron.map(async (creator) => {
      schedule.scheduleJob(creator.cronExpression, async () => {
        // x(creator);
        getPostDataFromInsta(creator);
      });
      await creatorCronModel.findByIdAndUpdate(creator._id, { scheduled: true });
    });
  } else {
    console.log("There is no creator with cron")
  }

});



async function getPostDataFromInsta(creator) {
  // Use dynamic import for ESM module
  import('got').then(async (gotModule) => {
    const got = gotModule.default;
    // const serversList = require('../servers');
    const proxyList = await proxiesModel.find({ status: "Active" }, 'proxy');

    const tunnel = require('tunnel');

    const proxies = proxyList


    const makeRequest = async (url, proxy) => {
      try {
        const [host, port] = proxy.proxy.split(':');
        let proxy2 = { host, port }

        const request = got(url, {
          agent: {
            https: tunnel.httpsOverHttp({
              proxy: proxy2,
            }),
          },
          headers: {
            "X-Csrftoken": "6JljTdgZuBP87WGuWLgStV",
            "X-Ig-App-Id": "936619743392459",
          },
        });

        const timeout = new Promise((resolve) => {
          setTimeout(() => {
            request.cancel();
            resolve('');
          }, 15 * 1000);
        });
        try {
          const result = await Promise.race([request, timeout]);

          if (typeof result?.body === 'string' && result?.body.trim().startsWith('<')) {

            //Update Proxy status 
            await proxiesModel.findByIdAndUpdate(proxy._id, { status: "Blocked", blockedTime: Math.floor(new Date().getTime() / 1000) });
            // HTML content received
            return {
              success: false,
              message: `Request made by this proxy ${proxy.proxy} and url ${url}  and this url reuturn a html code means your request is blocked for this proxy ${proxy2}`,
              proxyUsed: proxy2
            };
          } else if (!result?.body?.data?.user && typeof result === 'string') {
            // Request timed out
            return {
              success: false,
              message: `Request made by this proxy ${proxy.proxy} and url ${url} and Request timed out this proxy ${proxy.proxy}`,
              proxyUsed: proxy2
            };
          } else if (result?.body && JSON.parse(result?.body)?.data?.user?.edge_owner_to_timeline_media?.edges) {
            // Successful response
            const responseData = JSON.parse(result?.body)?.data?.user?.edge_owner_to_timeline_media?.edges;
            return {
              success: true,
              data: responseData,
              message: `Successful response. Proxy used: ${proxy.proxy}`,
              proxyUsed: proxy2
            };
          }
        } catch (error) {
          // Error during request
          return {
            success: false,
            errCode: error.code,
            message: `Error during request. Proxy used: ${proxy.proxy}, URL: ${url}. Error: ${error.message}`,
            proxyUsed: proxy2
          };

        }
      } catch (error) {
        return { success: false, message: error.message };
      }
    };


    const tryAllProxies = async (url) => {
      for (const proxy of proxies) {

        const result = await makeRequest(url, proxy);
console.log(result)
        if (result?.success) {
          console.log("Positive response received with proxy : ", result.proxyUsed, result.data,);
          let resObjFromInsta = result.data

          resObjFromInsta.forEach(async (result2, index2) => {
            let mainNode = result2?.node
            let obj = {
              brand_id: 0,
              campaign_id: 0,
              shortCode: mainNode?.shortcode ?? "",
              handle: mainNode.owner?.username ?? "",
              creatorName: mainNode.owner?.username ?? "",
              postedOn: mainNode?.taken_at_timestamp && formatePoostedOnDate(mainNode?.taken_at_timestamp),
              postType: mainNode?.is_video === true ? "REEL" : !mainNode.edge_sidecar_to_children ? "CAROUSEL" : "IMAGE",
              allComments: mainNode?.edge_media_to_comment?.count,
              allLike: mainNode?.edge_liked_by?.count,
              allView: mainNode?.video_view_count ?? 0,
              title: mainNode?.edge_media_to_caption?.edges?.[0]?.node?.text,
              postUrl: `https://www.instagram.com/p/${mainNode?.shortcode}`,
              postImage: mainNode?.thumbnail_resources[0]?.src,
              location: mainNode?.location,
            }
            console.log("Obj =>", obj)
            try {
              const savingPost = new cfInstaPostModel(obj);
              await savingPost.save();
            } catch (error) {
              console.log(error.message)
            }

          })
          // logic for tracking and updating 
          await creatorCronModel.findByIdAndUpdate(
            creator._id,
            [
              {
                $set: {
                  scheduledCountTracked: {
                    $cond: {
                      if: { $gt: ['$scheduledCount', '$scheduledCountTracked'] },
                      then: { $add: ['$scheduledCountTracked', 1] },
                      else: '$scheduledCountTracked',
                    },
                  },
                },
              },
            ]
          );
          let creatorCronData = await creatorCronModel.findById(creator._id);
          if (creatorCronData?.scheduledCountTracked === creatorCronData?.scheduledCount) {
            await creatorCronModel.findByIdAndUpdate(creator._id, { scheduled: false, scheduledCountTracked: 0 });
          }

          break; // Stop making requests if a positive response is received
        } else {
          if (result?.errCode) {
            // Update Proxy for erorr :tunneling socket could not be established, cause=connect ECONNREFUSED" indicates that a connection could not be established to a specific IP address and port (in this case, 67.43.227.227:1282). The reason for the failure is that the server at that IP address is not accepting connections on the specified port (1282), and the operating system returned an error code ECONNREFUSED to indicate this refusal.
            await proxiesModel.findByIdAndUpdate(proxy._id, { status: "ServerError", blockedTime: Math.floor(new Date().getTime() / 1000) });
            console.log(`Failed response: ${result.message} with code ${result.errCode}  and proxy used ${proxy} `);
          } else {
            console.log("Failed response:  -> ", result.message);
          }
        }
      }
    };

    // Example usage
    const apiUrl = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${creator.creator}`;
    tryAllProxies(apiUrl);

  }).catch((error) => {
    console.error('Error loading got module:', error.message);
  });
}

// End Dynamic Crone Logic