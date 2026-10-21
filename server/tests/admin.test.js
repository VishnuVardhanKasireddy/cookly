const dotenv = require("dotenv")
dotenv.config()
const os = require("os")
const mongoose = require("mongoose")
const request = require("supertest")
const app = require("../src/app")
const User = require("../src/models/User")
const Recipe = require("../src/models/Recipe")
const { hashPassword } = require("../src/utils/password")
const { generateToken } = require("../src/utils/jwt")

describe("Admin Routes",()=>{
    let adminToken
    let userToken
    let adminId
    let userId
    let testRecipeId

    beforeAll(async()=>{
        const mongouri = process.env.MONGO_URI_TEST 
        if(!mongouri)
            throw new Error("mongouri is undefined!")

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

        const password = await hashPassword("test@123")

        const admin = await User.create({
            name:"admin Test",
            email: "admin.test@cookly.com",
            password,
            role:"admin"
        })
        const user = await User.create({
            name:"user Test",
            email: "user.test@cookly.com",
            password,
            role:"user"
        })

        adminId = admin._id
        userId = user._id

        adminToken = generateToken({id:adminId,role:"admin"})
        userToken = generateToken({id:userId,role:"user"})

        const sampleRecipe = {
            userId:userId,
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

        const recipe = await Recipe.create(sampleRecipe)
        testRecipeId = recipe._id
    })

    afterAll(async()=>{
        if(mongoose.connection.readyState!==0)
            await mongoose.connection.close()
    })

    describe("GET /api/admin/users",()=>{
        it("Should allow admin to retrive all the user info",async()=>{
            const res = await request(app).get(`/api/admin/users`).set("Authorization",`Bearer ${adminToken}`)

            expect(res.statusCode).toBe(200)
            expect(Array.isArray(res.body.data.users)).toBe(true)
        })
        it("Should not allow user to retrive all the user info",async()=>{
            const res = await request(app).get(`/api/admin/users`).set("Authorization",`Bearer ${userToken}`)

            expect(res.statusCode).toBe(403)
        })
        it("Should not allow unauthorized access to retrive all the user info",async()=>{
            const res = await request(app).get(`/api/admin/users`)

            expect(res.statusCode).toBe(401)
        })
        it("Should allow admin to retrive single user info",async()=>{
            const res = await request(app).get(`/api/admin/users/${userId}`).set("Authorization",`Bearer ${adminToken}`)

            expect(res.statusCode).toBe(200)
           
            expect(res.body.data.user._id).toBe(userId.toString());
        })
        it("Should reject regular user to retrive another user info",async()=>{
            const res = await request(app).get(`/api/admin/users/${userId}`).set("Authorization",`Bearer ${userToken}`)

            expect(res.statusCode).toBe(403)
        })
    })

    describe("GET /api/admin/users/:id/recipes",()=>{
        it("Should allow admin to retrive single user recipes",async()=>{
            const res = await request(app).get(`/api/admin/users/${userId}/recipes`).set("Authorization",`Bearer ${adminToken}`)
            
            expect(res.statusCode).toBe(200)
            expect(Array.isArray(res.body.data.recipes)).toBe(true);
            expect(res.body.data.recipes.length).toBeGreaterThan(0);
            const recipes = res.body.data.recipes;

            expect(recipes.length).toBeGreaterThan(0);

            for (const recipe of recipes) {
                expect(String(recipe.userId)).toBe(String(userId));
            }
        })
        it("Should reject user to retrive another user recipes",async()=>{
            const res = await request(app).get(`/api/admin/users/${userId}`).set("Authorization",`Bearer ${userToken}`)

            expect(res.statusCode).toBe(403)
        })
    })

    describe("DELETE /api/admin/users/:id",()=>{
        it("Should allow admin to delete a user",async()=>{
            const res = await request(app).delete(`/api/admin/users/${userId}`).set("Authorization",`Bearer ${adminToken}`)

            expect(res.statusCode).toBe(200)
        })
        it("Should reject regular user to delete another user",async()=>{
            const res = await request(app).delete(`/api/admin/users/${userId}`).set("Authorization",`Bearer ${userToken}`)

            expect(res.statusCode).toBe(403)
        })
    })

    describe("GET /api/admin/recipes",()=>{
        it("Should allow admin to retrive all system recipes",async()=>{
            const res = await request(app).get(`/api/admin/recipes`).set("Authorization",`Bearer ${adminToken}`)

            expect(res.statusCode).toBe(200)
            expect(Array.isArray(res.body.data.recipes)).toBe(true)
        })
        it("Should reject regular user to retrive all system recipes",async()=>{
            const res = await request(app).get(`/api/admin/recipes`).set("Authorization",`Bearer ${userToken}`)

            expect(res.statusCode).toBe(403)
        })
        it("Should allow admin to retrive single recipe",async()=>{
            const res = await request(app).get(`/api/admin/recipes/${testRecipeId}`).set("Authorization",`Bearer ${adminToken}`)

            expect(res.statusCode).toBe(200)
            expect(res.body.data.recipe._id).toBe(testRecipeId.toString());
        })
    })

    describe("DELETE /api/admin/recipes",()=>{
        it("Should allow admin to delete any recipe",async()=>{
            const res = await request(app).delete(`/api/admin/recipes/${testRecipeId}`).set("Authorization",`Bearer ${adminToken}`)

            expect(res.statusCode).toBe(200)
        })
        it("Should reject regular user to use admin deletion",async()=>{
            const res = await request(app).delete(`/api/admin/recipes/${testRecipeId}`).set("Authorization",`Bearer ${userToken}`)

            expect(res.statusCode).toBe(403)
        })
    })

})