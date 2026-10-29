const { GoogleGenAI,Type } = require("@google/genai")

const apikey = process.env.GEMINI_API_KEY

if(!apikey){
    throw new Error("GEMINI_API_KEY is not configured!")
}

const ai = new GoogleGenAI({apikey})

const generateText = async(prompt)=>{
    const response = await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents:prompt
    })

    if(!response.text){
        throw new Error("Gemini returned empty response!")
    }

    return response.text
}


const generateRecipe = async (inputIngredients, options = {}) => {
    if (
        !Array.isArray(inputIngredients) ||
        inputIngredients.length === 0 ||
        inputIngredients.some(
            ingredient =>
                typeof ingredient !== "string" ||
                !ingredient.trim()
        )
    ) {
        throw new Error("Provide a non-empty list of valid ingredients");
    }


    const prompt = `
        You are Cookly, a reliable recipe-generation assistant.

        TASK:
        Generate one practical, realistic recipe using the ingredients
        provided by the user.

        AVAILABLE INGREDIENTS:
        ${inputIngredients.map(item => `- ${item.trim()}`).join("\n")}

        PREFERENCES:
        - Cuisine: ${options.cuisine || "Any"}
        - Servings: ${options.servings || 2}
        - Difficulty: ${options.difficulty || "easy"}

        RECIPE REQUIREMENTS:
        1. Prioritize the ingredients provided by the user.
        2. You may include reasonable additional ingredients when necessary.
        3. Provide a clear, descriptive recipe title.
        4. Write a concise description of the finished dish.
        5. List all ingredients with realistic quantities and units.
        6. Provide clear, ordered cooking instructions.
        7. Use realistic preparation and cooking times.
        8. Ensure the recipe is practical and the instructions are safe.
        9. Match the requested cuisine, serving count, and difficulty
        as closely as possible.

        DATA VALIDATION RULES:
        - Every required string field must contain a non-empty string.
        - Every ingredient must have a non-empty name, quantity, and unit.
        - The quantity must be a string representing a realistic amount,
        such as "2", "1/2", or "to taste".
        - Never use an empty string for an ingredient's unit.
        - If an ingredient has no conventional measurement unit, use a
        meaningful value such as "to taste", "as needed", or "pinch",
        depending on the ingredient.
        - Do not use an empty unit for salt, water, oil, or any other
        ingredient.
        - Every instruction must have a positive integer step number
        and a non-empty description.
        - Number instructions sequentially, starting at 1.
        - Servings must be a positive integer.
        - Preparation time must be a descriptive string, such as
        "10 minutes".
        - Cooking time must be a non-negative integer representing minutes.
        - Difficulty must be exactly "easy", "medium", or "hard".
        - Include all fields required by the requested JSON schema.
        - Do not include Markdown, explanations, or text outside the JSON.

        Return one complete recipe matching the requested JSON schema.
    `;


    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    inputIngredients: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                    },
                    ingredients: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING },
                                quantity: { type: Type.STRING },
                                unit: { type: Type.STRING }
                            },
                            required: ["name", "quantity", "unit"]
                        }
                    },
                    instructions: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                step: { type: Type.INTEGER },
                                description: { type: Type.STRING }
                            },
                            required: ["step", "description"]
                        }
                    },
                    cuisine: { type: Type.STRING },
                    servings: { type: Type.INTEGER },
                    prepTime: { type: Type.STRING },
                    cookTime: { type: Type.INTEGER },
                    difficulty: {
                        type: Type.STRING,
                        enum: ["easy", "medium", "hard"]
                    }
                },
                required: [
                    "title",
                    "description",
                    "inputIngredients",
                    "ingredients",
                    "instructions",
                    "cuisine",
                    "servings",
                    "prepTime",
                    "cookTime",
                    "difficulty"
                ]
            }
        }
    });

    if (!response.text) {
        throw new Error("Gemini returned an empty recipe");
    }

    let recipe;

    try {
        recipe = JSON.parse(response.text);
    } catch {
        throw new Error("Gemini returned invalid JSON");
    }

    if (
        !recipe.title ||
        !Array.isArray(recipe.ingredients) ||
        recipe.ingredients.length === 0 ||
        !Array.isArray(recipe.instructions) ||
        recipe.instructions.length === 0
    ) {
        throw new Error("Gemini returned an incomplete recipe");
    }

    return recipe;
};


module.exports = {
    generateText,
    generateRecipe
}