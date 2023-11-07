const registerCampaignSchema = {
  type: "object",
  properties: {
    register_campaign_id: {
      type: "integer",
      format: "int",
      example: 10,
    },
    brand_id: {
      type: "integer",
      format: "int",
      example: 1,
    },
    exeCmpId: {
      type: "integer",
      format: "int",
      example: 13,
    },
    stage: {
      type: "integer",
      format: "int",
      example: 1,
    },
    brnad_dt: {
      type: "date",
      format: "date",
      example: "2023-10-18T22:50:00.000+00:00",
    },
    status: {
      type: "integer",
      format: "int",
      example: 1,
    },
    excel_path: {
      type: "string",
      example: "Excel file path",
    },
    detailing: {
      type: "string",
      example: "detailing text",
    },
    commitment: {
      type: "array",
      format: "array of object",
      example: [
        {
          selectValue: 70,
          textValue: "5",
        },
        {
          selectValue: 61,
          textValue: "5",
        },
      ],
    },
  },
};
// export default brandSchema
module.exports = registerCampaignSchema;
