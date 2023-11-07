const folders = require("./components/tag");
const mainSchema = require("./components/mainSchema");
const apis = require("./components/allApiCollection");
const mainServers = require("./components/mainServers");

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
  servers: [...mainServers],
  tags: [...folders], // Create tags for seprate api's folder wise
  paths: apis,
  components: {
    schemas: mainSchema,
  },
};

module.exports = swaggerDocumantion;
