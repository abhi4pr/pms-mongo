const tag = require("./components/tag");
const brandSchema = require("./schema/BrandSchema.js");
const billingSchema = require("./schema/billingSchema.js");
const projectxCategorySchema = require("./schema/projectxCategorySchema.js");
const projectxPageCategorySchema = require("./schema/projectxPageCategorySchema.js");
const projectxSubCategorySchema = require("./schema/projectxSubCategorySchema.js");
const registerCampaignSchema = require("./schema/registerCampaignSchema.js");
const { BrandRouteDoc } = require("./components/brandDoc");
const { projectxCategoryDoc } = require("./components/projectxCategoryDoc");
const { billingHeaderDoc } = require("./components/billingHeaderDoc");
const {
  projectxPageCategoryDoc,
} = require("./components/projectxPageCategoryDoc");
const {
  projectxSubCategoryDoc,
} = require("./components/projectxSubCategoryDoc");
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
  tags: [...tag], // Create tags for seprate api's folder wise
  paths: {
    // Create api's with the help of paths
    ...BrandRouteDoc,
    ...registerCmp,
    ...billingHeaderDoc,
    ...projectxCategoryDoc,
    ...projectxSubCategoryDoc,
    ...projectxPageCategoryDoc,
  },
  components: {
    //Create reusable components
    schemas: {
      //Create schema for display schema
      Brand: {
        ...brandSchema,
      },
      Billing_Header: {
        ...billingSchema,
      },
      Projectx_Sub_Category_Schema: {
        ...projectxSubCategorySchema,
      },
      Projectx_Page_Category_Schema: {
        ...projectxPageCategorySchema,
      },
      Projectx_Category_Schema: {
        ...projectxCategorySchema,
      },
      Register_Campaign_Schema: {
        ...registerCampaignSchema,
      },
    },
  },
  UserArray: {
    description: "List of user object",
    content: {
      "application/json": {
        schema: {
          type: "array",
          items: {
            $ref: "#/components/schemas/Brand",
          },
        },
      },
    },
  }, // Create for authorization button
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
