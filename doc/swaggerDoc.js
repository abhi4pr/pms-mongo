const tag = require("./components/tag");
const BrandRouteDoc = require("./components/brandDoc");
const registerCmp = require("./components/registerCampaignDoc");

const swaggerDocumantion = {
    openapi: "3.0.0",
    info: {
      title: "Jarvis Mongo API Documentation",
      version: "1.0.0",
      description: `There is a collection of all api's`,
      contact: {
        email: "apiteam@swagger.io",
      },
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Local Server",
      },
      {
        url: "http://34.93.135.33:8080",
        description: "Live Server",
      },
    ],
    tags: [...tag],              // Create tags for seprate api's folder wise
    paths: {                      // Create api's with the help of paths
      ...BrandRouteDoc,
      ...registerCmp
    
     
    },
    // components: {                 //Create reusable components
    //   schemas: {                  //Create schema for display schema 
    //     User: {
    //       ...userSchema,
    //     },
    //   },
    //   UserArray: {
    //     description: "List of user object",
    //     content: {
    //       "application/json": {
    //         schema: {
    //           type: "array",
    //           items: {
    //             $ref: "#/components/schemas/User",
    //           },
    //         },
    //       },
    //     },
    //   },                               // Create for authorization button
    //   securitySchemes: {
    //     bearerAuth: {
    //       type: "apiKey",
    //       name: "Authorization",
    //       in: "header",
    //     },
    //   },
    // },
  };
  // console.log(registerCmp)
 
  module.exports = swaggerDocumantion;