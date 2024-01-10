/**
 * An array of server objects containing their URLs and descriptions.
 * @type {Array<Object>}
 * @property {string} url - The URL of the server.
 * @property {string} description - The description of the server.
 */
module.exports = servers = [
  {
    url: "http://localhost:3000",
    description: "Local Server",
  },
  {
    url: "https://jarvis-work-backend.onrender.com",
    description: "Live Server",
  },
];
