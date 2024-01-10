const instaPostModel = require("../../../models/instaPModel");
const response = require("../../../common/response");
// const appError = require('../../helper/appError');
const catchAsync = require('../../../helper/catchAsync');

const alfredapi = [{ assign_pageCategory: [17, 19, 22], userID: 187, postlimit: 190 }, { assign_pageCategory: [29, 30, 32], userID: 789, postlimit: 190 }, { assign_pageCategory: [14, 23, 24], userID: 206, postlimit: 190 }]

// exports.alfredassignedposttoselector = catchAsync(async (req, res) => {
//     try {
//         // Destructuring parameters from the request body
//         const { selector_name, assign_cat, user_level } = req.body;

//         const postlimit = user_level * 1;

//         // Define MongoDB aggregation pipeline match stage with initial conditions
//         const matchStage = {
//             $match: {
//                 posttype_decision: 0, // Filter records with posttype_decision equal to 0
//                 assigned_to: selector_name, // Filter records with assign_to equal to 0
//             },
//         };

//         // Define MongoDB aggregation pipeline limit stage
//         const limitStage = {
//             $limit: postlimit, // Limit the number of documents processed in the pipeline
//         };

//         // Define MongoDB aggregation pipeline group stage to include documents in an array
//         const groupStage = {
//             $group: {
//                 _id: null,
//                 records: { $push: "$$ROOT" },
//                 recordsCount: { $sum: 1 },
//             },
//         };

//         // Use the aggregation pipeline to query the 'instaPostModel' collection
//         const aggregationPipeline = [
//             matchStage,
//             // limitStage,
//             groupStage,
//         ];

//         const result = await instaPostModel.aggregate(aggregationPipeline);

//         // Extract the count and records
//         const count = result.length > 0 ? result[0].recordsCount : 0;
//         let Parr = count > 0 ? result[0].records : [];

//         // Check if the length of Parr is greater than or equal to postlimit
//         // Parr is selector pending decision array
//         if (Parr.length >= postlimit){
//             //TODO callspareassignpost function
//             if(Parr.length < postlimit*2){
//                 console.log("callspare",Parr.length,postlimit*2)
//                 spareInstaPostModelAsync( selector_name,assign_cat,user_level)
//             }
//             Parr = Parr.slice(0, postlimit);
                      
//             console.log("returning from spare")
//                         // Return a successful response with the new count and Parr
//                         return response.returnTrue(200, req, res, "Success", { count: Parr.length, records: Parr });
//         }
//         else  {
//             // Further filter records with the new condition
//             const additionalMatchStage = [
//                 {
//                     $match: {
//                         posttype_decision: 0,
//                         assigned_to: 0,
//                         page_category_id: { $in: assign_cat },
//                         $or: [
//                             { creator_rating: 5 },
//                             { creator_rating: 4 },
//                             { creator_rating: 3 }
//                             // Add more conditions as needed
//                         ]
//                     },
//                 },
//                 limitStage,
//                 groupStage
//             ];

//             // Run the aggregation pipeline again
//             const additionalResult = await instaPostModel.aggregate(additionalMatchStage);

//             // Extract the new count and records
//             const newCount = additionalResult.length > 0 ? additionalResult[0].recordsCount : 0;
//             // Ptwoarr is an array of pending posts with the new condition
//             const Ptwoarr = newCount > 0 ? additionalResult[0].records : [];
//             Parr = [...Parr, ...Ptwoarr];

//             if (Parr.length >= postlimit) {
//                 // Checks whether to reassign the temporary post 
               
//                 //TODO callspareassignpost function
//                 if(Parr.length < postlimit*2){
//                     spareInstaPostModelAsync( selector_name,assign_cat,user_level)
//                 }
//                 Parr = Parr.slice(0, postlimit);
//                 // Update the documents in instaPostModel asynchronously
//                 updateInstaPostModelAsync(Parr, selector_name);
//                 console.log("returning after searching for above 3 star")
//                 // Return a successful response with the new count and Parr
//                 return response.returnTrue(200, req, res, "Success", { count: newCount, records: Parr });
//             }else{
//                 const MatchStageforbelowthreestar = [
//                     {
//                         $match: {
//                             posttype_decision: 0,
//                             assigned_to: 0,
//                             page_category_id: { $in: assign_cat },
//                             $or: [
//                                 { creator_rating: 2 },
//                                 { creator_rating: 1 }
//                                 // Add more conditions as needed
//                             ]
//                         },
//                     },
//                     limitStage,
//                     groupStage
//                 ];
//                  // Run the aggregation pipeline again
//             const additionalResult = await instaPostModel.aggregate(MatchStageforbelowthreestar);

//             // Extract the new count and records
//             const newCount = additionalResult.length > 0 ? additionalResult[0].recordsCount : 0;
//             // Pthreearr is an array of pending posts with the new condition for creator with 1 or 2 star rating
//             const Pthreearr = newCount > 0 ? additionalResult[0].records : [];
//             Parr = [...Parr, ...Pthreearr];
//             if (Parr.length > 0) {
//                 // Checks whether to reassign the temporary post 
      
