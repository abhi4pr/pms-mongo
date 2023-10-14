const constant = require("../../common/constant");

// Examples Data
const allRegisterCmpData = {
  data: [
    {
      detailing: "",
      _id: "651c0fd366d6c606096cea1d",
      brand_id: 343,
      brnad_dt: "Tue, 10 Oct 2023 20:30:00 GMT",
      excel_path: "df06441b3479b32922098abc532825d8",
      commitment: [
        {
          selectValue: 79,
          textValue: "1000",
        },
      ],
      register_campaign_id: 54,
      __v: 0,
      download_excel_file: `${constant.base_url}/uploads/df06441b3479b32922098abc532825d8`,
    },
  ],
};
const updateRegisterCmpData = {
  detailing: "",
  _id: "651c0fd366d6c606096cea1d",
  brand_id: 343,
  brnad_dt: "Tue, 10 Oct 2023 20:30:00 GMT",
  excel_path: "df06441b3479b32922098abc532825d8",
  commitment: [
    {
      selectValue: 79,
      textValue: "1000",
    },
  ],
  register_campaign_id: 54,
  __v: 0,
  download_excel_file: `${constant.base_url}/uploads/df06441b3479b32922098abc532825d8`,
};

const editRegisterCampaign = {
  "/api/register_campaign": {
    post: {
      tags: [`Register Campaign Module`],
      description: "Edit a Register Campaign with the specified ID.",
      consumes: [
        "multipart/form-data"
      ],
      parameters: [
        {
          in: "formData",
          name: "upfile",
          type: "file",
          description: "The file to upload."
        }
      ],
      responses: {
        200: {
          description: "Register Campaign Created successfully.",
          content: {
            "application/json": {
              example: {
                success: true,
                data: {
                  // Define the structure of the response data here
                },
              },
            },
          },
        },
        200: {
          description: "No Record Found",
          content: {
            "application/json": {
              example: {
                success: false,
                message: "No record found.",
              },
            },
          },
        },
        500: {
          description: "Internal server error",
          content: {
            "application/json": {
              example: {
                error: "Internal server error",
                message: "Error updating Register Campaign details.",
              },
            },
          },
        },
      },
    },
    put: {
      tags: [`Register Campaign Module`],
      description: "Edit a Register Campaign with the specified ID.",
      parameters: [
        {
          in: "body",
          name: "request body",
          description:
            "The request body containing the updated Register Campaign data.",
          required: true,
          schema: {
            type: "object",
            properties: {
              register_campaign_id: {
                type: "integer",
                description: "The ID of the Register Campaign to update.",
              },
              // Add other properties of the request body here
            },
            example: updateRegisterCmpData,
          },
        },
      ],
      responses: {
        200: {
          description: "Register Campaign updated successfully.",
          content: {
            "application/json": {
              example: {
                success: true,
                data: {
                  // Define the structure of the response data here
                },
              },
            },
          },
        },
        200: {
          description: "No Record Found",
          content: {
            "application/json": {
              example: {
                success: false,
                message: "No record found.",
              },
            },
          },
        },
        500: {
          description: "Internal server error",
          content: {
            "application/json": {
              example: {
                error: "Internal server error",
                message: "Error updating Register Campaign details.",
              },
            },
          },
        },
      },
    },
    get: {
      tags: [`Register Campaign Module`],
      description: "Get All Register Campaigns data",
      responses: {
        200: {
          description: "Ok",
          content: {
            "application/json": {
              schema: {
                type: "object",
                example: allRegisterCmpData,
              },
            },
          },
        },
        200: {
          //A 200 status code is used when the server successfully processes the request, but there is no content to return to the client.
          description: "No Records Found",
        },
        500: {
          description: "Error getting all Campaigns",
        },
      },
    },
  },
  "/api/register_campaign/{id}": {
    delete: {
      tags: [`Register Campaign Module`],
      description: "Delete Register Campaign",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID of register campaign to delete",
          required: true,
          schema: {
            type: "integer",
            format: "int64",
          },
        },
      ],
      responses: {
        200: {
          description: "Register campaign with ID 1 deleted successfully",
        },
        200: {
          description: "Register campaign with ID 2 not found",
        },
        500: {
          description: "Error message",
        },
      },
    },
  },
};

let registerCmp = {
  ...editRegisterCampaign,
};

module.exports = registerCmp;
