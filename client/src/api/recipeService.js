import api from "./client";

export const generateRecipe = async (recipeData) => {
  const response = await api.post("/recipes/generate", recipeData);
  return response.data.data.recipe;
};