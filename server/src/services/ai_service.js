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
                    You are Cookly, a recipe-generation assistant.

                    Generate one practical recipe using these available ingredients:
                    ${inputIngredients.map(item => `- ${item.trim()}`).join("\n")}

                    Preferences:
                    - Cuisine: ${options.cuisine || "Any"}
                    - Servings: ${options.servings || 2}
                    - Difficulty: ${options.difficulty || "easy"}

                    You may include reasonable additional ingredients, but prioritize
                    the ingredients provided by the user.
                    Give clear, ordered cooking instructions.
                    Use realistic preparation and cooking times.
                    Return only the recipe matching the requested JSON schema.
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