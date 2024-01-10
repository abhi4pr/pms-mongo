const instaPostModel = require("../../../models/instaPModel");
const response = require("../../../common/response");
// const appError = require('../../helper/appError');
const catchAsync = require('../../../helper/catchAsync');






exports.alfreduseranalytics = catchAsync(async (req, res) => {
  try {
    const { selector_name } = req.body;

    const matchStage = {
      $match: {
        selector_name: selector_name,
        posttype_decision: { $gt: 0 },
      },
    };

    const addFieldsStage = {
      $addFields: {
        selector_date: {
          $dateToString: { format: "%Y-%m-%d", date: "$selector_date" },
        },
      },
    };

    const groupStage1 = {
      $group: {
        _id: {
          selector_name: "$selector_name",
          page_category_id: "$page_category_id",
          selector_date: "$selector_date",
        },
        recordsCount: { $sum: 1 },
        correctDecisionCount: {
          $sum: {
            $cond: {
              if: {
                $or: [
                  { $eq: ["$selector_decision", "$interpretor_decision"] },
                  {
                    $and: [
                      { $eq: ["$selector_decision", 5] },
                      { $eq: ["$interpretor_decision", 1] },
                    ],
                  },
                ],
              },
              then: 1,
              else: 0,
            },
          },
        },
        incorrectDecisionCount: {
          $sum: {
            $cond: {
              if: {
                $and: [
                  { $ne: ["$selector_decision", "$interpretor_decision"] },
                  {
                    $or: [
                      {
                        $and: [
                          { $ne: ["$selector_decision", 5] },
                          { $ne: ["$interpretor_decision", 1] },
                        ],
                      },
                    ],
                  },
                  { $gt: ["$posttype_decision", 1] },
                ],
              },
              then: 1,
              else: 0,
            },
          },
        },
      },
    };

    const groupStage2 = {
      $group: {
        _id: {
          selector_name: "$_id.selector_name",
          page_category_id: "$_id.page_category_id",
        },
        recordsCount: { $sum: "$recordsCount" },
        correctDecisionCount: { $sum: "$correctDecisionCount" },
        incorrectDecisionCount: { $sum: "$incorrectDecisionCount" },
        selector_date: { $max: "$_id.selector_date" },
        maxcount: { $max: "$recordsCount" },
      },
    };

    const groupStage3 = {
      $group: {
        _id: "$_id.selector_name",
        recordsCount: { $sum: "$recordsCount" },
        correctDecisionCount: { $sum: "$correctDecisionCount" },
        incorrectDecisionCount: { $sum: "$incorrectDecisionCount" },
        maxcountdate: { $first: "$selector_date" },
        maxcount: { $max: "$maxcount" },
        pageCategories: {
          $push: {
            page_category_id: "$_id.page_category_id",
            count: "$recordsCount",
          },
        },
      },
    };

    const projectStage = {
      $project: {
        _id: 0,
        selector_name: "$_id",
        recordsCount: 1,
        correctDecisionCount: 1,
        incorrectDecisionCount: 1,
        maxcountdate: 1,
        maxcount: 1,
        pageCategory: {
          $arrayToObject: {
            $map: {
              input: "$pageCategories",
              as: "pair",
              in: {
                k: { $toString: "$$pair.page_category_id" },
                v: "$$pair.count",
              },
            },
          },
        },
      },
    };

    const data = await instaPostModel.aggregate([
      matchStage,
      addFieldsStage,
      groupStage1,
      groupStage2,
      groupStage3,
      projectStage,
    ]);

    return response.returnTrue(200, req, res, "Success", data);
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
});



// exports.alfreduseranalytics = async (req, res) => {
//   try {
//     const { selector_name } = req.body;

//     const matchStage = {
//       $match: {
//         selector_name: selector_name,
//         posttype_decision: { $gt: 0 },
//       },
//     };

//     const addFieldsStage = {
//       $addFields: {
//         selector_date: {
//           $dateToString: { format: "%Y-%m-%d", date: "$selector_date" },
//         },
//       },
//     };

//     const groupStage1 = {
//       $group: {
//         _id: {
//           selector_name: "$selector_name",
//           page_category_id: "$page_category_id",
//           selector_date: "$selector_date",
//         },
//         recordsCount: { $sum: 1 },
//         correctDecisionCount: {
//           $sum: {
//             $cond: {
//               if: {
//                 $or: [
//                   { $eq: ["$selector_decision", "$interpretor_decision"] },
//                   {
//                     $and: [
//                       { $eq: ["$selector_decision", 5] },
//                       { $eq: ["$interpretor_decision", 1] },
//                     ],
//                   },
//                 ],
//               },
//               then: 1,
//               else: 0,
//             },
//           },
//         },
//         incorrectDecisionCount: {
//           $sum: {
//             $cond: {
//               if: {
//                 $and: [
//                   { $ne: ["$selector_decision", "$interpretor_decision"] },
//                   {
//                     $or: [
//                       {
//                         $and: [
//                           { $ne: ["$selector_decision", 5] },
//                           { $ne: ["$interpretor_decision", 1] },
//                         ],
//                       },
//                     ],
//                   },
//                   { $gt: ["$posttype_decision", 1] },
//                 ],
//               },
//               then: 1,
//               else: 0,
//             },
//           },
//         },
//       },
//     };

//     const groupStage2 = {
//       $group: {
//         _id: {
//           selector_name: "$_id.selector_name",
//         },
//         recordsCount: { $sum: "$recordsCount" },
//         correctDecisionCount: { $sum: "$correctDecisionCount" },
//         incorrectDecisionCount: { $sum: "$incorrectDecisionCount" },
//         pageCategories: {
//           $push: {
//             k: "$_id.page_category_id",
//             v: "$recordsCount",
//           },
//         },
//         maxcountdate: {
//           $max: {
//             $cond: {
//               if: { $ne: ["$_id.selector_date", null] },
//               then: "$_id.selector_date",
//               else: null,
//             },
//           },
//         },
//         maxcount: { $max: "$recordsCount" },
//       },
//     };

//     const groupStage3 = {
//       $group: {
//         _id: "$_id.selector_name",
//         recordsCount: { $first: "$recordsCount" },
//         correctDecisionCount: { $first: "$correctDecisionCount" },
//         incorrectDecisionCount: { $first: "$incorrectDecisionCount" },
//         maxcountdate: { $first: "$maxcountdate" },
//         maxcount: { $first: "$maxcount" },
//         pageCategories: {
//           $push: {
//             k: "$pageCategories.k",
//             v: "$pageCategories.v",
//           },
//         },
//       },
//     };

//     const projectStage = {
//       $project: {
//         _id: 0,
//         selector_name: "$_id.selector_name",
//         recordsCount: 1,
//         correctDecisionCount: 1,
//         incorrectDecisionCount: 1,
//         maxcountdate: 1,
//         maxcount: 1,
//         pageCategory: {
//           $arrayToObject: {
//             $reduce: {
//               input: "$pageCategories",
//               initialValue: [],
//               in: { $concatArrays: ["$$value", "$$this"] },
//             },
//           },
//         },
//       },
//     };

//     const data = await instaPostModel.aggregate([
//       matchStage,
//       addFieldsStage,
//       groupStage1,
//       groupStage2,
//       groupStage3,
//       projectStage,
//     ]);

//     return response.returnTrue(200, req, res, "Success", data);
//   } catch (err) {
//     return response.returnFalse(500, req, res, err.message, {});
//   }
// };

// exports.alfreduseranalytics = async (req, res) => {
//   try {
//     const { selector_name } = req.body; // Assuming the selector_name is sent in the request body

//     const matchStage = {
//       $match: {
//         selector_name: selector_name,
//         posttype_decision: { $gt: 0 },
//       },
//     };

//     const addFieldsStage = {
//       $addFields: {
//         selector_date: {
//           $dateToString: { format: "%Y-%m-%d", date: "$selector_date" }
//         }
//       }
//     };

//     const groupStage1 = {
//       $group: {
//         _id: {
//           selector_name: "$selector_name",
//           page_category_id: "$page_category_id",
//           selector_date: "$selector_date"
//         },
//         recordsCount: { $sum: 1 },
//         correctDecisionCount: {
//           $sum: {
//             $cond: {
//               if: {
//                 $or: [
//                   { $eq: ["$selector_decision", "$interpretor_decision"] },
//                   {
//                     $and: [
//                       { $eq: ["$selector_decision", 5] },
//                       { $eq: ["$interpretor_decision", 1] },
//                     ],
//                   },
//                 ],
//               },
//               then: 1,
//               else: 0,
//             },
//           },
//         },
//         incorrectDecisionCount: {
//           $sum: {
//             $cond: {
//               if: {
//                 $and: [
//                   { $ne: ["$selector_decision", "$interpretor_decision"] },
//                   {
//                     $or: [
//                       {
//                         $and: [
//                           { $ne: ["$selector_decision", 5] },
//                           { $ne: ["$interpretor_decision", 1] },
//                         ],
//                       },
//                     ],
//                   },
//                   { $gt: ["$posttype_decision", 1] },
//                 ],
//               },
//               then: 1,
//               else: 0,
//             },
//           },
//         },
//       },
//     };

//     const groupStage2 = {
//       $group: {
//         _id: {
//           selector_name: "$_id.selector_name",
//         },
//         recordsCount: { $sum: "$recordsCount" },
//         correctDecisionCount: { $sum: "$correctDecisionCount" },
//         incorrectDecisionCount: { $sum: "$incorrectDecisionCount" },
//         pageCategories: {
//           $push: {
//             page_category_id: "$_id.page_category_id",
//             count: "$recordsCount",
//           },
//         },
//         maxcountdate: {
//           $max: {
//             $cond: {
//               if: { $ne: ["$_id.selector_date", null] },
//               then: "$_id.selector_date",
//               else: null,
//             },
//           },
//         },
//         maxcount: { $max: "$recordsCount" }
//       },
//     };

//     const projectStage = {
//       $project: {
//         _id: 0,
//         selector_name: "$_id.selector_name",
//         recordsCount: 1,
//         correctDecisionCount: 1,
//         incorrectDecisionCount: 1,
//         maxcountdate: 1,
//         maxcount: 1,
//         pageCategory: "$pageCategories",
//       },
//     };

//     const data = await instaPostModel.aggregate([
//       matchStage,
//       addFieldsStage,
//       groupStage1,
//       groupStage2,
//       projectStage,
//     ]);

//     return response.returnTrue(200, req, res, "Success", data);
//   } catch (err) {
//     return response.returnFalse(500, req, res, err.message, {});
//   }
// };


// exports.alfreduseranalytics = async (req, res) => {
//   try {
//     const { selector_name } = req.body; // Assuming the selector_name is sent in the request body

//     const matchStage = {
//       $match: {
//         selector_name: selector_name,
//         posttype_decision: { $gt: 0 },
//       },
//     };

//     const addFieldsStage = {
//       $addFields: {
//         selector_date: {
//           $dateToString: { format: "%Y-%m-%d", date: "$selector_date" }
//         }
//       }
//     };

//     const groupStage1 = {
//       $group: {
//         _id: {
//           selector_name: "$selector_name",
//           page_category_id: "$page_category_id",
//           selector_date: "$selector_date"
//         },
//         recordsCount: { $sum: 1 },
//         correctDecisionCount: {
//           $sum: {
//             $cond: {
//               if: {
//                 $or: [
//                   { $eq: ["$selector_decision", "$interpretor_decision"] },
//                   {
//                     $and: [
//                       { $eq: ["$selector_decision", 5] },
//                       { $eq: ["$interpretor_decision", 1] },
//                     ],
//                   },
//                 ],
//               },
//               then: 1,
//               else: 0,
//             },
//           },
//         },
//         incorrectDecisionCount: {
//           $sum: {
//             $cond: {
//               if: {
//                 $and: [
//                   { $ne: ["$selector_decision", "$interpretor_decision"] },
//                   {
//                     $or: [
//                       {
//                         $and: [
//                           { $ne: ["$selector_decision", 5] },
//                           { $ne: ["$interpretor_decision", 1] },
//                         ],
//                       },
//                     ],
//                   },
//                   { $gt: ["$posttype_decision", 1] },
//                 ],
//               },
//               then: 1,
//               else: 0,
//             },
//           },
//         },
//       },
//     };

//     const groupStage2 = {
//       $group: {
//         _id: {
//           selector_name: "$_id.selector_name",
//         },
//         recordsCount: { $sum: "$recordsCount" },
//         correctDecisionCount: { $sum: "$correctDecisionCount" },
//         incorrectDecisionCount: { $sum: "$incorrectDecisionCount" },
//         pageCategories: {
//           $push: {
//             page_category_id: "$_id.page_category_id",
//             count: "$recordsCount",
//           },
//         },
//         maxcountdate: {
//           $max: {
//             $cond: {
//               if: { $ne: ["$_id.selector_date", null] },
//               then: "$_id.selector_date",
//               else: null,
//             },
//           },
//         },
//         maxcount: { $max: "$recordsCount" }
//       },
//     };

//     const projectStage = {
//       $project: {
//         _id: 0,
//         selector_name: "$_id.selector_name",
//         recordsCount: 1,
//         correctDecisionCount: 1,
//         incorrectDecisionCount: 1,
//         maxcountdate: 1,
//         maxcount: 1,
//         pageCategory: "$pageCategories",
//       },
//     };

//     const data = await instaPostModel.aggregate([
//       matchStage,
//       addFieldsStage,
//       groupStage1,
//       groupStage2,
//       projectStage,
//     ]);

//     return response.returnTrue(200, req, res, "Success", data);
//   } catch (err) {
//     return response.returnFalse(500, req, res, err.message, {});
//   }
// };



// exports.alfreduseranalytics = async (req, res) => {
//   try {
//     const { selector_name } = req.body; // Assuming the selector_name is sent in the request body

//     const matchStage = {
//       $match: {
//         selector_name: selector_name,
//         posttype_decision: { $gt: 0 },
//       },
//     };

//     const data = await instaPostModel.aggregate([
//       matchStage,
//       {
//         $group: {
//           _id: {
//             selector_name: "$selector_name",
//             page_category_id: "$page_category_id",
//           },
//           recordsCount: { $sum: 1 },
//           correctDecisionCount: {
//             $sum: {
//               $cond: {
//                 if: {
//                   $or: [
//                     { $eq: ["$selector_decision", "$interpretor_decision"] },
//                     {
//                       $and: [
//                         { $eq: ["$selector_decision", 5] },
//                         { $eq: ["$interpretor_decision", 1] },
//                       ],
//                     },
//                   ],
//                 },
//                 then: 1,
//                 else: 0,
//               },
//             },
//           },
//           incorrectDecisionCount: {
//             $sum: {
//               $cond: {
//                 if: {
//                   $and: [
//                     { $ne: ["$selector_decision", "$interpretor_decision"] },
//                     {
//                       $or: [
//                         {
//                           $and: [
//                             { $ne: ["$selector_decision", 5] },
//                             { $ne: ["$interpretor_decision", 1] },
//                           ],
//                         },
//                       ],
//                     },
//                     { $gt: ["$posttype_decision", 1] },
//                   ],
//                 },
//                 then: 1,
//                 else: 0,
//               },
//             },
//           },
//         },
//       },
//       {
//         $group: {
//           _id: {
//             selector_name: "$_id.selector_name",
//           },
//           recordsCount: { $sum: "$recordsCount" },
//           correctDecisionCount: { $sum: "$correctDecisionCount" },
//           incorrectDecisionCount: { $sum: "$incorrectDecisionCount" },
//           pageCategories: {
//             $push: {
//               page_category_id: "$_id.page_category_id",
//               count: "$recordsCount",
//             },
//           },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           selector_name: "$_id.selector_name",
//           recordsCount: 1,
//           correctDecisionCount: 1,
//           incorrectDecisionCount: 1,
//           pageCategory: "$pageCategories",
//         },
//       },
//     ]);

//     return response.returnTrue(200, req, res, "Success", data);
//   } catch (err) {
//     return response.returnFalse(500, req, res, err.message, {});
//   }
// };




























//  user analytics api
//response
// {
//   "recordsCount": 329,
//   "correctDecisionCount": 127,
//   "incorrectDecisionCount": 0,
//   "selector_name": 178,
//   "pageCategory": [
//       {
//           "page_category_id": 17,
//           "count": 128
//       },
//       {
//           "page_category_id": 29,
//           "count": 107
//       },
//       {
//           "page_category_id": 22,
//           "count": 3
//       },
//       {
//           "page_category_id": 30,
//           "count": 91
//       }
//   ]
// },
// exports.alfreduseranalytics = async (req, res) => {
//   try {
//     const data = await instaPostModel.aggregate([
//       {
//         $match: {
//           posttype_decision: { $gt: 0 },
//         },
//       },
//       {
//         $group: {
//           _id: {
//             selector_name: "$selector_name",
//             page_category_id: "$page_category_id",
//           },
//           recordsCount: { $sum: 1 },
//           correctDecisionCount: {
//             $sum: {
//               $cond: {
//                 if: {
//                   $or: [
//                     { $eq: ["$selector_decision", "$interpretor_decision"] },
//                     {
//                       $and: [
//                         { $eq: ["$selector_decision", 5] },
//                         { $eq: ["$interpretor_decision", 1] },
//                       ],
//                     },
//                   ],
//                 },
//                 then: 1,
//                 else: 0,
//               },
//             },
//           },
//           incorrectDecisionCount: {
//             $sum: {
//               $cond: {
//                 if: {
//                   $and: [
//                     { $ne: ["$selector_decision", "$interpretor_decision"] },
//                     {
//                       $or: [
//                         {
//                           $and: [
//                             { $ne: ["$selector_decision", 5] },
//                             { $ne: ["$interpretor_decision", 1] },
//                           ],
//                         },
//                       ],
//                     },
//                     { $gt: ["$posttype_decision", 1] },
//                   ],
//                 },
//                 then: 1,
//                 else: 0,
//               },
//             },
//           },
//         },
//       },
//       {
//         $group: {
//           _id: {
//             selector_name: "$_id.selector_name",
//           },
//           recordsCount: { $sum: "$recordsCount" },
//           correctDecisionCount: { $sum: "$correctDecisionCount" },
//           incorrectDecisionCount: { $sum: "$incorrectDecisionCount" },
//           pageCategories: {
//             $push: {
//               page_category_id: "$_id.page_category_id",
//               count: "$recordsCount",
//             },
//           },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           selector_name: "$_id.selector_name",
//           recordsCount: 1,
//           correctDecisionCount: 1,
//           incorrectDecisionCount: 1,
//           pageCategory: "$pageCategories",
//         },
//       },
//     ]);

//     return response.returnTrue(200, req, res, "Success", data);
//   } catch (err) {
//     return response.returnFalse(500, req, res, err.message, {});
//   }
// };







// single user query
// exports.alfreduseranalytics = async (req, res) => {
//   try {
//     const data = await instaPostModel.aggregate([
//       {
//         $match: {
//           selector_name: 206, // Add the condition to match selector_name
//           selector_date: { $exists: true, $ne: null },
//         },
//       },
//       {
//         $group: {
//           _id: {
//             selector_name: "$selector_name",
//             date: {
//               $dateToString: { format: "%Y-%m-%d", date: "$selector_date" },
//             },
//             page_category_id: {
//               $ifNull: ["$page_category_id", 0],
//             },
//             selector_decision: "$selector_decision",
//           },
//           count: { $sum: 1 },
//         },
//       },
//       {
//         $group: {
//           _id: {
//             selector_name: "$_id.selector_name",
//             date: "$_id.date",
//             page_category_id: "$_id.page_category_id",
//           },
//           dateCount: { $sum: "$count" },
//           decisionCounts: {
//             $push: {
//               decision: "$_id.selector_decision",
//               count: "$count",
//             },
//           },
//         },
//       },
//       {
//         $group: {
//           _id: {
//             selector_name: "$_id.selector_name",
//             date: "$_id.date",
//           },
//           pageCategories: {
//             $push: {
//               page_category_id: "$_id.page_category_id",
//               counts: "$decisionCounts",
//             },
//           },
//           totalDateCount: { $sum: "$dateCount" },
//         },
//       },
//       {
//         $group: {
//           _id: "$_id.selector_name",
//           records: {
//             $push: {
//               date: "$_id.date",
//               datewisecount: "$totalDateCount",
//               pageCategories: {
//                 $arrayToObject: {
//                   $map: {
//                     input: "$pageCategories",
//                     as: "pc",
//                     in: {
//                       k: { $toString: "$$pc.page_category_id" },
//                       v: {
//                         promotional: {
//                           $sum: {
//                             $cond: {
//                               if: {
//                                 $gt: [
//                                   { $size: "$$pc.counts" },
//                                   0,
//                                 ],
//                               },
//                               then: {
//                                 $sum: {
//                                   $map: {
//                                     input: {
//                                       $filter: {
//                                         input: "$$pc.counts",
//                                         as: "d",
//                                         cond: {
//                                           $eq: ["$$d.decision", 1],
//                                         },
//                                       },
//                                     },
//                                     as: "d",
//                                     in: "$$d.count",
//                                   },
//                                 },
//                               },
//                               else: 0,
//                             },
//                           },
//                         },
//                         non_promotional: {
//                           $sum: {
//                             $cond: {
//                               if: {
//                                 $gt: [
//                                   { $size: "$$pc.counts" },
//                                   0,
//                                 ],
//                               },
//                               then: {
//                                 $sum: {
//                                   $map: {
//                                     input: {
//                                       $filter: {
//                                         input: "$$pc.counts",
//                                         as: "d",
//                                         cond: {
//                                           $eq: ["$$d.decision", 2],
//                                         },
//                                       },
//                                     },
//                                     as: "d",
//                                     in: "$$d.count",
//                                   },
//                                 },
//                               },
//                               else: 0,
//                             },
//                           },
//                         },
//                         not_sure: {
//                           $sum: {
//                             $cond: {
//                               if: {
//                                 $gt: [
//                                   { $size: "$$pc.counts" },
//                                   0,
//                                 ],
//                               },
//                               then: {
//                                 $sum: {
//                                   $map: {
//                                     input: {
//                                       $filter: {
//                                         input: "$$pc.counts",
//                                         as: "d",
//                                         cond: {
//                                           $in: [
//                                             "$$d.decision",
//                                             [3, 5],
//                                           ],
//                                         },
//                                       },
//                                     },
//                                     as: "d",
//                                     in: "$$d.count",
//                                   },
//                                 },
//                               },
//                               else: 0,
//                             },
//                           },
//                         },
//                         logo_post: {
//                           $sum: {
//                             $cond: {
//                               if: {
//                                 $gt: [
//                                   { $size: "$$pc.counts" },
//                                   0,
//                                 ],
//                               },
//                               then: {
//                                 $sum: {
//                                   $map: {
//                                     input: {
//                                       $filter: {
//                                         input: "$$pc.counts",
//                                         as: "d",
//                                         cond: {
//                                           $eq: ["$$d.decision", 5],
//                                         },
//                                       },
//                                     },
//                                     as: "d",
//                                     in: "$$d.count",
//                                   },
//                                 },
//                               },
//                               else: 0,
//                             },
//                           },
//                         },
//                       },
//                     },
//                   },
//                 },
//               },
//             },
//           },
//           total: { $sum: "$totalDateCount" },
//           mindatecount: { $min: "$totalDateCount" },
//           maxdatecount: { $max: "$totalDateCount" },
//           correctdecision: {
//             $sum: {
//               $cond: {
//                 if: {
//                   $eq: ["$selector_decision", "$interpretor_decision"],
//                 },
//                 then: 1,
//                 else: 0,
//               },
//             },
//           },
//           incorrectdecision: {
//             $sum: {
//               $cond: {
//                 if: {
//                   $ne: ["$selector_decision", "$interpretor_decision"],
//                 },
//                 then: 1,
//                 else: 0,
//               },
//             },
//           },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           selector_name: "$_id",
//           total: 1,
//           records: 1,
//           mindatecount: 1,
//           maxdatecount: 1,
//           correctdecision: 1,
//           incorrectdecision: 1,
//         },
//       },
//     ]);

//     return response.returnTrue(200, req, res, "Success", data);
//   } catch (err) {
//     return response.returnFalse(500, req, res, err.message, {});
//   }
// };





//! User Analytics
exports.getallalfreduseranalytics = async (req, res) => {
  try {
    const data = await instaPostModel.aggregate([
      {
        $match: {
          selector_date: { $exists: true, $ne: null },
        },
      },
      {
        $group: {
          _id: {
            selector_name: "$selector_name",
            date: {
              $dateToString: { format: "%Y-%m-%d", date: "$selector_date" },
            },
            page_category_id: {
              $ifNull: ["$page_category_id", 0],
            },
            selector_decision: "$selector_decision",
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: {
            selector_name: "$_id.selector_name",
            date: "$_id.date",
            page_category_id: "$_id.page_category_id",
          },
          dateCount: { $sum: "$count" },
          decisionCounts: {
            $push: {
              decision: "$_id.selector_decision",
              count: "$count",
            },
          },
        },
      },
      {
        $group: {
          _id: {
            selector_name: "$_id.selector_name",
            date: "$_id.date",
          },
          pageCategories: {
            $push: {
              page_category_id: "$_id.page_category_id",
              counts: "$decisionCounts",
            },
          },
          totalDateCount: { $sum: "$dateCount" },
        },
      },
      {
        $group: {
          _id: "$_id.selector_name",
          records: {
            $push: {
              date: "$_id.date",
              datewisecount: "$totalDateCount",
              pageCategories: {
                $arrayToObject: {
                  $map: {
                    input: "$pageCategories",
                    as: "pc",
                    in: {
                      k: { $toString: "$$pc.page_category_id" },
                      v: {
                        promotional: {
                          $sum: {
                            $cond: {
                              if: {
                                $gt: [
                                  { $size: "$$pc.counts" },
                                  0,
                                ],
                              },
                              then: {
                                $sum: {
                                  $map: {
                                    input: {
                                      $filter: {
                                        input: "$$pc.counts",
                                        as: "d",
                                        cond: {
                                          $eq: ["$$d.decision", 1],
                                        },
                                      },
                                    },
                                    as: "d",
                                    in: "$$d.count",
                                  },
                                },
                              },
                              else: 0,
                            },
                          },
                        },
                        non_promotional: {
                          $sum: {
                            $cond: {
                              if: {
                                $gt: [
                                  { $size: "$$pc.counts" },
                                  0,
                                ],
                              },
                              then: {
                                $sum: {
                                  $map: {
                                    input: {
                                      $filter: {
                                        input: "$$pc.counts",
                                        as: "d",
                                        cond: {
                                          $eq: ["$$d.decision", 2],
                                        },
                                      },
                                    },
                                    as: "d",
                                    in: "$$d.count",
                                  },
                                },
                              },
                              else: 0,
                            },
                          },
                        },
                        not_sure: {
                          $sum: {
                            $cond: {
                              if: {
                                $gt: [
                                  { $size: "$$pc.counts" },
                                  0,
                                ],
                              },
                              then: {
                                $sum: {
                                  $map: {
                                    input: {
                                      $filter: {
                                        input: "$$pc.counts",
                                        as: "d",
                                        cond: {
                                          $in: [
                                            "$$d.decision",
                                            [3, 5],
                                          ],
                                        },
                                      },
                                    },
                                    as: "d",
                                    in: "$$d.count",
                                  },
                                },
                              },
                              else: 0,
                            },
                          },
                        },
                        logo_post: {
                          $sum: {
                            $cond: {
                              if: {
                                $gt: [
                                  { $size: "$$pc.counts" },
                                  0,
                                ],
                              },
                              then: {
                                $sum: {
                                  $map: {
                                    input: {
                                      $filter: {
                                        input: "$$pc.counts",
                                        as: "d",
                                        cond: {
                                          $eq: ["$$d.decision", 5],
                                        },
                                      },
                                    },
                                    as: "d",
                                    in: "$$d.count",
                                  },
                                },
                              },
                              else: 0,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          total: { $sum: "$totalDateCount" },
          mindatecount: { $min: "$totalDateCount" },
          maxdatecount: { $max: "$totalDateCount" },
          mincountdate: {
            $first: {
              $cond: {
                if: { $eq: ["$totalDateCount", { $min: "$totalDateCount" }] },
                then: "$_id.date",
                else: null,
              },
            },
          },
          maxcountdate: {
            $first: {
              $cond: {
                if: { $eq: ["$totalDateCount", { $max: "$totalDateCount" }] },
                then: "$_id.date",
                else: null,
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          selector_name: "$_id",
          total: 1,
          records: 1,
          mindatecount: 1,
          maxdatecount: 1,
          mincountdate: 1,
          maxcountdate: 1,
        },
      },
    ]);

    return response.returnTrue(200, req, res, "Success", data);
  } catch (err) {
    return response.returnFalse(500, req, res, err.message, {});
  }
};



// responseeeeeee
// {
//   "records": [
//       {
//           "date": "2023-12-22",
//           "datewisecount": 13,
//           "pageCategories": {
//               "17": {
//                   "promotional": 0,
//                   "non_promotional": 13,
//                   "not_sure": 0,
//                   "logo_post": 0
//               }
//           }
//       }
//   ],
//   "total": 13,
//   "mindatecount": 13,
//   "maxdatecount": 13,
//   "mincountdate": "2023-12-22",
//   "maxcountdate": "2023-12-22",
//   "selector_name": 159
// },


































// old research

// exports.alfreduseranalytics = async (req, res) => {
//   try {
//     const data = await instaPostModel.aggregate([
//       {
//         $match: {
//           selector_date: { $exists: true, $ne: null },
//         },
//       },
//       {
//         $group: {
//           _id: {
//             selector_name: "$selector_name",
//             date: {
//               $dateToString: { format: "%Y-%m-%d", date: "$selector_date" },
//             },
//             page_category_id: {
//               $ifNull: ["$page_category_id", 0],
//             },
//             selector_decision: "$selector_decision",
//           },
//           count: { $sum: 1 },
//         },
//       },
//       {
//         $group: {
//           _id: {
//             selector_name: "$_id.selector_name",
//             date: "$_id.date",
//             page_category_id: "$_id.page_category_id",
//           },
//           dateCount: { $sum: "$count" },
//           decisionCounts: {
//             $push: {
//               decision: "$_id.selector_decision",
//               count: "$count",
//             },
//           },
//         },
//       },
//       {
//         $group: {
//           _id: {
//             selector_name: "$_id.selector_name",
//             date: "$_id.date",
//           },
//           pageCategories: {
//             $push: {
//               page_category_id: "$_id.page_category_id",
//               counts: "$decisionCounts",
//             },
//           },
//           totalDateCount: { $sum: "$dateCount" },
//         },
//       },
//       {
//         $group: {
//           _id: "$_id.selector_name",
//           records: {
//             $push: {
//               date: "$_id.date",
//               datewisecount: "$totalDateCount",
//               pageCategories: {
//                 $arrayToObject: {
//                   $map: {
//                     input: "$pageCategories",
//                     as: "pc",
//                     in: {
//                       k: { $toString: "$$pc.page_category_id" },
//                       v: {
//                         promotional: {
//                           $sum: {
//                             $cond: {
//                               if: {
//                                 $gt: [
//                                   { $size: "$$pc.counts" },
//                                   0,
//                                 ],
//                               },
//                               then: {
//                                 $sum: {
//                                   $map: {
//                                     input: {
//                                       $filter: {
//                                         input: "$$pc.counts",
//                                         as: "d",
//                                         cond: {
//                                           $eq: ["$$d.decision", 1],
//                                         },
//                                       },
//                                     },
//                                     as: "d",
//                                     in: "$$d.count",
//                                   },
//                                 },
//                               },
//                               else: 0,
//                             },
//                           },
//                         },
//                         non_promotional: {
//                           $sum: {
//                             $cond: {
//                               if: {
//                                 $gt: [
//                                   { $size: "$$pc.counts" },
//                                   0,
//                                 ],
//                               },
//                               then: {
//                                 $sum: {
//                                   $map: {
//                                     input: {
//                                       $filter: {
//                                         input: "$$pc.counts",
//                                         as: "d",
//                                         cond: {
//                                           $eq: ["$$d.decision", 2],
//                                         },
//                                       },
//                                     },
//                                     as: "d",
//                                     in: "$$d.count",
//                                   },
//                                 },
//                               },
//                               else: 0,
//                             },
//                           },
//                         },
//                         not_sure: {
//                           $sum: {
//                             $cond: {
//                               if: {
//                                 $gt: [
//                                   { $size: "$$pc.counts" },
//                                   0,
//                                 ],
//                               },
//                               then: {
//                                 $sum: {
//                                   $map: {
//                                     input: {
//                                       $filter: {
//                                         input: "$$pc.counts",
//                                         as: "d",
//                                         cond: {
//                                           $in: [
//                                             "$$d.decision",
//                                             [3, 5],
//                                           ],
//                                         },
//                                       },
//                                     },
//                                     as: "d",
//                                     in: "$$d.count",
//                                   },
//                                 },
//                               },
//                               else: 0,
//                             },
//                           },
//                         },
//                         logo_post: {
//                           $sum: {
//                             $cond: {
//                               if: {
//                                 $gt: [
//                                   { $size: "$$pc.counts" },
//                                   0,
//                                 ],
//                               },
//                               then: {
//                                 $sum: {
//                                   $map: {
//                                     input: {
//                                       $filter: {
//                                         input: "$$pc.counts",
//                                         as: "d",
//                                         cond: {
//                                           $eq: ["$$d.decision", 5],
//                                         },
//                                       },
//                                     },
//                                     as: "d",
//                                     in: "$$d.count",
//                                   },
//                                 },
//                               },
//                               else: 0,
//                             },
//                           },
//                         },
//                       },
//                     },
//                   },
//                 },
//               },
//             },
//           },
//           total: { $sum: "$totalDateCount" },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           selector_name: "$_id",
//           records: 1,
//           total: 1,
//         },
//       },
//     ]);

//     return response.returnTrue(200, req, res, "Success", data);
//   } catch (err) {
//     return response.returnFalse(500, req, res, err.message, {});
//   }
// }

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// exports.alfreduseranalytics = async (req, res) => {
//   try {
//     const data = await instaPostModel.aggregate([
//       {
//         $match: {
//           selector_date: { $exists: true, $ne: null },
//         },
//       },
//       {
//         $group: {
//           _id: {
//             selector_name: "$selector_name",
//             date: {
//               $dateToString: { format: "%Y-%m-%d", date: "$selector_date" },
//             },
//             page_category_id: {
//               $ifNull: ["$page_category_id", 0],
//             },
//             selector_decision: "$selector_decision",
//           },
//           count: { $sum: 1 },
//         },
//       },
//       {
//         $group: {
//           _id: {
//             selector_name: "$_id.selector_name",
//             date: "$_id.date",
//             page_category_id: "$_id.page_category_id",
//           },
//           dateCount: { $sum: "$count" },
//           decisionCounts: {
//             $push: {
//               decision: "$_id.selector_decision",
//               count: "$count",
//             },
//           },
//         },
//       },
//       {
//         $group: {
//           _id: {
//             selector_name: "$_id.selector_name",
//             date: "$_id.date",
//           },
//           pageCategories: {
//             $push: {
//               page_category_id: "$_id.page_category_id",
//               counts: "$decisionCounts",
//             },
//           },
//           totalDateCount: { $sum: "$dateCount" },
//         },
//       },
//       {
//         $group: {
//           _id: "$_id.selector_name",
//           records: {
//             $push: {
//               date: "$_id.date",
//               pageCategories: {
//                 $arrayToObject: {
//                   $map: {
//                     input: "$pageCategories",
//                     as: "pc",
//                     in: {
//                       k: { $toString: "$$pc.page_category_id" },
//                       v: {
//                         promotional: {
//                           $sum: {
//                             $cond: {
//                               if: {
//                                 $gt: [
//                                   { $size: "$$pc.counts" },
//                                   0,
//                                 ],
//                               },
//                               then: {
//                                 $sum: {
//                                   $map: {
//                                     input: {
//                                       $filter: {
//                                         input: "$$pc.counts",
//                                         as: "d",
//                                         cond: {
//                                           $eq: ["$$d.decision", 1],
//                                         },
//                                       },
//                                     },
//                                     as: "d",
//                                     in: "$$d.count",
//                                   },
//                                 },
//                               },
//                               else: 0,
//                             },
//                           },
//                         },
//                         non_promotional: {
//                           $sum: {
//                             $cond: {
//                               if: {
//                                 $gt: [
//                                   { $size: "$$pc.counts" },
//                                   0,
//                                 ],
//                               },
//                               then: {
//                                 $sum: {
//                                   $map: {
//                                     input: {
//                                       $filter: {
//                                         input: "$$pc.counts",
//                                         as: "d",
//                                         cond: {
//                                           $eq: ["$$d.decision", 2],
//                                         },
//                                       },
//                                     },
//                                     as: "d",
//                                     in: "$$d.count",
//                                   },
//                                 },
//                               },
//                               else: 0,
//                             },
//                           },
//                         },
//                         not_sure: {
//                           $sum: {
//                             $cond: {
//                               if: {
//                                 $gt: [
//                                   { $size: "$$pc.counts" },
//                                   0,
//                                 ],
//                               },
//                               then: {
//                                 $sum: {
//                                   $map: {
//                                     input: {
//                                       $filter: {
//                                         input: "$$pc.counts",
//                                         as: "d",
//                                         cond: {
//                                           $in: [
//                                             "$$d.decision",
//                                             [3, 5],
//                                           ],
//                                         },
//                                       },
//                                     },
//                                     as: "d",
//                                     in: "$$d.count",
//                                   },
//                                 },
//                               },
//                               else: 0,
//                             },
//                           },
//                         },
//                         logo_post: {
//                           $sum: {
//                             $cond: {
//                               if: {
//                                 $gt: [
//                                   { $size: "$$pc.counts" },
//                                   0,
//                                 ],
//                               },
//                               then: {
//                                 $sum: {
//                                   $map: {
//                                     input: {
//                                       $filter: {
//                                         input: "$$pc.counts",
//                                         as: "d",
//                                         cond: {
//                                           $eq: ["$$d.decision", 5],
//                                         },
//                                       },
//                                     },
//                                     as: "d",
//                                     in: "$$d.count",
//                                   },
//                                 },
//                               },
//                               else: 0,
//                             },
//                           },
//                         },
//                       },
//                     },
//                   },
//                 },
//               },
//             },
//           },
//           total: { $sum: "$totalDateCount" },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           selector_name: "$_id",
//           records: 1,
//           total: 1,
//         },
//       },
//     ]);

//     return response.returnTrue(200, req, res, "Success", data);
//   } catch (err) {
//     return response.returnFalse(500, req, res, err.message, {});
//   }
// };




// exports.alfreduseranalytics = async (req, res) => {
//   try {
//     const data = await instaPostModel.aggregate([
//       {
//         $match: {
//           selector_date: { $exists: true, $ne: null },
//         },
//       },
//       {
//         $group: {
//           _id: {
//             selector_name: "$selector_name",
//             date: {
//               $dateToString: { format: "%Y-%m-%d", date: "$selector_date" },
//             },
//             page_category_id: {
//               $ifNull: ["$page_category_id", 0],
//             },
//             selector_decision: "$selector_decision",
//           },
//           count: { $sum: 1 },
//         },
//       },
//       {
//         $group: {
//           _id: {
//             selector_name: "$_id.selector_name",
//             date: "$_id.date",
//             page_category_id: "$_id.page_category_id",
//           },
//           dateCount: { $sum: "$count" },
//           decisionCounts: {
//             $push: {
//               decision: "$_id.selector_decision",
//               count: "$count",
//             },
//           },
//         },
//       },
//       {
//         $group: {
//           _id: "$_id.selector_name",
//           records: {
//             $push: {
//               date: "$_id.date",
//               datewisecount: "$dateCount",
//               pageCategories: {
//                 $arrayToObject: {
//                   $map: {
//                     input: "$decisionCounts",
//                     as: "decisionCount",
//                     in: {
//                       k: { $toString: "$$decisionCount.decision" },
//                       v: "$$decisionCount.count",
//                     },
//                   },
//                 },
//               },
//             },
//           },
//           total: { $sum: "$dateCount" },
//           mindatecount: { $min: "$dateCount" },
//           maxdatecount: { $max: "$dateCount" },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           selector_name: "$_id",
//           total: 1,
//           records: 1,
//           mindatecount: 1,
//           maxdatecount: 1,
//         },
//       },
//       {
//         $unwind: "$records",
//       },
//       {
//         $project: {
//           "records.date": 1,
//           "records.datewisecount": 1,
//           "records.pageCategories": 1,
//           total: 1,
//           mindatecount: 1,
//           maxdatecount: 1,
//         },
//       },
//     ]);

//     return response.returnTrue(200, req, res, "Success", data);
//   } catch (err) {
//     return response.returnFalse(500, req, res, err.message, {});
//   }
// };






// exports.alfreduseranalytics = async (req, res) => {
//   try {
//     const data = await instaPostModel.aggregate([
//       {
//         $match: {
//           selector_date: { $exists: true, $ne: null },
//         },
//       },
//       {
//         $group: {
//           _id: {
//             selector_name: "$selector_name",
//             date: {
//               $dateToString: { format: "%Y-%m-%d", date: "$selector_date" },
//             },
//             page_category_id: {
//               $ifNull: ["$page_category_id", 0],
//             },
//             selector_decision: "$selector_decision",
//           },
//           count: { $sum: 1 },
//         },
//       },
//       {
//         $group: {
//           _id: {
//             selector_name: "$_id.selector_name",
//             date: "$_id.date",
//             page_category_id: "$_id.page_category_id",
//           },
//           dateCount: { $sum: "$count" },
//           decisionCounts: {
//             $push: {
//               decision: "$_id.selector_decision",
//               count: "$count",
//             },
//           },
//         },
//       },
//       {
//         $group: {
//           _id: "$_id.selector_name",
//           records: {
//             $push: {
//               date: "$_id.date",
//               datewisecount: "$dateCount",
//               pageCategories: {
//                 $arrayToObject: {
//                   $map: {
//                     input: "$decisionCounts",
//                     as: "decisionCount",
//                     in: {
//                       k: { $toString: "$$decisionCount.decision" },
//                       v: "$$decisionCount.count",
//                     },
//                   },
//                 },
//               },
//             },
//           },
//           total: { $sum: "$dateCount" },
//           mindatecount: { $min: "$dateCount" },
//           maxdatecount: { $max: "$dateCount" },
//           mincountdate: {
//             $first: {
//               $cond: {
//                 if: { $eq: ["$dateCount", { $min: "$dateCount" }] },
//                 then: "$_id.date",
//                 else: null,
//               },
//             },
//           },
//           maxcountdate: {
//             $first: {
//               $cond: {
//                 if: { $eq: ["$dateCount", { $max: "$dateCount" }] },
//                 then: "$_id.date",
//                 else: null,
//               },
//             },
//           },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           selector_name: "$_id",
//           total: 1,
//           records: 1,
//           mindatecount: 1,
//           maxdatecount: 1,
//           mincountdate: 1,
//           maxcountdate: 1,
//         },
//       },
//     ]);

//     return response.returnTrue(200, req, res, "Success", data);
//   } catch (err) {
//     return response.returnFalse(500, req, res, err.message, {});
//   }
// };





































