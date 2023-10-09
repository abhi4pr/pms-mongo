const brandData = {
  data: [
    {
      _id: "6522cc4b3b2912a12bacbf4d",
      brand_name: "react test",
      category_id: 52,
      sub_category_id: 142,
      igusername: "react",
    },
  ],
};

// Data used in get profile
const getBrand = {
  tags: [`Brand Module`],
  description: "Get All Brands",
  responses: {
    200: {
      description: "Ok",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: brandData,
          },
        },
      },
    },
  },
//   // the security property is used to specify the security requirements for an API endpoint. It's an array of objects, where each object is a map of security schemes, keyed by security scheme name.
//   security: [
//     {
//       // bearerAuth: [],          //The empty array [] indicates that there are no scopes required for this security scheme.
//       bearerAuth: {
//         type: "http",
//         scheme: "bearer",
//         bearerFormat: "JWT",
//       },
//     },
//   ],
};

const BrandRouteDoc = {
  "/api/get_brands": {
    get: getBrand,
  },
};
module.exports = BrandRouteDoc;
