
import { useState } from "react";

function IngredientsPage() {
    const [ingredientInput, setIngredientInput] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [mealType, setMealType] = useState("Any");
    const [diet, setDiet] = useState("No restrictions");
    const [servings, setServings] = useState(2);

    function handleAddIngredient(event) {
        event.preventDefault();

        const ingredient = ingredientInput.trim();

        if (!ingredient) return;

        const alreadyExists = ingredients.some(
        (item) => item.toLowerCase() === ingredient.toLowerCase()
        );

        if (alreadyExists) return;

        setIngredients((current) => [...current, ingredient]);
        setIngredientInput("");
    }

    function handleRemoveIngredient(ingredientToRemove) {
        setIngredients((current) =>
        current.filter((item) => item !== ingredientToRemove)
        );
    }

    return (
        <main className="min-h-screen bg-white px-6 py-12 text-gray-900">
        <div className="mx-auto max-w-3xl">
            <p className="font-semibold text-green-700">Cookly</p>

            <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
            What ingredients do you have?
            </h1>

            <p className="mt-3 text-gray-600">
            Add what's in your kitchen, and let's find something delicious.
            </p>

            <form onSubmit={handleAddIngredient} className="mt-8 flex gap-3">
            <input
                type="text"
                value={ingredientInput}
                onChange={(event) => setIngredientInput(event.target.value)}
                placeholder="e.g. eggs, tomatoes, spinach"
                aria-label="Ingredient"
                className="min-w-0 flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />

            <button
                type="submit"
                className="rounded-xl bg-green-700 px-5 py-3 font-medium text-white hover:bg-green-800"
            >
                Add
            </button>
            </form>

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
                    className="flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-green-900"
                    >
                    <span>{ingredient}</span>
                    <button
                        type="button"
                        onClick={() => handleRemoveIngredient(ingredient)}
                        aria-label={`Remove ${ingredient}`}
                        className="font-bold text-green-800 hover:text-red-600"
                    >
                        ×
                    </button>
                    </li>
                ))}
                </ul>
            )}
            </section>
            
            <section className="mt-10 space-y-6">
            <h2 className="text-lg font-semibold">Recipe preferences</h2>

            <div>
                <label
                htmlFor="mealType"
                className="mb-2 block text-sm font-medium text-gray-700"
                >
                What are you preparing?
                </label>

                <select
                id="mealType"
                value={mealType}
                onChange={(event) => setMealType(event.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3"
                >
                <option>Any</option>
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Snack</option>
                </select>
            </div>

            <div>
                <label
                htmlFor="diet"
                className="mb-2 block text-sm font-medium text-gray-700"
                >
                Dietary preference
                </label>

                <select
                id="diet"
                value={diet}
                onChange={(event) => setDiet(event.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3"
                >
                <option>No restrictions</option>
                <option>Vegetarian</option>
                <option>Vegan</option>
                </select>
            </div>

            <div>
                <label
                htmlFor="servings"
                className="mb-2 block text-sm font-medium text-gray-700"
                >
                Number of servings
                </label>

                <select
                id="servings"
                value={servings}
                onChange={(event) => setServings(Number(event.target.value))}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3"
                >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
                    <option key={count} value={count}>
                    {count} {count === 1 ? "person" : "people"}
                    </option>
                ))}
                </select>
            </div>
            </section>

            <button
            type="button"
            disabled={ingredients.length === 0}
            onClick={() => console.log( ingredients,mealType,diet,servings)}
            className="mt-10 w-full rounded-xl bg-green-700 px-6 py-4 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
            Generate Recipes
            </button>
        </div>
        </main>
    );
}

export default IngredientsPage;
