require("dotenv").config()
const os = require("os")
const mongoose = require("mongoose")
const request = require("supertest")
const app = require("../src/app")
const User = require("../src/models/User")
const Recipe = require("../src/models/Recipe")

let token 
let testUser = {
    name : "test_user_1",
    email : "testUser1@gmail.com",
    password : "testUser1@123"
}
const sampleRecipe = {
    title: "Masala Omelette",
    description: "A simple spicy omelette",
    inputIngredients: ["eggs", "onion", "chilli"],
    ingredients: [
        { name: "Eggs", quantity: "2",unit:"1"},
        { name: "Onion", quantity: "1 small",unit:"1"},
        { name: "Green chilli", quantity: "1",unit:"1" }
    ],
    instructions: [
        { step: 1, description: "Beat the eggs in a bowl." },
        { step: 2, description: "Mix in the chopped onion and chilli." },
        { step: 3, description: "Cook in a lightly oiled pan until done." }
    ],
    cuisine: "Indian",
    servings: 1,
    prepTime: 5,
    cookTime: 5,
    difficulty: "easy"
};

describe("Recipe End Points",()=>{
    beforeAll(async()=>{
        const mongouri = process.env.MONGO_URI_TEST
        if(!mongouri){
            throw new Error("Mongo Uri is undefined")
        }

        if(mongoose.connection.readyState===0){
            await mongoose.connect(mongouri,{
                serverSelectionTimeoutMS:10000,
                runtimeAdapters:{os}
            })
        }
    },15000)

    beforeEach(async()=>{
        await User.deleteMany({})
        await Recipe.deleteMany({})

        await request(app).post("/api/auth/register").send(testUser)
        const logRes = await request(app).post("/api/auth/login").send({
            email:testUser.email,
            password:testUser.password
        })

        token = logRes.body.data.token
    })

    afterAll(async()=>{
        if(mongoose.connection.readyState!==0){
            await mongoose.connection.close()
        }
    })

    describe("POST /api/recipes",()=>{

        it("Should create new recipe when authorised",async()=>{
            const res = await request(app).post("/api/recipes").set("Authorization",`Bearer ${token}`).send(sampleRecipe)
            
            expect(res.statusCode).toBe(201)
            expect(res.body.data.recipe).toHaveProperty("_id")
            expect(res.body.data.recipe.title).toBe(sampleRecipe.title)
        })

        it("Should fail to create recipe when unauthorised",async()=>{
            const res = await request(app).post("/api/recipes").send(sampleRecipe)
            
            expect(res.statusCode).toBe(401)
        })
    })

    describe("GET /api/recipes",()=>{

        it("Should retrive all the recipes",async()=>{
            await request(app).post("/api/recipes").set("Authorization",`Bearer ${token}`).send(sampleRecipe)

            const res = await request(app).get("/api/recipes").set("Authorization",`Bearer ${token}`)
            
            expect(res.statusCode).toBe(200)
            expect(Array.isArray(res.body.data.recipes)).toBe(true)
            expect(res.body.data.recipes[0].title).toEqual(sampleRecipe.title)
        })

        it("Should retrive the recipe of given ID",async()=>{
            const createRes = await request(app).post("/api/recipes").set("Authorization",`Bearer ${token}`).send(sampleRecipe)

            const recipeId = createRes.body.data.recipe._id
            const res = await request(app).get(`/api/recipes/${recipeId}`).set("Authorization",`Bearer ${token}`)

            expect(res.statusCode).toBe(200)
            expect(res.body.data.recipe.title).toBe(sampleRecipe.title)
        })
    })

    describe("DELETE /api/recipes/:id",()=>{

        it("Should allow authorised user to delete there recipe",async()=>{
            const createRes = await request(app).post("/api/recipes").set("Authorization",`Bearer ${token}`).send(sampleRecipe)

            const recipeId = createRes.body.data.recipe._id

            const res = await request(app).delete(`/api/recipes/${recipeId}`).set("Authorization",`Bearer ${token}`)
            expect(res.statusCode).toBe(200)

            const getRes = await request(app).get(`/api/recipes/${recipeId}`).set("Authorization",`Bearer ${token}`)
            
            expect(getRes.statusCode).toBe(404)
        })

        it("Should not allow a user from deleting others recipes",async()=>{
            const createRes = await request(app).post("/api/recipes").set("Authorization",`Bearer ${token}`).send(sampleRecipe)
            const recipeId = createRes.body.data.recipe._id

            const secondUser = {
                name: "ChefTwo",
                email: "cheftwo@test.com",
                password: "password123"
            }
            await request(app).post("/api/auth/register").send(secondUser)
            const loginRes = await request(app).post("/api/auth/login").send({
                email:secondUser.email,
                password:secondUser.password 
            })
          
            const token2 = loginRes.body.data.token

            const res = await request(app).delete(`/api/recipes/${recipeId}`).set("Authorization",`Bearer ${token2}`)

            expect(res.statusCode).toBe(404)
        })
    })

    describe("Recipe Validation",()=>{
        it("should fail to create a recipe with missing required fields (e.g. title)", async () => {
            const invalidRecipe = { ingredients: ["Water"], instructions: "Boil it." }

            const res = await request(app)
                .post("/api/recipes")
                .set("Authorization", `Bearer ${token}`)
                .send(invalidRecipe)

            expect(res.statusCode).toBe(400)
        })
    })

})