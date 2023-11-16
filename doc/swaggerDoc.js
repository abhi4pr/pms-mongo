const folders = require("./components/tag");
const mainSchema = require("./components/mainSchema");
const apis = require("./components/allApiCollection");
const mainServers = require("./components/mainServers");

const swaggerDocumantion = {
  openapi: "3.0.3",
  info: {
    // title: "Jarvis Mongo API Hub",
    version: "1.0.0",
    // description:
    //   "Welcome to the Jarvis API! Your central spot for managing and retrieving data efficiently.",
    contact: {
      email: "apiteam@yourdomain.com",
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