//                 //TODO callspareassignpost function
//                 if(Parr.length < postlimit*2){
//                  spareInstaPostModelAsync( selector_name,assign_cat,user_level)
//              }
//                 Parr = Parr.slice(0, postlimit);
//                 // Update the documents in instaPostModel asynchronously
//                 updateInstaPostModelAsync(Parr, selector_name);
//                 // console.log("Pthreearr", Pthreearr.length, newCount, Parr.length)
//                 console.log("returning after searching for below 3 star")
//                 // Return a successful response with the new count and Parr
//                 return response.returnTrue(200, req, res, "Success", { count: newCount, records: Parr });
//             }
//                 console.log("after pthree returning empty array", Pthreearr.length, newCount, Parr.length)
    
//                 // Return a successful response with the new count and Ptwoarr
//                 return response.returnTrue(200, req, res, "Success", { count: newCount, records: Parr });
//             }

//         } 
//     } catch (err) {
//         // Return an error response if there is an exception
//         return response.returnFalse(500, req, res, err.message, {});
//     }
// });



// Asynchronous function to update instaPostModel

exports.alfredassignedposttoselector = catchAsync(async (req, res) => {
    try {
        // Destructuring parameters from the request body
        const { selector_name, assign_cat, user_level } = req.body;

        const postlimit = user_level * 1;

        // Define MongoDB aggregation pipeline match stage with initial conditions
        const matchStage = {
            $match: {
                posttype_decision: 0, // Filter records with posttype_decision equal to 0
                assigned_to: selector_name, // Filter records with assign_to equal to 0
                page_category_id: { $in: assign_cat },
                $or: [
                    { creator_rating: 5 },
                    { creator_rating: 4 },
                    { creator_rating: 3 }
                    // Add more conditions as needed
                ]
            },
        };

        // Define MongoDB aggregation pipeline limit stage
        const limitStage = {
            $limit: postlimit, // Limit the number of documents processed in the pipeline
        };

        // Use the aggregation pipeline to query the 'instaPostModel' collection
        const aggregationPipeline = [
            matchStage,
            limitStage,
        ];

        let Parr = await instaPostModel.aggregate(aggregationPipeline);

       

        // Check if the length of Parr is greater than or equal to postlimit
        // Parr is selector pending decision array
        if (Parr.length >= postlimit) {
            // TODO call spareassignpost function
            if (Parr.length < postlimit * 2) {
                console.log("call spare", Parr.length, postlimit * 2);
                spareInstaPostModelAsync(selector_name, assign_cat, user_level);
            }
            Parr = Parr.slice(0, postlimit);

            console.log("returning from spare");
            // Return a successful response with the new count and Parr
            return response.returnTrue(200, req, res, "Success", {count:Parr.length, records: Parr });
        } else {
            // Further filter records with the new condition
            const additionalMatchStage = [
                {
                    $match: {
                        posttype_decision: 0,
                        assigned_to: 0,
                        page_category_id: { $in: assign_cat },
                        $or: [
                            { creator_rating: 5 },
                            { creator_rating: 4 },
                            { creator_rating: 3 }
                            // Add more conditions as needed
                        ]
                    },
                },
                limitStage,
            ];

            // Run the aggregation pipeline again
            const additionalResult = await instaPostModel.aggregate(additionalMatchStage);

            // Extract the new count and records
            // const newCount = additionalResult.length > 0 ? additionalResult.length : 0;
            // Ptwoarr is an array of pending posts with the new condition
            const Ptwoarr = additionalResult;
            Parr = [...Parr, ...Ptwoarr];

            if (Parr.length >= postlimit) {
                // Checks whether to reassign the temporary post
                // TODO call spareassignpost function
                if (Parr.length < postlimit * 2) {
                    spareInstaPostModelAsync(selector_name, assign_cat, user_level);
                }
                Parr = Parr.slice(0, postlimit);
                // Update the documents in instaPostModel asynchronously
                updateInstaPostModelAsync(Parr, selector_name);
                console.log("returning after searching for above 3 star");
                // Return a successful response with the new count and Parr
                return response.returnTrue(200, req, res, "Success", {count:Parr.length, records: Parr });
            } else {
                const MatchStageforbelowthreestar = [
                    {
                        $match: {
                            posttype_decision: 0,
                            assigned_to: 0,
                            page_category_id: { $in: assign_cat },
                            $or: [
                                { creator_rating: 2 },
                                { creator_rating: 1 }
                                // Add more conditions as needed
                            ]
                        },
                    },
                    limitStage,
                ];
                // Run the aggregation pipeline again
                const additionalResult = await instaPostModel.aggregate(MatchStageforbelowthreestar);

                // Extract the new count and records
                // const newCount = additionalResult.length > 0 ? additionalResult.length : 0;
                // Pthreearr is an array of pending posts with the new condition for creator with 1 or 2 star rating
                const Pthreearr = additionalResult;
                Parr = [...Parr, ...Pthreearr];
                if (Parr.length > 0) {
                    // Checks whether to reassign the temporary post
                    // TODO call spareassignpost function
                    if (Parr.length < postlimit * 2) {
                        spareInstaPostModelAsync(selector_name, assign_cat, user_level);
                    }
                    Parr = Parr.slice(0, postlimit);
                    // Update the documents in instaPostModel asynchronously
                    updateInstaPostModelAsync(Parr, selector_name);
                    // console.log("Pthreearr", Pthreearr.length, newCount, Parr.length)
                    console.log("returning after searching for below 3 star");
                    // Return a successful response with the new count and Parr
                    return response.returnTrue(200, req, res, "Success", {count:Parr.length, records: Parr });
                }
                console.log("after pthree returning empty array", Pthreearr.length, Parr.length);

                // Return a successful response with the new count and Ptwoarr
                return response.returnTrue(200, req, res, "Success", {count:Parr.length, records: Parr });
            }
        }
    } catch (err) {
        // Return an error response if there is an exception
        return response.returnFalse(500, req, res, err.message, {});
    }
});



