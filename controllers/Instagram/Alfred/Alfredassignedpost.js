const instaPostModel = require("../../../models/instaPModel");
const response = require("../../../common/response");
const catchAsync = require('../../../helper/catchAsync');

exports.alfredassignedposttoselector = catchAsync(async (req, res) => {
    try {
        const { selector_name, assign_cat, user_level } = req.body;
        const postlimit = user_level * 1;

        // MongoDB aggregation pipeline stages
        const matchStage = {
            $match: {
                posttype_decision: 0,
                assigned_to: selector_name,
            },
        };

        const limitStage = {
            $limit: postlimit,
        };

        const groupStage = {
            $group: {
                _id: null,
                records: { $push: "$$ROOT" },
                recordsCount: { $sum: 1 },
            },
        };

        // Aggregation pipeline
        const aggregationPipeline = [
            matchStage,
            limitStage,
            groupStage,
        ];

        // Execute the aggregation pipeline
        const result = await instaPostModel.aggregate(aggregationPipeline);

        // Extract results from aggregation
        const count = result.length > 0 ? result[0].recordsCount : 0;
        let Parr = count > 0 ? result[0].records : [];

        // Check if Parr length is less than or equal to postlimit
        if (Parr.length <= postlimit) {
            // Additional aggregation pipeline stages for more posts
            const additionalMatchStage = [
                {
                    $match: {
                        posttype_decision: 0,
                        assigned_to: 0,
                        page_category_id: { $in: assign_cat },
                    },
                },
                limitStage,
                groupStage,
            ];

            // Execute additional aggregation pipeline
            const additionalResult = await instaPostModel.aggregate(additionalMatchStage);

            // Extract results from additional aggregation
            const newCount = additionalResult.length > 0 ? additionalResult[0].recordsCount : 0;
            const Ptwoarr = newCount > 0 ? additionalResult[0].records : [];
            Parr = [...Parr, ...Ptwoarr];

            // Check if Parr length is now greater than or equal to postlimit
            if (Parr.length >= postlimit) {
                console.log("Parr before update", Parr.length);

                // Use Promise.all to wait for all update promises to complete
                await Promise.all(
                    Parr.map(async post => {
                        try {
                            // Update each document in Parr
                            await instaPostModel.findByIdAndUpdate(
                                post._id,
                                {
                                    $set: {
                                        assigned_to: selector_name,
                                        assigned_date: new Date(),
                                    },
                                },
                                { new: true }
                            );
                            console.log(`Document ${post._id} updated successfully`);
                        } catch (updateError) {
                            console.error('Error updating document:', updateError);
                            // Propagate the error further if needed
                        }
                    })
                );

                console.log("Parr after update", Parr.length, selector_name);

                // Return success response
                return response.returnTrue(200, req, res, "Success", { count: newCount, records: Parr });
            }

            console.log("Ptwoarr", Ptwoarr.length, newCount, Parr.length);

            // Return success response with additionalResult if Parr length is still less than postlimit
            return response.returnTrue(200, req, res, "Success", { count: newCount, records: additionalResult });
        } else {
            console.log("else part is shown");
            // Return success response with Parr if Parr length is already greater than postlimit
            return response.returnTrue(200, req, res, "Success", { count, Parr });
        }
    } catch (err) {
        console.error('Error in alfredassignedposttoselector:', err);
        // Return error response
        return response.returnFalse(500, req, res, err.message, {});
    }
});


// Asynchronous function to update instaPostModel
// async function updateInstaPostModelAsync(posts, selectorName) {
//     const postIds = posts.map(post => post._id);

//     try {
//         const updatePromises = postIds.map(async postId => {
//             try {
//                 console.log(postId,"postId")
//                      // Update the document by its _id using findByIdAndUpdate
//                      const result = await instaPostModel.findByIdAndUpdate(
//                         postId,
//                         {
               
//                                 assigned_to: selectorName,
//                                 assigned_date: new Date(),
                            
//                         },
//                         { new: true } // Return the updated document
//                     );
    
//                     // console.log('Document updated:', result);
//             } catch (err) {
//                 console.error(`Error updating document with _id ${postId}:`, err);
//             }
//         });

//         // Wait for all update promises to complete
//         // await Promise.all(updatePromises);

//         // console.log('All documents updated successfully');
//     } catch (err) {
//         console.error('Error updating documents:', err);
//     }
// }


// // Asynchronous function to update instaPostModel
// async function updateInstaPostModelAsync(posts, selectorName) {
//     const postIds = posts.map(post => post._id);
//     console.log("reach update ",postIds)
//     try {
//         // Update the documents in instaPostModel asynchronously
//         const result = await instaPostModel.updateMany(
//             { _id: { $in: postIds } },
//             {
//                 $set: {
//                     assigned_to: selectorName,
//                     assigned_date: new Date(),
//                 }
//             }
//         );

//         console.log('Documents updated:', result);
//     } catch (err) {
//         console.error('Error updating documents:', err);
//     }
// }














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
//             limitStage,
//             groupStage,
//         ];

//         const result = await instaPostModel.aggregate(aggregationPipeline);

//         // Extract the count and records
//         const count = result.length > 0 ? result[0].recordsCount : 0;
//         let Parr = count > 0 ? result[0].records : [];

//         // Check if the length of Parr is greater than or equal to postlimit
//         // Parr is selector pending decision array
//         if (Parr.length <= postlimit) {
//             // Further filter records with the new condition
//             const additionalMatchStage = [
//                 {
//                     $match: {
//                         posttype_decision: 0,
//                         assigned_to: 0,
//                         page_category_id: { $in: assign_cat },
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
//                 console.log("Parr before", Parr.length)
//                 Parr = Parr.slice(0, postlimit);
//                 console.log("Parr after", Parr.length)

//                 // Update the documents in instaPostModel with assigned_to field as selector_name and assigned_date as the current date
//                 await instaPostModel.updateMany(
//                     { _id: { $in: Parr.map(post => post._id) } },
//                     {
//                         $set: {
//                             assigned_to: selector_name,
//                             assigned_date: new Date(),
//                         }
//                     }
//                 );

//                 // Return a successful response with the new count and Parr
//                 return response.returnTrue(200, req, res, "Success", { count: newCount, records: Parr });
//             }

//             console.log("Ptwoarr", Ptwoarr.length, newCount, Parr.length)

//             // Return a successful response with the new count and Ptwoarr
//             return response.returnTrue(200, req, res, "Success", { count: newCount, records: additionalResult });
//         } else {
//             // Return a successful response with the initial count and Parr
//             return response.returnTrue(200, req, res, "Success", { count, Parr });
//         }

//     } catch (err) {
//         // Return an error response if there is an exception
//         return response.returnFalse(500, req, res, err.message, {});
//     }
// });


