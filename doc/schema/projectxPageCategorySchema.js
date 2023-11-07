const projectxPageCategorySchema = {
    type: "object",
    category_id: {
        category_id: {
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
  module.exports = projectxPageCategorySchema;
  