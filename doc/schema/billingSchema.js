const billingSchema = {
  type: "object",
  properties: {
    billingheader_id: {
      type: "integer",
      format: "int",
      example: 10,
    },
    dept_id: {
      type: "integer",
      format: "int",
      example: 10,
    },
    billing_header_name: {
      type: "string",
      example: "Biling header name",
    },
  },
};
module.exports = billingSchema;
