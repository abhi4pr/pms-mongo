const projectxCategorySchema = {
    type: "object",
    properties: {
        category_id: {
        type: "integer",
        format: "int",
        example: 10,
      },
      brand_id: {
        type: "integer",
        format: "int",
        example: 1,
      },
      category_name: {
        type: "string",
        example: "Category name",
      },
    },
  };
  module.exports = projectxCategorySchema;
  