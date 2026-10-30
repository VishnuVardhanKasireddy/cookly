
import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { saveRecipe } from "../api/recipeService";

function RecipeResultsPage() {
  const location = useLocation();
  const recipe = location.state?.recipe;
  const isAlreadySaved = Boolean(recipe?._id);
  const [saving, setSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState("");

  if (!recipe) {
    return <Navigate to="/ingredients" replace />;
  }

  async function handleSaveRecipe() {
    const isAlreadySaved = Boolean(recipe._id);
    if (saving || isSaved) return;

    setSaving(true);
    setError("");

    try {
      console.log("Recipe being saved:", recipe);
      await saveRecipe(recipe);
      setIsSaved(true);
    } catch (err) {
      console.error("Failed to save recipe:", error);
      console.error("Backend response:", error.response?.data);
      console.error("Failed to save recipe:", err);

      setError(
        err.response?.data?.message ||
        "Unable to save this recipe. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F8F9F7] px-4 py-8 text-gray-900 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <Link
            to="/ingredients"
            className="text-sm font-medium text-green-700 hover:text-green-800"
          >
            ← Back to ingredients
          </Link>

          <p className="mt-6 font-semibold text-green-700">
            Cookly
          </p>
          {recipe.image?.imageUrl && (
            <div className="mb-6">
                <img
                    src={recipe.image.imageUrl}
                    alt={recipe.title}
                    className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-sm"
                />

                <p className="text-xs text-gray-500 mt-2 text-right">
                    Photo by{" "}
                    <a
                        href={recipe.image.photographerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                    >
                        {recipe.image.photographer}
                    </a>
                    {" "}on{" "}
                    <a
                        href={recipe.image.photoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                    >
                        Unsplash
                    </a>
                </p>
            </div>
        )}
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {recipe.title}
          </h1>

          <p className="mt-3 leading-relaxed text-gray-600">
            {recipe.description}
          </p>
        </div>

        {/* Recipe metadata */}
        <section className="mb-6 flex flex-wrap gap-3">
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm text-green-800">
            {recipe.cuisine}
          </span>

          <span className="rounded-full bg-white px-4 py-2 text-sm text-gray-700">
            {recipe.servings} servings
          </span>

          <span className="rounded-full bg-white px-4 py-2 text-sm text-gray-700">
            Prep: {recipe.prepTime}
          </span>

          <span className="rounded-full bg-white px-4 py-2 text-sm text-gray-700">
            Cook: {recipe.cookTime} min
          </span>

          <span className="rounded-full bg-white px-4 py-2 text-sm text-gray-700 capitalize">
            {recipe.difficulty}
          </span>
        </section>



        {/* Ingredients */}
        <section className="mb-8 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold">
            Ingredients
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Everything you need to prepare this recipe.
          </p>

          <ul className="mt-6 space-y-4">
            {recipe.ingredients.map((ingredient, index) => (
              <li
                key={`${ingredient.name}-${index}`}
                className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0"
              >
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs text-green-700">
                  ✓
                </span>

                <div className="flex flex-1 justify-between gap-4">
                  <span className="text-sm font-medium text-gray-800">
                    {ingredient.name}
                  </span>

                  <span className="text-right text-sm text-gray-500">
                    {ingredient.quantity} {ingredient.unit}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Instructions */}
        <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold">
            Cooking Instructions
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Follow these steps to prepare your recipe.
          </p>

          <ol className="mt-6 space-y-6">
            {recipe.instructions.map((instruction) => (
              <li
                key={instruction.step}
                className="flex gap-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 font-semibold text-green-800">
                  {instruction.step}
                </span>

                <p className="pt-1 text-sm leading-7 text-gray-700">
                  {instruction.description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        
        {/* Recipe Actions */}
        <section className="mt-10 flex flex-col items-center justify-center gap-4 border-t border-gray-200 pt-8 sm:flex-row">

          {!isAlreadySaved && (
            <button
              type="button"
              onClick={handleSaveRecipe}
              disabled={saving || isSaved}
              className="w-full rounded-xl bg-green-700 px-8 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {saving
                ? "Saving..."
                : isSaved
                  ? "Saved!"
                  : "Save Recipe"}
            </button>
          )}

          <Link
            to="/ingredients"
            className="w-full rounded-xl border border-green-700 px-8 py-3 text-center text-sm font-semibold text-green-700 transition hover:bg-green-50 sm:w-auto"
          >
            Generate Another
          </Link>

          {error && (
            <p role="alert" className="text-sm text-red-600 sm:basis-full sm:text-center">
              {error}
            </p>
          )}

          {isSaved && (
            <p role="status" className="text-sm text-green-700 sm:basis-full sm:text-center">
              Recipe saved successfully! You can find it in Saved Recipes.
            </p>
          )}
        </section>


      </div>
    </main>
  );
}

export default RecipeResultsPage;