async function updateInstaPostModelAsync(posts, selectorName) {
    const postIds = posts.map(post => post._id);
    // console.log("reach update ",postIds)
    try {
        // Update the documents in instaPostModel asynchronously
        const result = await instaPostModel.updateMany(
            { _id: { $in: postIds } },
            {
                $set: {
                    assigned_to: selectorName,
                    assigned_date: new Date(),
                },
                $push: {
                    reassigned_to: selectorName,
                    reassigned_date: new Date()
                }
            }
        );

        console.log('Documents updated:', result);
    } catch (err) {
        console.error('Error updating documents:', err);
    }
}
// Asynchronous function to update instaPostModel
async function updateSpareInstaPostModelAsync(posts, selectorName) {
    const postIds = posts.map(post => post._id);
    // console.log("reach update ",postIds)
    try {
        // Update the documents in instaPostModel asynchronously
        const result = await instaPostModel.updateMany(
            { _id: { $in: postIds } },
            {
                $set: {
                    assigned_to: selectorName,
                    assigned_date: new Date(),
                }
            }
        );

        console.log('Documents updated:', result);
    } catch (err) {
        console.error('Error updating documents:', err);
    }
}


// Asynchronous function to update instaPostModel for Spare assign
async function spareInstaPostModelAsync( selector_name,assign_cat,user_level) {
   
    try {
     
        const postlimit = user_level * 1;

        // Define MongoDB aggregation pipeline match stage with initial conditions
        const matchStage = {
            $match: {
                posttype_decision: 0,
                assigned_to: 0,
                page_category_id: { $in: assign_cat },
                $or: [
                    { creator_rating: 5 },
                    { creator_rating: 4 },
                    { creator_rating: 3 }
                    // Add more conditions as needed
                ]
            },
        };

        // Define MongoDB aggregation pipeline limit stage
        const limitStage = {
            $limit: postlimit, // Limit the number of documents processed in the pipeline
        };

        // Define MongoDB aggregation pipeline group stage to include documents in an array
        const groupStage = {
            $group: {
                _id: null,
                records: { $push: "$$ROOT" },
                recordsCount: { $sum: 1 },
            },
        };

        // Use the aggregation pipeline to query the 'instaPostModel' collection
        const aggregationPipeline = [
            matchStage,
            limitStage,
            groupStage,
        ];

        const result = await instaPostModel.aggregate(aggregationPipeline);

        // Extract the count and records
        const count = result.length > 0 ? result[0].recordsCount : 0;
        let Sparearray = count > 0 ? result[0].records : [];


        // Check if the length of Sparearray is greater than or equal to postlimit
        // Sparearray is selector pending decision array
        if (Sparearray.length >= postlimit){
    
            Sparearray = Sparearray.slice(0, postlimit);
                      
            console.log("save spare for above 3 star ",Sparearray.length)
            updateSpareInstaPostModelAsync(Sparearray, selector_name);
            return;
                     
        }
        else  {
            // Further filter records with the new condition
            const additionalMatchStage = [
                {
                    $match: {
                        posttype_decision: 0,
                        assigned_to: 0,
                        page_category_id: { $in: assign_cat },
                        $or: [
                            { creator_rating: 2 },
                            { creator_rating: 1 }
                            // Add more conditions as needed
                        ]
                    },
                },
                limitStage,
                groupStage
            ];

            // Run the aggregation pipeline again
            const additionalResult = await instaPostModel.aggregate(additionalMatchStage);

            // Extract the new count and records
            const newCount = additionalResult.length > 0 ? additionalResult[0].recordsCount : 0;
            // Ptwoarr is an array of pending posts with the new condition
            const Ptwoarr = newCount > 0 ? additionalResult[0].records : [];
            Sparearray = [...Sparearray, ...Ptwoarr];

            if (Sparearray.length > 0) {
                // Checks whether to reassign the temporary post 
               
                Sparearray = Sparearray.slice(0, postlimit);
   
                // Update the documents in instaPostModel asynchronously
                updateSpareInstaPostModelAsync(Sparearray, selector_name);
                console.log("returning after searching for below 3 star")
                return ;

            }
            return ;

        } 
    } catch (err) {
        // Return an error response if there is an exception
        return response.returnFalse(500, req, res, err.message, {});
    }
}




