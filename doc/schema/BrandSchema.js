const brandSchema = {
  type: "object",
  properties: {
    brand_id: {
      type: "integer",
      format: "int",
      example: 10,
    },
    category_id: {
      type: "integer",
      format: "int",
      example: 1,
    },
    user_id: {
      type: "integer",
      format: "int",
      example: 1,
    },
    sub_category_id: {
      type: "integer",
      format: "int",
      example: 1,
    },
    brand_name: {
      type: "string",
      example: "test brand",
    },
    igusername: {
      type: "string",
      example: "igusername",
    },
    whatsapp: {
      type: "string",
      example: "whats app link",
    },
    website: {
      type: "string",
      example: "website link",
    },
    major_category: {
      type: "string",
      example: "major category",
    },
   
  },
};
// export default brandSchema
module.exports = brandSchema