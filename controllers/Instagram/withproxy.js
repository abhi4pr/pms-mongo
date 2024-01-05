const response = require('../../common/response');
const cfInstaPostModel = require("../../models/Instagram/cfInstaPostModel");
const schedule = require("node-schedule");
exports.getPostDataFromInsta = async (req, res) => {
  // Use dynamic import for ESM module
  import('got').then((gotModule) => {
    const got = gotModule.default;

    const serversList = require('./servers');
    const tunnel = require('tunnel');

    let si = 0;

    // const apiurl = 'http://34.93.135.33:8080/api/get_single_logo_data/3';
    // let pages =["rvcjinsta", "bedroomtale", "thebackbencherrs", "adultsociety", "wildcasm", "thetrollfeeds", "akhanddose", "tube.indian", "wittymemebot", "couplesocietty", "thesarcasmicschool", "just.adulting", "chutiyapa_begins_from_here", "theindiansarcasm", "dekhpagli", "wow__chats", "school.days__", "papiduniyaa", "sarcasmicschool_", "the_engineer_bro", "theashleelduniya", "brocasm", "daily_over_dose", "gharrehkedekh", "thenastysociety", "thebackbenchrs", "sarcastictube", "studentsfacts.in", "theschooltrolls", "desi.company", "ashleelsansar", "johnnylaal"]
    // const apiurl = 'https://www.instagram.com/api/v1/users/web_profile_info/?username=rvcjinsta';
    // const pages = [
    //   "rvcjinsta", "bedroomtale", "thebackbencherrs", "adultsociety", "wildcasm",
    //   "thetrollfeeds", "akhanddose", "tube.indian", "wittymemebot", "couplesocietty",
    //   "thesarcasmicschool", "just.adulting", "chutiyapa_begins_from_here", "theindiansarcasm",
    //   "dekhpagli", "wow__chats", "school.days__", "papiduniyaa", "sarcasmicschool_",
    //   "the_engineer_bro", "theashleelduniya", "brocasm", "daily_over_dose", "gharrehkedekh",
    //   "thenastysociety", "thebackbenchrs", "sarcastictube", "studentsfacts.in", "theschooltrolls",
    //   "desi.company", "ashleelsansar", "johnnylaal"
    // ];
    
    // Create an array with 1000 URLs by repeating the pages array
    const urlA = Array.from({ length: 1 }, (_, index) => {
      const username = pages[index % pages.length];
      return `https://www.instagram.com/api/v1/users/web_profile_info/?username=rvcjinsta`;
    });
    // const urlA = [...new Array(100)].map((u) => apiurl);

    const getHost = () => {
      si++;
      if (si === serversList.length) si = 0;
      const [host, port] = serversList[si].split(':');
      console.log({ host, port })
      return { host, port };
    };

    const procreq = async ({ url }) => {
      try {
        const request = got(url, {
          agent: {
            https: tunnel.httpsOverHttp({
              proxy: getHost(),
            }),
          }, headers: {
            "X-Csrftoken": "coUAyrH2eP4tWX8zizaGUh",
            "X-Ig-App-Id": "936619743392459",
          },
        });
        const p2 = new Promise((resolve, reject) => {
          setTimeout(() => {
            request.cancel();
            resolve('');
          }, 5 * 1000);
        });
        return await Promise.race([request, p2]);
      } catch (err) {
        throw err;
      }
    };

    // const processWithRetry = async ({ url }) => {
    //   try {
    //     const ra = [...new Array(20)].map((r) => 1);
    //     let apiresp;
    //     let retryAttempt = 0;
    //     const resp = await ra.reduce(async (previousPromise, nextID) => {
    //       try {
    //         const res = await previousPromise;
    //         if (!res?.body && !apiresp) {
    //           retryAttempt++;
    //           return procreq({ url });
    //         }
    //         if (res?.body) apiresp = res?.body;
    //         return Promise.resolve();
    //       } catch (err) {
    //         retryAttempt++;
    //         return procreq({ url });
    //       }
    //     }, Promise.resolve());

    //     return { retryAttempt, success: retryAttempt < 20 ? 'success' : 'error', data: apiresp && JSON.parse(apiresp)?.data?.user };
    //     // return { retryAttempt, success: retryAttempt < 20 ? 'success' : 'error', data: apiresp?.data?.user?.biography };
    //   } catch (err) {
    //     console.log(err.message);
    //     return { retryAttempt: 20, success: 'error', data: '' };
    //   }
    // };
    const processWithRetry = async ({ url }) => {
      try {
        const ra = [...new Array(20)].map((r) => 1);
        let apiresp;
        let retryAttempt = 0;
        let positiveResponseReceived = false;
    
        const resp = await ra.reduce(async (previousPromise, nextID) => {
          try {
            if (positiveResponseReceived) {
              // Break the loop if a positive response has been received
              return Promise.resolve();
            }
    
            const res = await previousPromise;
    
            if (!res?.body && !apiresp) {
              retryAttempt++;
              return procreq({ url });
            }
    
            if (res?.body) {
              apiresp = res?.body;
              positiveResponseReceived = true;
            }
    
            return Promise.resolve();
          } catch (err) {
            retryAttempt++;
            return procreq({ url });
          }
        }, Promise.resolve());
    
        return { retryAttempt, success: positiveResponseReceived ? 'success' : 'error', data: apiresp && JSON.parse(apiresp)?.data?.user };
      } catch (err) {
        console.log(err.message);
        return { retryAttempt: 20, success: 'error', data: '' };
      }
    };
    

    const tryall = async () => {
      try {
        const results = await Promise.all(
          urlA.map((url) => processWithRetry({ url }))
        );
        results.forEach((result, index) => {
          // console.log(`Result ${index + 1}:`, result);
          if(result?.success !== 'error'){
            let resObjFromInsta = result?.data?.edge_owner_to_timeline_media?.edges
            console.log(resObjFromInsta)
            return res.send(resObjFromInsta)
            resObjFromInsta.forEach(async(result2, index2) => {
              let mainNode = result2?.node
              let obj = {
                brand_id: 0,
                campaign_id: 0,
                shortCode: mainNode?.shortcode ?? "",
                handle: mainNode.owner?.username ?? "",
                creatorName: mainNode.owner?.username ?? "",
                postedOn: mainNode?.taken_at_timestamp ?? "",
                postType: mainNode?.is_video === true ? "REEL" : !mainNode.edge_sidecar_to_children  ? "CAROUSEL" : "IMAGE",
                allComments: mainNode?.edge_media_to_comment?.count,
                allLike: mainNode?.edge_liked_by?.count,
                allView: mainNode?.video_view_count ?? 0, 
                title: mainNode?.edge_media_to_caption?.edges?.[0]?.node?.text,
                postUrl: `https://www.instagram.com/p/${mainNode?.shortcode}`,
                postImage: mainNode?.thumbnail_resources[0]?.src,
                location : mainNode?.location,

                // creatorName: resObjFromInsta.data.creator.username,  //pending for creator 
                // profile_pic_url: resObjFromInsta.data.creator.profile_pic_url, /pending for creator 
                // allComments: resObjFromInsta.data.comments_count.overall,
                // todayComment: resObjFromInsta.data.comments_count.today,
                // pastComment: resObjFromInsta.data.comments_count.vs_previous,
                // todayLikes: resObjFromInsta.data.likes_count.today,
                // pastLike: resObjFromInsta.data.likes_count.vs_previous,
                // todayViews: resObjFromInsta.data.views_count.today,
                // // agency_id: resObjFromInsta.data.views_count.today,
                // pastView: resObjFromInsta.data.views_count.vs_previous,
                // posttype_decision: resObjFromInsta.posttype_decision,
                // selector_name: resObjFromInsta.selector_name,
                // interpretor_name: resObjFromInsta.interpretor_name,
                // auditor_name: resObjFromInsta.auditor_name,
                // auditor_decision: resObjFromInsta.auditor_decision,
                // interpretor_decision: resObjFromInsta.interpretor_decision,
                // selector_decision: resObjFromInsta.selector_decision,
                // music_info : resObjFromInsta.data?.music_info,
                // sponsored : resObjFromInsta.data?.sponsored,
                // page_category_id
              }
              // console.log("Obj =>",obj)
              const savingPost = new cfInstaPostModel(obj);
              const savedPost = await savingPost.save();
            })
        
          }
        });
        // return response.returnTrue(200,req,res,"Successfull",results)
      } catch (err) {
        console.log(err.message);
      }
    };

    tryall();
  }).catch((error) => {
    console.error('Error loading got module:', error.message);
  });
}




















 
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