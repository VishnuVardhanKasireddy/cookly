
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSavedRecipes, deleteRecipe } from "../api/recipeService";

function SavedRecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingRecipeId, setDeletingRecipeId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const data = await getSavedRecipes();
        setRecipes(data);
      } catch (err) {
        console.error("Failed to fetch saved recipes:", err);
        setError(
          err.response?.data?.message ||
          "Unable to load your saved recipes. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  function handleViewRecipe(recipe) {
    navigate("/recipe", {
      state: { recipe },
    });
  }

  async function handleDeleteRecipe(recipeId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this recipe?"
    );

    if (!confirmed) return;

    setDeletingRecipeId(recipeId);
    setError("");

    try {
      await deleteRecipe(recipeId);

      setRecipes((currentRecipes) =>
        currentRecipes.filter((recipe) => recipe._id !== recipeId)
      );
    } catch (err) {
      console.error("Failed to delete recipe:", err);

      setError(
        err.response?.data?.message ||
        "Unable to delete this recipe. Please try again."
      );
    } finally {
      setDeletingRecipeId(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#F8F9F7] px-4 py-8 text-gray-900 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">

        {/* Page Header */}
        <div className="mb-10">
          <p className="font-semibold text-green-700">
            Cookly
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Your Saved Recipes
          </h1>

          <p className="mt-3 text-gray-600">
            All your favourite recipes, saved in one place.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-20 text-center">
            <p className="text-gray-600">
              Loading your recipes...
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="rounded-xl bg-red-50 p-5 text-center text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && recipes.length === 0 && (
          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <h2 className="text-xl font-bold">
              No saved recipes yet
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Generate a recipe and save it to find it here.
            </p>

            <button
              type="button"
              onClick={() => navigate("/ingredients")}
              className="mt-6 rounded-xl bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
            >
              Generate a Recipe
            </button>
          </div>
        )}

        {/* Recipe Grid */}
        {!loading && !error && recipes.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <article
                key={recipe._id}
                className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
             
                {/* Recipe Image */}
                {recipe.image?.imageUrl ? (
                    <>
                        <img
                            src={recipe.image.imageUrl}
                            alt={recipe.title}
                            loading="lazy"
                            className="h-48 w-full object-cover"
                        />

                        {recipe.image?.photographer && (
                            <p className="px-3 pt-2 text-right text-xs text-gray-500">
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
                        )}
                    </>
                ) : (
                    <div className="flex h-48 w-full items-center justify-center bg-gray-100">
                        <span className="text-sm text-gray-400">
                            No image available
                        </span>
                    </div>
                )}

                {/* Recipe Details */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex-1">
                    <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                      {recipe.cuisine || "Recipe"}
                    </span>

                    <h2 className="mt-4 text-xl font-bold">
                      {recipe.title}
                    </h2>

                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600">
                      {recipe.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2 text-xs text-gray-600">
                      <span className="rounded-full bg-gray-100 px-3 py-1">
                        {recipe.servings} servings
                      </span>

                      <span className="rounded-full bg-gray-100 px-3 py-1">
                        Prep: {recipe.prepTime}
                      </span>

                      <span className="rounded-full bg-gray-100 px-3 py-1">
                        Cook: {recipe.cookTime} min
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={() => handleViewRecipe(recipe)}
                      className="flex-1 rounded-xl border border-green-700 px-4 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50"
                    >
                      View Recipe
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteRecipe(recipe._id)}
                      disabled={deletingRecipeId === recipe._id}
                      className="rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deletingRecipeId === recipe._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default SavedRecipesPage;
