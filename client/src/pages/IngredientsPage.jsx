
import { useState } from "react";

function IngredientsPage() {
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [cuisine, setCuisine] = useState("Any");
  const [difficulty, setDifficulty] = useState("medium");
  const [servings, setServings] = useState(2);
  const [error, setError] = useState("");

  function handleAddIngredient(event) {
    event.preventDefault();

    const ingredient = ingredientInput.trim();

    if (!ingredient) {
      setError("Please enter an ingredient.");
      return;
    }

    const alreadyExists = ingredients.some(
      (item) => item.toLowerCase() === ingredient.toLowerCase()
    );

    if (alreadyExists) {
      setError("This ingredient is already in your list.");
      return;
    }

    setIngredients((current) => [...current, ingredient]);
    setIngredientInput("");
    setError("");
  }

  function handleRemoveIngredient(ingredientToRemove) {
    setIngredients((current) =>
      current.filter((item) => item !== ingredientToRemove)
    );
    setError("");
  }

  function handleGenerateRecipes() {
    console.log({
      ingredients,
      mealType,
      diet,
      servings,
    });
  }

  return (
    <main className="min-h-screen bg-white px-4 py-8 text-gray-900 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <p className="font-semibold text-green-700">Cookly</p>

        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
          What ingredients do you have?
        </h1>

        <p className="mt-3 text-gray-600">
          Add what's in your kitchen, and let's find something delicious.
        </p>

        {/* Ingredient input */}
        <form
          onSubmit={handleAddIngredient}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="text"
            value={ingredientInput}
            onChange={(event) => {
              setIngredientInput(event.target.value);
              setError("");
            }}
            placeholder="e.g. eggs, tomatoes, spinach"
            aria-label="Ingredient"
            aria-describedby={error ? "ingredient-error" : undefined}
            className="min-h-11 min-w-0 flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />

          <button
            type="submit"
            className="min-h-11 w-full rounded-xl bg-green-700 px-5 py-3 font-medium text-white transition hover:bg-green-800 sm:w-auto"
          >
            Add
          </button>
        </form>

        {error && (
          <p
            id="ingredient-error"
            role="alert"
            className="mt-2 text-sm text-red-600"
          >
            {error}
          </p>
        )}

        {/* Ingredient list */}
        <section className="mt-8" aria-label="Your ingredients">
          <h2 className="font-semibold">Your ingredients</h2>

          {ingredients.length === 0 ? (
            <p className="mt-3 text-sm text-gray-500">
              Your ingredient list is empty. Add a few ingredients to begin.
            </p>
          ) : (
            <ul className="mt-4 flex flex-wrap gap-3">
              {ingredients.map((ingredient) => (
                <li
                  key={ingredient}
                  className="flex items-center gap-2 rounded-full bg-green-50 py-2 pl-4 pr-2 text-green-900"
                >
                  <span>{ingredient}</span>

                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(ingredient)}
                    aria-label={`Remove ${ingredient}`}
                    className="flex min-h-8 min-w-8 items-center justify-center rounded-full font-bold text-green-800 transition hover:bg-green-100 hover:text-red-600"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

       


        {/* Recipe preferences */}
        <section className="mt-8">
        <h2 className="mb-3 text-base font-semibold">Recipe preferences</h2>

        <div className="grid grid-cols-3 gap-2">
            <div className="min-w-0">
            <label
                htmlFor="cuisine"
                className="mb-1.5 block truncate text-xs font-medium text-gray-600"
            >
                Cuisine
            </label>

            <select
                id="cuisine"
                value={cuisine}
                onChange={(event) => setCuisine(event.target.value)}
                className="min-h-10 w-full min-w-0 rounded-2xl border border-gray-300 bg-white px-2 py-2 text-xs"
            >
                <option>Any</option>
                <option>Indian</option>
                <option>Italian</option>
                <option>Chinese</option>
                <option>Mexican</option>
                <option>American</option>
            </select>
            </div>

            <div className="min-w-0">
            <label
                htmlFor="servings"
                className="mb-1.5 block truncate text-xs font-medium text-gray-600"
            >
                Servings
            </label>

            <select
                id="servings"
                value={servings}
                onChange={(event) => setServings(Number(event.target.value))}
                className="min-h-10 w-full min-w-0 rounded-2xl border border-gray-300 bg-white px-2 py-2 text-xs"
            >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
                <option key={count} value={count}>
                    {count}
                </option>
                ))}
            </select>
            </div>

            <div className="min-w-0">
            <label
                htmlFor="difficulty"
                className="mb-1.5 block truncate text-xs font-medium text-gray-600"
            >
                Difficulty
            </label>

            <select
                id="difficulty"
                value={difficulty}
                onChange={(event) => setDifficulty(event.target.value)}
                className="min-h-10 w-full min-w-0 rounded-2xl border border-gray-300 bg-white px-2 py-2 text-xs"
            >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            </div>
        </div>
        </section>




        {/* Generate recipes */}
        <button
          type="button"
          disabled={ingredients.length === 0}
          onClick={handleGenerateRecipes}
          className="mt-10 min-h-12 w-full rounded-xl bg-green-700 px-6 py-4 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          Generate Recipes
        </button>
      </div>
    </main>
  );
}

export default IngredientsPage;
