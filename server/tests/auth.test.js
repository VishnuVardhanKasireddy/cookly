require("dotenv").config()
const os = require("os")
const request = require("supertest")
const mongoose = require("mongoose")
const app = require("../src/app")
const User = require("../src/models/User")

describe("Auth End Points",()=>{

    beforeAll(async () => {
        const mongoUri = process.env.MONGO_URI_TEST;

        if (!mongoUri) {
            throw new Error("MONGO_URI_TEST is undefined");
        }

        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 10000,
            runtimeAdapters: { os }
        });
    }, 15000);

    beforeEach(async()=>{
        await User.deleteMany({})
    })

    afterAll(async () => {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
        }
    });

    const testUser = {
        name: "Test User",
        email: "testuser@cookly.com",
        password: "Password123!",
    }

    describe("POST /api/auth/register",()=>{
        it("Should register new user successfully",async()=>{
            const res = await request(app).post("/api/auth/register").send(testUser)

            expect(res.statusCode).toBe(201)
            expect(res.body.data.user).not.toHaveProperty("password")
        })
        it("Should not allow duplicate registerations",async()=>{
            await request(app).post("/api/auth/register").send(testUser)

            const res = await request(app).post("/api/auth/register").send(testUser)
            expect(res.statusCode).toBe(400)
        })
    })

    describe("POST /api/auth/login",()=>{
        beforeEach(async()=>{
            await request(app).post("/api/auth/register").send(testUser)
        })
        it("Should login a user successfully",async()=>{
            const res = await request(app).post("/api/auth/login").send({
                email:testUser.email,
                password:testUser.password
            })

            expect(res.statusCode).toBe(201)
            expect(res.body.data).toHaveProperty("token")
        })
        it("Should fail login with incorrect credientials",async()=>{
            
            const res = await request(app).post("/api/auth/login").send({
                email:testUser.email,
                password:"wrong password"
            })

            expect(res.statusCode).toBe(401)
        })
    })

    describe("GET /api/auth/me",()=>{
        let token
        beforeEach(async()=>{
            await request(app).post("/api/auth/register").send(testUser)
            const regRes = await request(app).post("/api/auth/login").send({email:testUser.email,password:testUser.password})
            token = regRes.body.data.token
        })

        it("Should return user profile with valid token",async()=>{
            const res = await request(app).get("/api/auth/me").set("Authorization",`Bearer ${token}`)

            expect(res.statusCode).toBe(200)
            expect(res.body.data.user.email).toEqual(testUser.email)
        })

        it("Should return 401 with no token",async()=>{
            const res = await request(app).get("/api/auth/me")

            expect(res.statusCode).toBe(401)
        })

        it("Should return 401 with invalid token",async()=>{
            const res = await request(app).get("/api/auth/me").set("Authorization",`Bearer invalid token`)

            expect(res.statusCode).toBe(500)
        })
    })
})