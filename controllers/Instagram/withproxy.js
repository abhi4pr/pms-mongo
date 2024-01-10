const response = require('../../common/response');
const cfInstaPostModel = require("../../models/Instagram/cfInstaPostModel");
const schedule = require("node-schedule");
const proxiesModel = require("../../models/Instagram/proxiesModel");
exports.getPostDataFromInsta = async (req, res) => {
  // Use dynamic import for ESM module
  import('got').then(async(gotModule) => {
    const got = gotModule.default;

    // const serversList = require('./servers');
    const proxyList =  await proxiesModel.find({ status: "Active"}, 'proxy');

    const tunnel = require('tunnel');

    const proxies = proxyList

    const makeRequest = async (url, proxy) => {
      try {
        const [host, port] = proxy.proxy.split(':');
        let proxy2 = {host,port}
    
        const request = got(url, {
          agent: {
            https: tunnel.httpsOverHttp({
              proxy:proxy2,
            }),
          },
          headers: {
            "X-Csrftoken": "coUAyrH2eP4tWX8zizaGUh",
            "X-Ig-App-Id": "936619743392459",
          },
        });
      
        const timeout = new Promise((resolve) => {
          setTimeout(() => {
            request.cancel();
            resolve('');
          }, 15 * 1000);
        });
      
        // try {
        //   // Use Promise.race to race between the request and the timeout
        //   const result = await Promise.race([request, timeout]);
        //   // console.log("response --------------> ",result?.body, typeof result?.body)
        //   // Check if the result is a string (timeout case)
        //   if (typeof result?.body === 'string' && result?.body.trim().startsWith('<')) {
        //     return { success: false, message: `Request made by this proxy ${proxy} and url ${url}  and this url reuturn a html code means your request is blocked for this proxy ${proxy2}`, proxyUsed: proxy2 };
        //   }else if (!result?.body?.data?.user && typeof result === 'string') {

        //     return { success: false, message: `Request made by this proxy ${proxy} and url ${url} and Request timed out this proxy ${proxy}`,proxyUsed: proxy2};

        //   } else if(result?.body && JSON.parse(result?.body)?.data?.user?.edge_owner_to_timeline_media?.edges) {
        //     // Handle the successful response
        //     return { success: true, data: result?.body && JSON.parse(result?.body)?.data?.user?.edge_owner_to_timeline_media?.edges, proxyUsed: proxy2};
        //   }
        // } catch (error) {
        //     return { success: false, errCode:error.code , message: ` Request made by this proxy ${proxy} and url ${url} and ${error.message}`, proxyUsed: proxy2 };
          
        // }
        try {
          const result = await Promise.race([request, timeout]);
    
          if (typeof result?.body === 'string' && result?.body.trim().startsWith('<')) {

            //Update Proxy status 
             await proxiesModel.findByIdAndUpdate(proxy._id, {status : "Blocked",blockedTime:Math.floor(new Date().getTime() / 1000)});
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
        return { success: false, data: error.message };
      }
    };
    
    const tryAllProxies = async (url) => {
      for (const proxy of proxies) {

        const result = await makeRequest(url, proxy );
        
        if (result?.success) {
          console.log("Positive response received with proxy : ", result.proxyUsed, result.data,);
          break; // Stop making requests if a positive response is received
        } else {
          if(result.errCode){
            console.log(`Failed response: ${result.message} with code ${result.errCode}  and proxy used ${proxy.proxy} `);
          }else{
            console.log("Failed response:  -> ",result.message);
          }
        }
      }
    };
    
    // Example usage
    const apiUrl = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${req.body.creatorName}`;
    tryAllProxies(apiUrl);



    // -----------------------------------------------------------------------------------------------------------------------
    // let si = 0;

    // // const apiurl = 'http://34.93.135.33:8080/api/get_single_logo_data/3';
    // // let pages =["rvcjinsta", "bedroomtale", "thebackbencherrs", "adultsociety", "wildcasm", "thetrollfeeds", "akhanddose", "tube.indian", "wittymemebot", "couplesocietty", "thesarcasmicschool", "just.adulting", "chutiyapa_begins_from_here", "theindiansarcasm", "dekhpagli", "wow__chats", "school.days__", "papiduniyaa", "sarcasmicschool_", "the_engineer_bro", "theashleelduniya", "brocasm", "daily_over_dose", "gharrehkedekh", "thenastysociety", "thebackbenchrs", "sarcastictube", "studentsfacts.in", "theschooltrolls", "desi.company", "ashleelsansar", "johnnylaal"]
    // // const apiurl = 'https://www.instagram.com/api/v1/users/web_profile_info/?username=rvcjinsta';
    // const pages = [
    //   "rvcjinsta", "bedroomtale", "thebackbencherrs", "adultsociety", "wildcasm",
    //   "thetrollfeeds", "akhanddose", "tube.indian", "wittymemebot", "couplesocietty",
    //   "thesarcasmicschool", "just.adulting", "chutiyapa_begins_from_here", "theindiansarcasm",
    //   "dekhpagli", "wow__chats", "school.days__", "papiduniyaa", "sarcasmicschool_",
    //   "the_engineer_bro", "theashleelduniya", "brocasm", "daily_over_dose", "gharrehkedekh",
    //   "thenastysociety", "thebackbenchrs", "sarcastictube", "studentsfacts.in", "theschooltrolls",
    //   "desi.company", "ashleelsansar", "johnnylaal"
    // ];
    
    // // Create an array with 1000 URLs by repeating the pages array
    // const urlA = Array.from({ length: 1}, (_, index) => {
    //   const username = pages[index % pages.length];
    //   return `https://www.instagram.com/api/v1/users/web_profile_info/?username=${req.body.creatorName}`;
    // });
    // // const urlA = [...new Array(100)].map((u) => apiurl);

    // const getHost = () => {
    //   si++;
    //   if (si === serversList.length) si = 0;
    //   const [host, port] = serversList[si].split(':');
    //   // console.log({ host, port })
    //   return { host, port };
    // };

    // const procreq = async ({ url }) => {
    //   try {
    //     let proxy = getHost()
    //     console.log(proxy,url)
    //     const request = got(url, {
    //       agent: {
    //         https: tunnel.httpsOverHttp({
    //           proxy,
    //         }),
    //       }, headers: {
    //         "X-Csrftoken": "coUAyrH2eP4tWX8zizaGUh",
    //         "X-Ig-App-Id": "936619743392459",
    //       },
    //     });
    //     const p2 = new Promise((resolve, reject) => {
    //       setTimeout(() => {
    //         request.cancel();
    //         resolve('');
    //       }, 5 * 1000);
    //     });
    //     return await Promise.race([request, p2]);
    //   } catch (err) {
    //     throw err;
    //   }
    // };

    
    // const processWithRetry = async ({ url }) => {
    //   let apiresp;
    //   let retryAttempt = 0;
    //   let positiveResponseReceived = false;
    
    //   try {
    //     while (retryAttempt < 30 && !positiveResponseReceived) {
    //       try {
    //         const res = await procreq({ url });
    
    //         if (!res?.body) {
    //           retryAttempt++;
    //         } else {
    //           apiresp = res.body;
            
    //           if(apiresp?.data?.user && JSON.parse(apiresp)?.data?.user?.edge_owner_to_timeline_media?.edges ){
    //             console.log("Positive response",retryAttempt)
    //             positiveResponseReceived = true;
    //             break;
    //           }else{
    //             console.log("html received ","retryAttempt",retryAttempt)
    //           }
             
    //         }
    //       } catch (err) {
    //         retryAttempt++;
    //       }
    //     }
    
    //     return { retryAttempt, success: positiveResponseReceived ? 'success' : 'error', data: apiresp && JSON.stringify(JSON.parse(apiresp)?.data?.user) };
    //   } catch (err) {
    //     console.log(err.message);
    //     return { retryAttempt: 20, success: 'error', data: '' };
    //   }
    // };
    
    // const tryall = async () => {
    //   try {
    //     if (si === serversList.length) si = 0;
    //     const [host, port] = serversList[si].split(':');
    //   } catch (err) {
    //     console.error(err.message);
    //   }
    // };
    
    // // Call tryall function
    // tryall();
  }).catch((error) => {
    console.error('Error loading got module:', error.message);
  });
}

// -------------------------------------------------------------------------------------------------------------
// const response = require('../../common/response');
// const cfInstaPostModel = require("../../models/Instagram/cfInstaPostModel");
// const schedule = require("node-schedule");
// exports.getPostDataFromInsta = async (req, res) => {
//   // Use dynamic import for ESM module
//   import('got').then((gotModule) => {
//     const got = gotModule.default;

//     const serversList = require('./servers');
//     const tunnel = require('tunnel');

//     let si = 0;

//     // const apiurl = 'http://34.93.135.33:8080/api/get_single_logo_data/3';
//     // let pages =["rvcjinsta", "bedroomtale", "thebackbencherrs", "adultsociety", "wildcasm", "thetrollfeeds", "akhanddose", "tube.indian", "wittymemebot", "couplesocietty", "thesarcasmicschool", "just.adulting", "chutiyapa_begins_from_here", "theindiansarcasm", "dekhpagli", "wow__chats", "school.days__", "papiduniyaa", "sarcasmicschool_", "the_engineer_bro", "theashleelduniya", "brocasm", "daily_over_dose", "gharrehkedekh", "thenastysociety", "thebackbenchrs", "sarcastictube", "studentsfacts.in", "theschooltrolls", "desi.company", "ashleelsansar", "johnnylaal"]
//     // const apiurl = 'https://www.instagram.com/api/v1/users/web_profile_info/?username=rvcjinsta';
//     const pages = [
//       "rvcjinsta", "bedroomtale", "thebackbencherrs", "adultsociety", "wildcasm",
//       "thetrollfeeds", "akhanddose", "tube.indian", "wittymemebot", "couplesocietty",
//       "thesarcasmicschool", "just.adulting", "chutiyapa_begins_from_here", "theindiansarcasm",
//       "dekhpagli", "wow__chats", "school.days__", "papiduniyaa", "sarcasmicschool_",
//       "the_engineer_bro", "theashleelduniya", "brocasm", "daily_over_dose", "gharrehkedekh",
//       "thenastysociety", "thebackbenchrs", "sarcastictube", "studentsfacts.in", "theschooltrolls",
//       "desi.company", "ashleelsansar", "johnnylaal"
//     ];
    
//     // Create an array with 1000 URLs by repeating the pages array
//     const urlA = Array.from({ length: 15 }, (_, index) => {
//       const username = pages[index % pages.length];
//       return `https://www.instagram.com/api/v1/users/web_profile_info/?username=${req.body.creatorName}`;
//     });
//     // const urlA = [...new Array(100)].map((u) => apiurl);

//     const getHost = () => {
//       si++;
//       if (si === serversList.length) si = 0;
//       const [host, port] = serversList[si].split(':');
//       console.log({ host, port })
//       return { host, port };
//     };

//     const procreq = async ({ url }) => {
//       try {
//         let proxy = getHost()
//         console.log(proxy,url)
//         const request = got(url, {
//           agent: {
//             https: tunnel.httpsOverHttp({
//               proxy,
//             }),
//           }, headers: {
//             "X-Csrftoken": "coUAyrH2eP4tWX8zizaGUh",
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

//     // const processWithRetry = async ({ url }) => {
//     //   try {
//     //     const ra = [...new Array(20)].map((r) => 1);
//     //     let apiresp;
//     //     let retryAttempt = 0;
//     //     const resp = await ra.reduce(async (previousPromise, nextID) => {
//     //       try {
//     //         const res = await previousPromise;
//     //         if (!res?.body && !apiresp) {
//     //           retryAttempt++;
//     //           return procreq({ url });
//     //         }
//     //         if (res?.body) apiresp = res?.body;
//     //         return Promise.resolve();
//     //       } catch (err) {
//     //         retryAttempt++;
//     //         return procreq({ url });
//     //       }
//     //     }, Promise.resolve());

//     //     return { retryAttempt, success: retryAttempt < 20 ? 'success' : 'error', data: apiresp && JSON.parse(apiresp)?.data?.user };
//     //     // return { retryAttempt, success: retryAttempt < 20 ? 'success' : 'error', data: apiresp?.data?.user?.biography };
//     //   } catch (err) {
//     //     console.log(err.message);
//     //     return { retryAttempt: 20, success: 'error', data: '' };
//     //   }
//     // };
//     const processWithRetry = async ({ url }) => {
//       try {
//         const ra = [...new Array(20)].map((r) => 1);
//         let apiresp;
//         let retryAttempt = 0;
//         let positiveResponseReceived = false;
    
//         const resp = await ra.reduce(async (previousPromise, nextID) => {
//           try {
//             if (positiveResponseReceived) {
//               return Promise.resolve();
//             }
    
//             const res = await previousPromise;
    
//             if (!res?.body && !apiresp) {
//               retryAttempt++;
//               return procreq({ url });
//             }
    
//             if (res?.body ) {
//               apiresp = res?.body;
//               positiveResponseReceived = true;
//             }
    
//             return Promise.resolve();
//           } catch (err) {
//             retryAttempt++;
//             return procreq({ url });
//           }
//         }, Promise.resolve());
    
//         return { retryAttempt, success: positiveResponseReceived ? 'success' : 'error', data: apiresp && JSON.parse(apiresp)?.data?.user };
//       } catch (err) {
//         console.log(err.message);
//         return { retryAttempt: 20, success: 'error', data: '' };
//       }
//     };
    

//     const tryall = async () => {
//       try {
//         const results = await Promise.all(
//           urlA.map((url) => processWithRetry({ url }))
//         );
//         console.table(results)
//         results.forEach((result, index) => {
//           // console.log(`Result ${index + 1}:`, result);
//           if(result?.success !== 'error'){
//             let resObjFromInsta = result?.data?.edge_owner_to_timeline_media?.edges
//             console.log(resObjFromInsta)
//             return res.send(resObjFromInsta)
//             resObjFromInsta.forEach(async(result2, index2) => {
//               let mainNode = result2?.node
//               let obj = {
//                 brand_id: 0,
//                 campaign_id: 0,
//                 shortCode: mainNode?.shortcode ?? "",
//                 handle: mainNode.owner?.username ?? "",
//                 creatorName: mainNode.owner?.username ?? "",
//                 postedOn: mainNode?.taken_at_timestamp ?? "",
//                 postType: mainNode?.is_video === true ? "REEL" : !mainNode.edge_sidecar_to_children  ? "CAROUSEL" : "IMAGE",
//                 allComments: mainNode?.edge_media_to_comment?.count,
//                 allLike: mainNode?.edge_liked_by?.count,
//                 allView: mainNode?.video_view_count ?? 0, 
//                 title: mainNode?.edge_media_to_caption?.edges?.[0]?.node?.text,
//                 postUrl: `https://www.instagram.com/p/${mainNode?.shortcode}`,
//                 postImage: mainNode?.thumbnail_resources[0]?.src,
//                 location : mainNode?.location,

//                 // creatorName: resObjFromInsta.data.creator.username,  //pending for creator 
//                 // profile_pic_url: resObjFromInsta.data.creator.profile_pic_url, /pending for creator 
//                 // allComments: resObjFromInsta.data.comments_count.overall,
//                 // todayComment: resObjFromInsta.data.comments_count.today,
//                 // pastComment: resObjFromInsta.data.comments_count.vs_previous,
//                 // todayLikes: resObjFromInsta.data.likes_count.today,
//                 // pastLike: resObjFromInsta.data.likes_count.vs_previous,
//                 // todayViews: resObjFromInsta.data.views_count.today,
//                 // // agency_id: resObjFromInsta.data.views_count.today,
//                 // pastView: resObjFromInsta.data.views_count.vs_previous,
//                 // posttype_decision: resObjFromInsta.posttype_decision,
//                 // selector_name: resObjFromInsta.selector_name,
//                 // interpretor_name: resObjFromInsta.interpretor_name,
//                 // auditor_name: resObjFromInsta.auditor_name,
//                 // auditor_decision: resObjFromInsta.auditor_decision,
//                 // interpretor_decision: resObjFromInsta.interpretor_decision,
//                 // selector_decision: resObjFromInsta.selector_decision,
//                 // music_info : resObjFromInsta.data?.music_info,
//                 // sponsored : resObjFromInsta.data?.sponsored,
//                 // page_category_id
//               }
//               // console.log("Obj =>",obj)
//               const savingPost = new cfInstaPostModel(obj);
//               const savedPost = await savingPost.save();
//             })
        
//           }
//         });
//         // return response.returnTrue(200,req,res,"Successfull",results)
//       } catch (err) {
//         console.log(err.message);
//       }
//     };

//     tryall();
//   }).catch((error) => {
//     console.error('Error loading got module:', error.message);
//   });
// }




















 
// schedule.scheduleJob("* * * * * *", async () => {
//   console.log("here")
//   let resCheck
//   // Use dynamic import for ESM module
//   import('got').then((gotModule) => {
//     const got = gotModule.default;

//     const tunnel = require('tunnel');
//   const ipHostArray = require('./servers');
// // Function to make requests with different IPs
// async function makeRequestWithIP(ip) {
//   const [ipAddress, port] = ip.split(':');
//   try {
//     const request = got('https://www.instagram.com/api/v1/users/web_profile_info/?username=rvcjInsta', {
//       agent: {
//         https: tunnel.httpsOverHttp({
//           proxy: {
//             host: ipAddress,
//             port: parseInt(port),
//           },
//         }),
//       }, headers: {
//         "X-Csrftoken": "coUAyrH2eP4tWX8zizaGUh",
//         "X-Ig-App-Id": "936619743392459",
//       },
//     });
//     console.log(`Response from ${ip}:`, request);
//     // You can add your handling for the response here
//     resCheck = true
//   } catch (error) {
//     console.error(`Error with ${ip}:`, error.message);
//     // Handle error as needed
//   }
// }

// // Loop through the array and make requests with different IPs
// async function makeRequests(url) {
//   for (const  ip  of ipHostArray) {
//     await makeRequestWithIP(ip);
//   }
// }

// // Call the function to start making requests
// if(!resCheck) makeRequests("rvcjinsta");

//   }).catch((error) => {
//     console.error('Error loading got module:', error.message);
//   });

// })