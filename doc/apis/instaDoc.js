exports.instaApis = {
  "/api/get_analytics": {
    get: {
      tags: [`Insta Api's`],
      description:
        "Get Analytics for insta post Based on some condition where posttype decision is greater than 1 and interpretor decision is equal to 1.",
      responses: {
        200: {
          description: "Fetching operation success.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  today_comment_max: 0,
                  today_comment_max_count: 14511,
                  today_comment_min: 215,
                  today_comment_min_count: 1,
                },
              },
            },
          },
        },

        500: {
          description: "Error message",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  error: "err.message",
                  message: "Error getting analytics.",
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/get_dynamic_key_value": {
    post: {
      tags: [`Insta Api's`],
      description:
        "Get data based on provided key value for insta post and flag  2 for all data fetch and flag 1 for count. Note: Please fetch max data like 200 documents otherwise documentation freez",
      parameters: [
        {
          in: "query",
          name: "page",
          schema: {
            type: "integer",
          },
          description: "Page number for pagination",
        },
        {
          in: "query",
          name: "perPage",
          schema: {
            type: "integer",
          },
          description: "Per page data for pagination",
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                request_key: {
                  type: "string",
                },
                request_value: {
                  type: "integer",
                },
                flag: {
                  type: "integer",
                },
              },
            },
            example: {
              request_key: "posttype_decision",
              request_value: 1,
              flag: 1,
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: "Fetching operation success.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  today_comment_max: 0,
                  today_comment_max_count: 14511,
                  today_comment_min: 215,
                  today_comment_min_count: 1,
                },
              },
            },
          },
        },

        500: {
          description: "Error message",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: {
                  error: "err.message",
                  message: "Error getting analytics.",
                },
              },
            },
          },
        },
      },
    },
  },
};
