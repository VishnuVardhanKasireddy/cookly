import api from "./client";

export const generateRecipe = async (recipeData) => {
  const response = await api.post("/recipes/generate", recipeData);
  return response.data.data.recipe;
};

export const saveRecipe = async (recipeData) => {
  const response = await api.post("/recipes", recipeData);
  return response.data.data.recipe;
};

export const getSavedRecipes = async () => {
  const response = await api.get("/recipes");
  return response.data.data.recipes;
};

export const deleteRecipe = async (recipeId) => {
  const response = await api.delete(`/recipes/${recipeId}`);
  return response.data;
};