
const creatorCronModel = require("../../../models/Instagram/creatorCronModel");
const schedule = require("node-schedule");
const response = require('../../../common/response');
const cfInstaPostModel = require("../../../models/Instagram/cfInstaPostModel");
// Dynamic Crone Logic

async function x(creator) {
    console.log("Execute", creator.creator)

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
}
schedule.scheduleJob("*/60 * * * *", async () => {
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



async  function getPostDataFromInsta (creator) {
  // Use dynamic import for ESM module
  import('got').then((gotModule) => {
    const got = gotModule.default;
    const serversList = require('../servers');
    const tunnel = require('tunnel');

    let si = 0;

    const urlA = Array.from({ length: 1 }, (_, index) => {
      return `https://www.instagram.com/api/v1/users/web_profile_info/?username=${creator.creator}`;
    });


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
              }
              // console.log("Obj =>",obj)
              const savingPost = new cfInstaPostModel(obj);
              const savedPost = await savingPost.save();
            })
        
          }
        });

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
      } catch (err) {
        console.log(err.message);
      }
    };
    tryall();
  }).catch((error) => {
    console.error('Error loading got module:', error.message);
  });
}

// End Dynamic Crone Logic